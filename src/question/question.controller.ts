import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  /**
   * 获取题库
   */
  @Get('/bank')
  getQuestionBankList(){
    return this.questionService.getBankList()
  }

  /**
   * 根据题库id 获取题目列表
   * @param query 
   * @returns 
   */
  @Get(':id')
  findQuestionByBankId(@Param() param, @Req() req) {
    const {bankId}  = param
    const {id: userId} = req.currentUser
    console.log(userId);
    
    // return 1
    return this.questionService.getQuestionList( bankId, +userId);
  }

  // 获取单选题 列表
  @Get('/sort/single')
  findSingleQuestionList(@Query() query, @Req() req){
    const {id: userId} = req.currentUser //拿到当前用户id
    const {current, size} = query
    return this.questionService.querySingleList(size, userId)
  }

  // 添加已完成题目
  @Post('/finish')
  addFinishedQuestion(@Body() body, @Req() req){

    const {id: userId} = req.currentUser
    return this.questionService.insertFinishedQuestion(body, userId)
  }

}
