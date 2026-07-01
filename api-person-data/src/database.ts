import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

const prisma = new PrismaClient();

export async function connectDatabase() {
  try {
    execSync('npx prisma db push --skip-generate', { stdio: 'inherit' });
    console.log('In-memory SQLite database initialized successfully!');
  } catch (error) {
    console.error('Failed to initialize in-memory database:', error);
    process.exit(1);
  }
}

export { prisma };
