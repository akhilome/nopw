import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './routes/index';
import bodyParser from 'body-parser';

dotenv.config();
const { PORT } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', router);

app.all('*', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'server up & running'
  });
});

const server = app.listen(PORT, () =>
  console.log(`App running on port ${PORT}`)
);

export default server;
