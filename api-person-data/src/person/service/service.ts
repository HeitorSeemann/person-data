import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prismaService';

import { Person, Prisma } from '@prisma/client'; 

@Injectable()
export class PersonService {
  constructor(private prisma: PrismaService) {}

  async listAll(): Promise<Person[]> {
    return this.prisma.person.findMany();
  }

  async save(newPerson: Prisma.PersonCreateInput): Promise<Person> {
    try {
      return await this.prisma.person.create({
        data: newPerson,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Email already used.');
      }
      throw error;
    }
  }

  async findById(id: number): Promise<Person> {
    const person = await this.prisma.person.findUnique({
      where: { id },
    });

    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found.`);
    }

    return person;
  }
}