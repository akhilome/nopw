import * as Express from 'express';
import userRouter from './users';

const router = Express.Router();

router.use('/users', userRouter);

router.all('*', (req: Express.Request, res: Express.Response) => {
  res.status(404).json({
    success: false,
    message: 'invalid route'
  });
});

export default router;
