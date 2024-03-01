import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ApplicantsModule } from './applicants/applicants.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ApplicantsModule, MongooseModule.forRoot('mongodb://localhost/orgsacaba')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
