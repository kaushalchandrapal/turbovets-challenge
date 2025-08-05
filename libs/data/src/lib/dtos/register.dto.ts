import { IsEmail, IsInt, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  name!: string;

  @IsInt()
  organizationId!: number;

  @IsInt()
  roleId!: number;
}
