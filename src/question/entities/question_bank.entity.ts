import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";


@Entity()
export class QuestionBank {

    @PrimaryGeneratedColumn()
    id: number;

    // 年份
    @Column()
    year: string;

    // 名字
    @Column()
    name: string;
 
    //热度
    @Column({type: 'int', default: 0})
    fever: number;

    @OneToMany(type=> Question, question=> question.bank)
    questions: Question[]
  
      @CreateDateColumn()
      createdAt: Date

}
