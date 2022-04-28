import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IUser, UserAuthService,LoginUserDto,RegisterUserDto,UsersService } from 'users';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userAuthService: UserAuthService
  ) {}

  @Post('register')
  async register(@Body() data: RegisterUserDto): Promise<Partial<IUser>> {
    return await this.userAuthService.register(data);
  }

  @Post('login')
  async login(@Body() data: LoginUserDto) {
    return await this.userAuthService.login(data);
  }

  @Post()
  create(@Body() createUserDto: RegisterUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: LoginUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
