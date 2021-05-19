import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';
import cors from 'cors';

import '@shared/infra/typeorm';
import '@shared/container';
import { router } from './routes';
import createConnection from "@shared/infra/typeorm"
import { AppError } from '@shared/errors/AppError';

const app = express();
createConnection();

app.use(cors());
app.use(express.json());

app.use('/api/v1', router);

app.use(
  (err: Error, request: express.Request, response: express.Response, _next: express.NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message} `,
    });
  }
);

export { app };
