import express from 'express';
import dotenv from 'dotenv';
import comicRoutes from './route/comic.route.js';
import { errorHandler } from './middleware/error.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/v1/comics', comicRoutes);
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use(errorHandler);
export default app;