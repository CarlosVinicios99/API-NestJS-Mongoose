import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose';
import { User } from './models/user.model';
import { AuthService } from 'src/auth/auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';


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

  public async signin(signinDto: SigninDto): Promise<{name: string, jwtToken: string, email: string}>{
    const user = await this.findByEmail(signinDto.email)
  }

  private async findByEmail(email: string): Promise<User>{
    const user: User = await this.usersModel.findOne({
      email: email
    })

    if(!user){
      throw new NotFoundException(`Email not found`)
    }

    return user
  }

  private async checkPassword(password: string, user: User): Promise<Boolean> {
    const match: boolean = bcrypt.compare(password, user.password)

    if(!match){
      throw new NotFoundException(`Password not found`)
    }

    return match
  } 

}
