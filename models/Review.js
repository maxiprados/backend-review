import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  // Información del establecimiento
  establishmentName: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  coordinates: {
    lon: {
      type: Number,
      required: true
    },
    lat: {
      type: Number,
      required: true
    }
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  
  // Información del autor (del token OAuth)
  author: {
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  
  // Token OAuth y timestamps
  oauthToken: {
    type: String,
    required: true
  },
  tokenIssuedAt: {
    type: Date,
    required: true
  },
  tokenExpiresAt: {
    type: Date,
    required: true
  },
  
  // Imágenes (URIs de Cloudinary)
  images: [{
    url: String,
    publicId: String
  }],
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Índice geoespacial para búsquedas por coordenadas
reviewSchema.index({ 'coordinates.lon': 1, 'coordinates.lat': 1 });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
