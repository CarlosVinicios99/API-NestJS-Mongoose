import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose';
import { User } from './models/user.model';
import { AuthService } from 'src/auth/auth.service';
import { SignupDto } from './dto/signup.dto';


@Injectable()
export class UsersService {

  constructor(
    private readonly usersModel: Model<User>,
    private readonly authService: AuthService
  ){}

  public async signup(signupDto: SignupDto): Promise<User>{
    const user = new this.usersModel(signupDto)
    return await user.save()
  }


}
