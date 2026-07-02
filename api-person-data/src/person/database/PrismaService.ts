import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const adapter = new PrismaLibSql({
      url: 'file::memory:',
    });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();

    console.log('Garantindo a estrutura das tabelas na memória RAM...');
    await this.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Person" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "name" TEXT NOT NULL,
        "age" INTEGER NOT NULL,
        "email" TEXT NOT NULL
      );
    `);
    
    await this.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "Person_email_key" ON "Person"("email");
    `);
    
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}