import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { jwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async login({ login, password }: LoginDto) {
    const user = await this.userModel.findOne({ login: login });
    if (!user) throw new BadRequestException('Usuario o Contraseña incorrectos');
    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('Usuario o Contraseña incorrectos');
    }
    return { token: this.generateToken(user) };
  }

  async checkAuthStatus(id_user: string) {
    const user = await this.userModel.findById(id_user);
    if (!user) throw new UnauthorizedException();
    return { token: this.generateToken(user) };
  }


  private generateToken(user: User): string {
    const payload: jwtPayload = { id: user._id };
    return this.jwtService.sign(payload);
  }
}
