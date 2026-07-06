import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PersonService } from '../service/PersonService';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  async create(@Body() personData: any): Promise<any> {
    return this.personService.save(personData);
  }

  @Get()
  async listAll(): Promise<any[]> {
    return this.personService.listAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.personService.findById(id);
  }
}
