import prisma from '@/lib/primsdb'; 
 const getmesssages = async(conversationId:string)=>{
    try{
       const message = await prisma.message.findMany({where:{conversationId:conversationId}, include:{sender:true, seen:true},orderBy:{createdAt:"asc"}}) 
       return message;
    }catch(error){
        console.log(error); 
        return []
    }
 } 
 export default getmesssages;