import prisma from "@/lib/primsdb"; 
import getsession from "./getsession"; 

const getcurrentuser = async()=>{
 try{
   const session = await getsession(); 
   if(!session?.user?.email){
     return null;
   } 
   const currentuser = await prisma.user.findUnique({where:{email:session.user.email as string}}) 
   if(!currentuser){
    return null
   } 
   return currentuser;
 }catch(error){ 
  console.log(error);
    return null
 }
} 
export default getcurrentuser;