import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(@InjectRepository(User) private userRepositpry: Repository<User>) {}

  public async getAllUsers() {
    const users = await this.userRepositpry.find();
    this.logger.log('get all users of count: ' + users && users.length);
    return users.length > 0 ? users : new HttpException('users not found', 404);
  }

  public async createUser(userRequest: UserDto) {
    const user = {
      name: userRequest.name,
      mobileNo: userRequest.mobileNo,
      dateOfBirth: userRequest.dateOfBirth,
    } as User;

    this.logger.log('user is created');
    return await this.userRepositpry.save(user);
  }
}
