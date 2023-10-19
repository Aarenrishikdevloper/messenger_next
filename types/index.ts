import { Conversation, Message, User } from "@prisma/client";

export type FullMessagetype = Message &{
    sender:User, 
    seen:User[]
}; 
export type Fullconversationtype = Conversation &{
    user:User[], 
    message:FullMessagetype[]
}