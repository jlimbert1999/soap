import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';

import { Module } from '@nestjs/common';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UsersService],
  exports: [MongooseModule],
})
export class UsersModule {}
