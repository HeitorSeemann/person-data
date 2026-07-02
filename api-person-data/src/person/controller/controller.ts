import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PersonService } from '../service/service';

import { Person, Prisma } from '@prisma/client'; 

@Controller('person')
export class PersonController {
  
  constructor(private readonly personService: PersonService) {}

  @Get() 
  async findAll(): Promise<Person[]> {
    return this.personService.listAll();
  }

  @Post()
  async create(@Body() personData: Prisma.PersonCreateInput): Promise<Person> {
    return this.personService.save(personData);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Person> {
    return this.personService.findById(id);
  }
}
