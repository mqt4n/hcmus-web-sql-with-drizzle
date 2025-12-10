import express, { Application } from 'express';
import cors from 'cors';
import teacherRoutes from './routes/teacher.routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

export const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/teachers', teacherRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
