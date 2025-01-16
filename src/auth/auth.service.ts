import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { User } from 'src/users/models/user.model';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel('User')
    private readonly usersModel: Model<User>
  ){}


  public async createAccessToken(userId: string): Promise<string> {
    return sign(
      {userId}, 
      process.env.JWT_SECRET, 
      {
        expiresIn: process.env.JWT_EXPIRATION
      }
    )
  }

  public async validateUser(userId: string): Promise<User>{

    const user: User = await this.usersModel.findOne({
      _id: userId
    })

    if(!user){
      throw new UnauthorizedException(`user not found`)
    }

    return user

  }
}
