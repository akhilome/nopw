import { Router } from 'express';
import ProfileController from '../controllers/Profile';

const router = Router();

router.route('/').get(ProfileController.getProfile);

export default router;
