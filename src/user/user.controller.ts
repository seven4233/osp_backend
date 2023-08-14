import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // 获取用户列表
  @Get()
  getUserList(){
    let res =  this.userService.queryList()
    return res
  }

  // 登录接口
  @Post('/login')
  login(@Body() body){
    const {account, password} = body
    return this.userService.login(account, password)
  }

  // 注册接口
  @Post('/register')
  register(@Body() body){
    const {account , password , confirmPass, captcha} = body
    return this.userService.register(account, password, confirmPass, captcha)
  }
}
