import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IUser, UserAuthService,LoginUserDto,UsersService } from 'users';
import { RegisterStudentUserDto } from './dto/register-student-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userAuthService: UserAuthService
  ) {}

  @Post('register/student')
  async registerStudent(@Body() data: RegisterStudentUserDto): Promise<Partial<IUser>> {
   
    return await this.userAuthService.registerStudent(data);
  }

  @Post('login')
  async login(@Body() data: LoginUserDto) {
    return await this.userAuthService.login(data);
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
