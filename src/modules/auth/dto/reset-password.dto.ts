import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ description: 'Reset token received via email/response' })
  @IsString()
  token: string;

  @ApiProperty({ example: 'NewP@ssw0rd!', minLength: 8 })
  @IsString()
  @MinLength(8)
  newPassword: string;
}
