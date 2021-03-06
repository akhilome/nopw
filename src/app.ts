import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './routes/index';
import bodyParser from 'body-parser';
import logger from './logging';
import passport from 'passport';

dotenv.config();
const { PORT } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import './config/passport';
app.use(passport.initialize());

app.use('/api/v1', router);

app.all('*', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'server up & running'
  });
});

const server = app.listen(PORT, () =>
  logger.info(`App running on port ${PORT}`)
);

export default server;
