import express from 'express';
import { connectDatabase } from './database';
import { router } from './routes';

const app = express();
app.use(express.json()); // Middleware necessário para ler o corpo (body) do POST
app.use(router);

const PORT = 3000;

async function startServer() {
  // 1. Inicializa e sincroniza o banco SQLite na memória RAM
  await connectDatabase();

  // 2. Sobe o servidor HTTP
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}

startServer();
