import express from 'express';
import { connectDatabase } from './database';
import { router } from './routes';

const app = express();
app.use(express.json());
app.use(router);

const PORT = 3000;

async function startServer() {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}

startServer();
