import { Router } from 'express';
import AuthController from '../controllers/Auth';

const router = Router();

router.get('/email/:token', AuthController.authenticate);

export default router;
