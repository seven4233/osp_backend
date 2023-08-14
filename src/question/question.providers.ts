import { DataSource } from "typeorm";
import { Question } from "./entities/question.entity";
import { QuestionBank } from "./entities/question_bank.entity";
import { UserQuestion } from "src/user/entities/user_question.entity";

export const questionProviders = [
    {
        provide:'QUESTION_REPOSITORY',
        useFactory:(dataSource:DataSource)=> dataSource.getRepository(Question),
        inject:["DATA_SOURCE"]
    },
    {
        provide:'QUESTION_BANK_REPOSITORY',
        useFactory:(dataSource:DataSource)=> dataSource.getRepository(QuestionBank),
        inject:["DATA_SOURCE"]
    },
    {
        provide:'USER_QUESTION_REPOSITORY',
        useFactory:(dataSource:DataSource)=> dataSource.getRepository(UserQuestion),
        inject:["DATA_SOURCE"]
    }

]