import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto } from './dto/signup.dto';
import { User } from './models/user.model';
import { SigninDto } from './dto/signin.dto';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ){}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public async signup(@Body() signupDto: SignupDto): Promise<User> {
    return this.usersService.signup(signupDto)
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  public async signin(@Body() signinDto: SigninDto): Promise<{name: string, jwtToken: string, email: string}>{
    return this.usersService.signin(signinDto)
  }

}
