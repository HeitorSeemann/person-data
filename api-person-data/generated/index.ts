import { PrismaClient as BasePrismaClient } from '@prisma/client';

export class PrismaClient extends BasePrismaClient {
  constructor(options?: any) {
    super(options);
  }
}

export const Prisma: any = {
  PrismaClientKnownRequestError: (class {} as any),
};

export type Person = {
  id: number;
  name: string;
  email: string;
};
