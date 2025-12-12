import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// Función para configurar Passport (se llama después de cargar variables de entorno)
export const configurePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
      },
      (accessToken, refreshToken, profile, done) => {
        // Almacenamos la información relevante del usuario
        const user = {
          id: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          accessToken: accessToken
        };
        return done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  return passport;
};

export default passport;
