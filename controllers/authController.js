import jwt from 'jsonwebtoken';

/**
 * Iniciar autenticación con Google
 * Se maneja mediante Passport en las rutas
 */

/**
 * Callback de Google OAuth
 * Genera un JWT y redirige al frontend con el token
 */
export const googleCallback = (req, res) => {
  // El usuario ya está autenticado por Passport
  const user = req.user;

  // Crear JWT con información del usuario
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      googleToken: user.accessToken
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Redirigir al frontend con el token
  res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
};

/**
 * Logout del usuario
 */
export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error al cerrar sesión' });
    }
    res.json({ message: 'Sesión cerrada exitosamente' });
  });
};

/**
 * Obtener información del usuario actual
 */
export const getCurrentUser = (req, res) => {
  // El middleware de autenticación ya validó el token
  res.json({
    user: req.user
  });
};
