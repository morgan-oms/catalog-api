import express from 'express';
import dotenv from 'dotenv';
import comicRoutes from './route/comic.route.js';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './route/auth.route.js';
import userRoutes from './route/user.route.js'
import { errorHandler } from './middleware/error.js';

dotenv.config();

const app = express();
app.use(cors({ origin: ['http://localhost:8080', 'https://catalogverse.vercel.app'] }));

app.use(helmet());
app.use(express.json());

app.use('/api/v1/auth',   authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/comics', comicRoutes);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use(errorHandler);
export default app;