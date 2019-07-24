import { Router } from 'express';
import AuthController from '../controllers/Auth';
import passport from 'passport';

const router = Router();

router.get('/email/:token', AuthController.authenticate);
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
  })
);
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  AuthController.socialAuth
);

router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['profile', 'email'],
    session: false
  })
);
router.get(
  '/github/callback',
  passport.authenticate('github', { session: false }),
  AuthController.socialAuth
);

export default router;
