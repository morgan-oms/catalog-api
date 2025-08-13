import app from './app.js';
import { connectDB } from './config/db.js';

const port = process.env.PORT || 3000;

connectDB(process.env.MONGODB_URI)
  .then(() => app.listen(port, () => console.log(`API em http://localhost:${port}`)))
  .catch((err) => {
    console.error('Falha ao conectar no MongoDB:', err);
    process.exit(1);
  });