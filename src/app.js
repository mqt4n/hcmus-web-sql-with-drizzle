import express from "express";
import morgan from "morgan";
import cors from "cors";
import { responseWrapper } from "./middlewares/response.middleware.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/error.middleware.js";
import teacherRoutes from './routes/teacher.routes.js';

export const app = express();

// chấp nhận request từ các domain khác (Cross-Origin Resource Sharing)
app.use(cors());

// parse dữ liệu JSON và dữ liệu form gửi từ client vào req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// log
app.use(morgan("dev"));

// Response Wrapper
app.use(responseWrapper);

// Routes
// API End points
app.use("/api/teachers", teacherRoutes);

// Error Handler
app.use(notFoundHandler);
app.use(errorHandler);
