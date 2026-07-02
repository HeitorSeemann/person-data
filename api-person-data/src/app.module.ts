import { Module } from '@nestjs/common';
import { PersonController } from './person/controller/controller';
import { PersonService } from './person/service/service';
import { PrismaService } from './person/database/prismaService';

@Module({
  imports: [],
  controllers: [PersonController],
  providers: [
    PersonService, 
    PrismaService
  ], 
})
export class AppModule {}
