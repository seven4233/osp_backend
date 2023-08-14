import { Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { In,  Not,Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { QuestionBank } from './entities/question_bank.entity';
import { UserQuestion } from 'src/user/entities/user_question.entity';

@Injectable()
export class QuestionService {

  constructor(@Inject('QUESTION_REPOSITORY') private question: Repository<Question>,
  @Inject('QUESTION_BANK_REPOSITORY') private qb: Repository<QuestionBank>, 
  @Inject('USER_QUESTION_REPOSITORY') private userQuestion: Repository<UserQuestion>){}
  
  // 获取题库列表
  async getBankList(){
    const res = await this.qb.find({
      // relations:['questions']
    })
    return res
  }

  // 根据题库id 获取题目
  
  async getQuestionList(bankId:any, userId:number) {
   
    // 根据用户id找到已做的 () 题
    const singleDoneCount =  await this.userQuestion.count({where: {user_id: userId, question_sort:'单选题'}})
    const multipleDoneCount =  await this.userQuestion.count({where: {user_id: userId, question_sort:'多选题'}})
    const blankDoneCount =  await this.userQuestion.count({where: {user_id: userId, question_sort:'填空题'}})
    const judgeDoneCount =  await this.userQuestion.count({where: {user_id: userId, question_sort:'判断题'}})

   let res =  await this.question.find({
    where: {bank: bankId}
   }); 
   return {result: res, singleDoneCount, multipleDoneCount, blankDoneCount, judgeDoneCount};
  }

  // 根据 题库id 获取不同题型 
  async querySingleList(size=5, userId: number){

    // 根据用户id找到已做的 (单选) 题
   const doneList =  await this.userQuestion.findAndCount({where: {user_id: userId, question_sort:'单选题'}})

   const doneCount = doneList[1]
  //  组成question_num 数组
    const doneArr = doneList[0].map(item=> {
      return item.question_num
   })
   console.log(doneList[0]);
  //  获取没有 做正确 的题目
    let res = await this.question.find({
      take: size,
      where: {
        sort:'单选题',
        question_num: Not(In(doneArr))
      }
    })
    return {result: res, doneCount}
  }


  // 插入已完成题目
  async insertFinishedQuestion(body:any,  userId: number){
    const {sort, correctList} = body
    console.log(sort);
    
    const doneArr = (correctList as any[]).map(item=> {
      return {
        user_id: userId,
        bank_id: 1,
        question_num: item.question_num,
        question_sort: sort
      }
    })
    
    for(let i = 0; i < doneArr.length; i++){ 
      const res =  await this.userQuestion.save(doneArr[i])
    }

     return {code: 0, message:'提交成功!'}
  }
  
}
