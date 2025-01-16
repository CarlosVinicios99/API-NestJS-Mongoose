import { Injectable } from '@nestjs/common';
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
}
