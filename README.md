# Backend ReViews

Backend para la aplicación ReViews - Sistema de reseñas de establecimientos con OAuth 2.0 y geolocalización.

## Tecnologías

- Node.js con Express
- MongoDB Atlas
- Google OAuth 2.0
- Cloudinary para almacenamiento de imágenes
- OpenStreetMap Nominatim para geocoding

## Instalación Local

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno en `.env` (ya incluidas en el archivo)

3. Iniciar servidor de desarrollo:
```bash
npm run dev
```

O en producción:
```bash
npm start
```

El servidor estará disponible en `http://localhost:5000`

## Endpoints API

### Autenticación
- `GET /auth/google` - Iniciar login con Google
- `GET /auth/google/callback` - Callback de OAuth
- `POST /auth/logout` - Cerrar sesión
- `GET /auth/user` - Obtener usuario actual

### Reseñas (requieren autenticación)
- `GET /api/reviews` - Listar todas las reseñas
- `GET /api/reviews/:id` - Obtener detalle de una reseña
- `POST /api/reviews` - Crear nueva reseña (con imágenes)
- `GET /api/reviews/geocode/search?address=...` - Geocoding

## Despliegue en Render

1. Crear nuevo Web Service en Render
2. Conectar repositorio de GitHub
3. Configurar:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Agregar variables de entorno desde `.env`
5. Actualizar `GOOGLE_CALLBACK_URL` y `FRONTEND_URL` con URLs de producción
