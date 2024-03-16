import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ApplicantsModule } from './applicants/applicants.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/env-configuration';
// mongodb+srv://test:2024_test@cluster0.jmkbaqz.mongodb.net/organigrama

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UsersModule,
    AuthModule,
    ApplicantsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/orgsacaba'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
