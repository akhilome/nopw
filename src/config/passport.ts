import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import AuthController from '../controllers/Auth';

const {
  GOOGLE_CLIENT_ID = '',
  GOOGLE_CLIENT_SECRET = '',
  GOOGLE_CALLBACK_URL = ''
} = process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL
    },
    AuthController.socialCallback
  )
);
