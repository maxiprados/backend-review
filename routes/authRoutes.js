import express from 'express';
import passport from '../config/passport.js';
import { googleCallback, logout, getCurrentUser } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Iniciar autenticación con Google
router.get('/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

// Callback de Google OAuth
router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    session: false 
  }),
  googleCallback
);

// Logout
router.post('/logout', authMiddleware, logout);

// Obtener usuario actual
router.get('/user', authMiddleware, getCurrentUser);

export default router;
