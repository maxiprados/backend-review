import cloudinary from '../config/cloudinary.js';

/**
 * Sube una imagen a Cloudinary desde un buffer
 * @param {Buffer} buffer - Buffer del archivo de imagen
 * @param {String} folder - Carpeta en Cloudinary donde guardar la imagen
 * @returns {Promise<Object>} - Objeto con url y publicId de la imagen
 */
export const uploadImage = (buffer, folder = 'reviews') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'image'
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            publicId: result.public_id
          });
        }
      }
    );

    uploadStream.end(buffer);
  });
};

/**
 * Elimina una imagen de Cloudinary
 * @param {String} publicId - ID público de la imagen en Cloudinary
 */
export const deleteImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error al eliminar imagen de Cloudinary:', error);
  }
};
