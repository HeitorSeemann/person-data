import { Injectable } from '@nestjs/common';
import { Person } from '../entities/entity';

@Injectable()
export class PersonService {
  private persons: Person[] = [
    { id: 1, name: 'Alice', age: 28, email: 'alice@email.com' },
    { id: 2, name: 'Bob', age: 35, email: 'bob@email.com' }
  ];

  listAll(): Person[] {
    return this.persons;
  }

  save(newPerson: Omit<Person, 'id'>): Person {
    const person: Person = {
      id: this.persons.length + 1,
      ...newPerson
    };
    this.persons.push(person);
    return person;
  }
}
