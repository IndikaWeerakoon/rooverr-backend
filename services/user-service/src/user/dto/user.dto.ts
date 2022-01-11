import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @Matches('^\\d{10}$')
  mobileNo: string;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  dateOfBirth: Date;
}
