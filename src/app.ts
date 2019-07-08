import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const { PORT } = process.env;

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'server up & running'
  });
});

const server = app.listen(PORT, () =>
  console.log(`App running on port ${PORT}`)
);

export default server;
