import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

describe('UserController', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should register a new user', async () => {
    const createUserDto = {
      username: 'testUser',
      email: 'test@example.com',
      phoneNumber: '1234567890',
      password: 'password',
    };

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const expectedUser = { ...createUserDto, password: hashedPassword };

    jest.spyOn(userService, 'register').mockImplementation(() => Promise.resolve(expectedUser));

    const user = await controller.register(createUserDto);

    expect(user).toEqual(expectedUser);
  });
});
