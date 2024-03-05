import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ApplicantsModule } from './applicants/applicants.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ApplicantsModule,
    MongooseModule.forRoot('mongodb+srv://test:2024_test@cluster0.jmkbaqz.mongodb.net/organigrama'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
