import * as Express from 'express';
import UserController from '../controllers/User';

const router = Express.Router();

router.post('/signup', UserController.signUp);

export default router;
