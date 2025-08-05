// auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@turbovets-challenge/data/entities';
import { RegisterDto, LoginDto } from '@turbovets-challenge/data/dtos';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password: hash });
    return this.userRepo.save(user);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const validUser = await this.authService.validateUser(dto.email, dto.password);
    return this.authService.login(validUser);
  }
}
