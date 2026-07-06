import { Module } from '@nestjs/common';
import { PersonController } from './main/person/controller/PersonController';
import { PersonService } from './main/person/service/PersonService';
import { PrismaService } from './main/person/database/PrismaService';

@Module({
  imports: [],
  controllers: [PersonController],
  providers: [PersonService, PrismaService],
})
export class AppModule {}
