import prisma from '@/lib/primsdb'; 

import getcurrentuser from './getcurrentuser'; 

const getconversationbyid = async(conversationId:string)=>{
    try{
       const currentuser  = await getcurrentuser(); 
       if(!currentuser?.email){
        return null;
       } 
       const conversation =  await prisma.conversation.findUnique({
        where:{id:conversationId}, 
        include:{user:true}
       }) 
       return conversation;
    }catch(error){
        console.log(error); 
        return null;
    }
} 
export default getconversationbyid;