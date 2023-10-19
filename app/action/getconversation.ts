import prisma from '@/lib/primsdb'; 
import getcurrentuser from './getcurrentuser'; 

const getConversation = async()=>{
    const currentuser = await getcurrentuser() 
    if(!currentuser){
        return []
    } 
    try{
      const conversation = await prisma.conversation.findMany({
        orderBy:{
          lastMessageAt:'desc'
       }, 
       where:{
         userids:{
            has:currentuser.id
         }, 
         
         },  
         include:{
            user:true, 
            message:{
               include:{
                 sender:true, 
                 seen:true
            }
           }
       }
      })
      return conversation;
    }catch(error){
        console.log(error); 
        return[]
    }
} 
export default getConversation;