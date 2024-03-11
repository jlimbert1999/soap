import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { jwtPayload } from './interfaces/jwt-payload.interface';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    public configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('jwt_secret'),
    });
  }

  async validate(payload: jwtPayload) {
    const user = await this.userModel.findById(payload.id);
    if (!user) throw new UnauthorizedException('Usuario invalido, vuelva a iniciar sesion');
    return user;
  }
}
