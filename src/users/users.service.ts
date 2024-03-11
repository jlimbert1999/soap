import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/user-create.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create({ login, password }: CreateUserDto) {
    const userDB = await this.userModel.findOne({ login: login });
    if (userDB) throw new BadRequestException(`El login ${login} ya existe`);
    const salt = bcrypt.genSaltSync();
    const encryptPassword = bcrypt.hashSync(password, salt);
    const createdUser = new this.userModel({ login: login, password: encryptPassword });
    await createdUser.save();
    const result = { ...createdUser.toObject() };
    delete result.password;
    return result;
  }
}
