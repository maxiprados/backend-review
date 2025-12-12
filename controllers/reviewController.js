import Review from '../models/Review.js';
import { geocodeAddress } from '../services/geocoding.js';
import { uploadImage } from '../services/cloudinary.js';

/**
 * Obtener todas las reseñas (listado)
 */
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .select('establishmentName address coordinates rating createdAt')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    res.status(500).json({ message: 'Error al obtener las reseñas' });
  }
};

/**
 * Obtener detalle de una reseña específica
 */
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    
    res.json(review);
  } catch (error) {
    console.error('Error al obtener reseña:', error);
    res.status(500).json({ message: 'Error al obtener la reseña' });
  }
};

/**
 * Crear una nueva reseña
 */
export const createReview = async (req, res) => {
  try {
    const { establishmentName, address, rating } = req.body;
    
    // Validaciones básicas
    if (!establishmentName || !address || rating === undefined) {
      return res.status(400).json({ 
        message: 'Faltan campos requeridos: establishmentName, address, rating' 
      });
    }

    if (rating < 0 || rating > 5) {
      return res.status(400).json({ 
        message: 'La valoración debe estar entre 0 y 5' 
      });
    }

    // Obtener coordenadas mediante geocoding
    let coordinates;
    try {
      coordinates = await geocodeAddress(address);
    } catch (geocodeError) {
      return res.status(400).json({ 
        message: 'No se pudieron obtener las coordenadas de la dirección proporcionada' 
      });
    }

    // Procesar imágenes si existen
    const images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const uploadedImage = await uploadImage(file.buffer, 'reviews');
          images.push(uploadedImage);
        } catch (uploadError) {
          console.error('Error al subir imagen:', uploadError);
        }
      }
    }

    // Extraer información del token del usuario autenticado
    const { email, name, iat, exp } = req.user;
    const token = req.headers.authorization?.split(' ')[1];

    // Crear la reseña
    const review = new Review({
      establishmentName,
      address,
      coordinates,
      rating: parseFloat(rating),
      author: {
        email,
        name
      },
      oauthToken: token,
      tokenIssuedAt: new Date(iat * 1000),
      tokenExpiresAt: new Date(exp * 1000),
      images
    });

    await review.save();

    res.status(201).json({
      message: 'Reseña creada exitosamente',
      review
    });
  } catch (error) {
    console.error('Error al crear reseña:', error);
    res.status(500).json({ message: 'Error al crear la reseña' });
  }
};

/**
 * Eliminar una reseña
 */
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    // Opcional: Verificar que el usuario que la creó es quien la elimina
    // if (review.author.email !== req.user.email) {
    //   return res.status(403).json({ message: 'No tienes permiso para eliminar esta reseña' });
    // }

    await Review.findByIdAndDelete(req.params.id);

    res.json({ message: 'Reseña eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar reseña:', error);
    res.status(500).json({ message: 'Error al eliminar la reseña' });
  }
};

/**
 * Obtener coordenadas de una dirección (para búsqueda en mapa)
 */
export const getCoordinates = async (req, res) => {
  try {
    const { address } = req.query;
    
    if (!address) {
      return res.status(400).json({ message: 'Se requiere una dirección' });
    }

    const coordinates = await geocodeAddress(address);
    res.json(coordinates);
  } catch (error) {
    console.error('Error en geocoding:', error);
    res.status(400).json({ 
      message: 'No se pudieron obtener las coordenadas de la dirección' 
    });
  }
};
