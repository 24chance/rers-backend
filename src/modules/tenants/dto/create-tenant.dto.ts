import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateTenantDto {
  @ApiProperty({ example: 'University of Nairobi' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'UON', description: 'Unique short code for the tenant' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ example: 'UNIVERSITY', description: 'Type of institution (e.g., UNIVERSITY, HOSPITAL)' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiPropertyOptional({ example: 'https://example.com/logo.png' })
  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @ApiPropertyOptional({ example: 'P.O. Box 30197, Nairobi' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: '+254722000000' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'irb@university.ac.ke' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'Arbitrary JSON settings object' })
  @IsOptional()
  @IsObject()
  settings?: Record<string, unknown>;
}
