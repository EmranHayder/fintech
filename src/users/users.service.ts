import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    private users = [];

    async register(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // Hash the password with a salt factor of 10
        const newUser = { ...createUserDto, password: hashedPassword };
        this.users.push(newUser);
        return newUser;
    }
}
