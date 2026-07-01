import { Module } from '@nestjs/common';
import { PersonController } from './person/controller/controller';
import { PersonService } from './person/service/service';

@Module({
  imports: [],
  controllers: [PersonController], 
  providers: [PersonService],     
})
export class AppModule {}
