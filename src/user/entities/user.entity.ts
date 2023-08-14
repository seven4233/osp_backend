import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    // 账号
    @Column()
    account: string;

    // 密码
    @Column()
    password: string;

    //性别
    @Column({type: 'tinyint', nullable: true})
    gender: number;

    // 头像
    @Column({type:'varchar'})
    avatar: string;
    // 电话
    @Column({nullable: true})
    phone: string;

    // 邮箱
    @Column({nullable: true})
    email: string;

    // 权限
    @Column({type: "tinyint", default: 0})
    access: string;

      // 等级
      @Column({nullable: true, default:1})
      level: number;
 
      @CreateDateColumn()
      createdAt: Date

}
