import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/PrismaService';

@Injectable()
export class PersonService {
  constructor(private prisma: PrismaService) {}

  async listAll(): Promise<any[]> {
    return (this.prisma as any).person.findMany();
  }

  async save(newPerson: any): Promise<any> {
    try {
      return await (this.prisma as any).person.create({
        data: newPerson,
      });
    } catch (error: any) {
      const isPrismaError = error?.constructor?.name?.includes('Prisma') || error?.message?.includes('Prisma');
      if (isPrismaError && error.code === 'P2002') {
        throw new ConflictException('Email already used.');
      }
      throw error;
    }
  }

  async findById(id: number): Promise<any> {
    const person = await (this.prisma as any).person.findUnique({
      where: { id },
    });

    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found.`);
    }

    return person;
  }
}
