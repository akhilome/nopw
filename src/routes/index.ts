import * as Express from 'express';
import userRouter from './users';
import authRouter from './auth';
import profileRouter from './profile';
import AuthController from '../controllers/Auth';

const router = Express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/profile', AuthController.authorize, profileRouter);

router.all('*', (req: Express.Request, res: Express.Response) => {
  res.status(404).json({
    success: false,
    message: 'invalid route'
  });
});

export default router;
