import { Fullconversationtype } from "@/types";
import { User } from "@prisma/client"; 
import {useSession} from 'next-auth/react'
import { useMemo } from "react";
const useOtherUser = (conversation:Fullconversationtype | {user:User[]})=>{
   const session = useSession(); 
   const otheruser = useMemo(()=>{
    const currentuseremail = session.data?.user?.email;  
    const otherUser = conversation.user.filter((users)=>users.email !==currentuseremail);
    return otherUser[0]
   },[session.data?.user?.email, conversation.user])    
   return otheruser
   
} 
export default useOtherUser;