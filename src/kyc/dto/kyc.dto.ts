import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString, IsString, IsUrl } from 'class-validator';

export class KycAddDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  cin: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  selfieImage: string;
}
