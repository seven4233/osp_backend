import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@Inject('USER_REPOSITORY') private user: Repository<User>) {}

  async queryList() {
    let res = await this.user.find();
    return res;
  }

  async login(account, password) {
    // 校验

    // 判断是否存在
    let user = await this.user.findOne({ where: { account, password } });
    if (!user) {
      return { message: '账号或密码错误!' };
    }
    const payload = {
      id: user.id,
      account: user.account,
    };
    const safetyUser = {
        ...user,
        password:''
    }
    //   生成token 
    const token = jwt.sign(payload, 'linfeng', { expiresIn: '7 days' });
    return { message: '登录成功~', code:0, result: safetyUser, token };
  }

//   注册
  async register(account, password, confirmPass, captcha){
    // 参数校验
    if(password !== confirmPass){
        return {
            message:'两次输入密码不一致',
            code: 1
        }
    }
    // 判断是否已被注册
    const user = await this.user.findOne({where:{account}})
    if(user){
        return {
            message:'账号已被注册',
            code: 1
        }
    }
    // 添加
    console.log(account);
    const saveUser = {account, password}
    let res = await this.user.save( saveUser)
 
    // ok
    return {
        message:'注册成功~',
        code: 0,
        result: res
    }
  } 
}
