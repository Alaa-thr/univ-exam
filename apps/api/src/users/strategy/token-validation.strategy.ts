import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from 'users/users.repository';
import * as dotenv from 'dotenv';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EUserRoles } from 'users/user-roles.enum';
import { IUser } from 'users/interface/user.interface';

dotenv.config();

@Injectable()
export class TokenValidationStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepo: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // will recover (recuperer) le jwt from rqt and then recover the payload
      ignoreExperation: false, // c a d est ce que verifie la date dexpiration du reqt (up) ou nn
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: { userData: IUser; role: EUserRoles }) {
    const { userData } = payload;
    const user = await this.userRepo.findUser(userData.email);
    if (!user) {
      throw new UnauthorizedException('You are not authorized for this route');
    }
    return userData;
  }
}
