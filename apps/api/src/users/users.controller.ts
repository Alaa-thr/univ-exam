import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryDto } from 'shared';
import { IUser, UserAuthService, LoginUserDto, UsersService } from 'users';
import { RegisterStudentUserDto } from './dto/register-student-user.dto';
import { RegisterTeacherUserDto } from './dto/register-teacher-user.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userAuthService: UserAuthService
  ) {}

  @Post('register/student')
  async registerStudent(
    @Body() data: RegisterStudentUserDto
  ): Promise<Partial<IUser>> {
    return await this.userAuthService.registerStudent(data);
  }

  @Post('register/teacher')
  async registerTeacher(
    @Body() data: RegisterTeacherUserDto
  ): Promise<Partial<IUser>> {
    return await this.userAuthService.registerTeacher(data);
  }

  @Post('login')
  async login(@Body() data: LoginUserDto) {
    return await this.userAuthService.login(data);
  }

  @Get()
  findAll(@Query() query: QueryDto) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: LoginUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
