import { Router, Request, Response } from 'express';
import { prisma } from './database';

const router = Router();

router.post('/persons', async (req: Request, res: Response) => {
  try {
    const { name, email, age } = req.body;

    if (!name || !email || age === undefined) {
       return res.status(400).json({ error: 'Name, email and age are required.' });
    }

    const newPerson = await prisma.person.create({
      data: {
        name,
        email,
        age: Number(age)
      },
    });

    return res.status(201).json(newPerson);
  } catch (error: any) {
    if (error.code === 'P2002') {
       return res.status(409).json({ error: 'This email is already registered.' });
    }

    console.error('Error creating person:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

export { router };
