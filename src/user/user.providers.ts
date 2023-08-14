import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { UserQuestion } from "./entities/user_question.entity";

export const userProviders = [
    {
        provide:'USER_REPOSITORY',
        useFactory:(dataSource:DataSource)=> dataSource.getRepository(User),
        inject:["DATA_SOURCE"]
    },
    {
        provide:'USER_QUESTION_REPOSITORY',
        useFactory:(dataSource:DataSource)=> dataSource.getRepository(UserQuestion),
        inject:["DATA_SOURCE"]
    }
]