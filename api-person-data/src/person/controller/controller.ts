import { Controller, Get, Post, Body } from '@nestjs/common';
import { PersonService } from '../service/service';
import { Person } from '../entities/entity';

@Controller('person')
export class PersonController {
  
  constructor(private readonly personService: PersonService) {}

  @Get() 
  findAll(): Person[] {
    return this.personService.listAll();
  }

  @Post()
  create(@Body() personData: Omit<Person, 'id'>): Person {
    return this.personService.save(personData);
  }
}
