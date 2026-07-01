import { Router, Request, Response } from 'express';
import { prisma } from './database'; // Importa a instância que configuramos

const router = Router();

router.post('/persons', async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    // Validação simples dos dados de entrada
    if (!name || !email) {
       return res.status(400).json({ error: 'Name and email are required.' });
    }

    // Salva o registro diretamente no banco SQLite em memória
    const newPerson = await prisma.person.create({
      data: {
        name,
        email,
      },
    });

    // Retorna o objeto criado com status 201 (Created)
    return res.status(201).json(newPerson);
  } catch (error: any) {
    // Tratamento de erro caso o e-mail já esteja cadastrado (@unique no schema)
    if (error.code === 'P2002') {
       return res.status(409).json({ error: 'This email is already registered.' });
    }

    console.error('Error creating person:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

export { router };
