import express from 'express';
import { 
  getAllReviews, 
  getReviewById, 
  createReview,
  deleteReview,
  getCoordinates 
} from '../controllers/reviewController.js';
import { authMiddleware } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Obtener todas las reseñas
router.get('/', getAllReviews);

// Obtener detalle de una reseña
router.get('/:id', getReviewById);

// Crear nueva reseña (con imágenes opcionales)
router.post('/', upload.array('images', 10), createReview);

// Eliminar una reseña
router.delete('/:id', deleteReview);

// Geocoding - obtener coordenadas de una dirección
router.get('/geocode/search', getCoordinates);

export default router;
