import prisma from "@/lib/primsdb"; 
import getsession  from "./getsession"; 

const getusers = async()=>{
    const seession = await getsession(); 
    if(!seession?.user?.email){
        return null;
    } 
    try{
          const users = await prisma.user.findMany({orderBy:{createdAt:'desc'}, where:{NOT:{email:seession.user.email}}}); 
          return users;
    }catch(error){
        console.log(error); 
        return [];
    }
} 
export default getusers;