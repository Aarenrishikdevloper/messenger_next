'use client';
import Avatar from '@/app/components/Avatar';
import useOtherUser from '@/app/hook/getOtheruser'
import { Fullconversationtype } from '@/types'
import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo } from 'react' 
import {format} from 'date-fns' 
import {useSession} from "next-auth/react"
import { useRouter } from 'next/navigation';
import Avatargroup from '../[conversationId]/components/Avatargroup'; 


interface conversationtype{
  data:Fullconversationtype 
  selected?:boolean
}
const Conversationbox:React.FC<conversationtype> = ({data, selected}) => {  
  const otherUser = useOtherUser(data); 
  const session = useSession()
 const lastmessage = useMemo(()=>{
   const messages = data.message || []; 
   return messages[messages.length - 1];
},[data.message]);   
const router = useRouter()
const handleclick = useCallback(()=>{
  router.push(`/conversation/${data.id}`)
},[data, router])
const lastmessagetext = useMemo(()=>{
   if(lastmessage?.image){
    return "Sent an Image"
   } 
   if(lastmessage?.body){
     return lastmessage?.body
   }
  return "No messages yet"
},[lastmessage])  
const useremail = useMemo(()=>session.data?.user?.email, [session.data?.user?.email])
const hasseen = useMemo(()=>{
   if(!lastmessage){
     return false;
   } 
   const seenmessage = lastmessage.seen || []; 
  
   if(!useremail){
    return false;
   } 
   return seenmessage.filter((user)=> user.email === useremail).length != 0;
},[useremail, lastmessage]); 

  return (
    <div className={clsx('w-full relative flex items-center space-x-3 p-3 hover:bg-neutral-100 ', selected?' bg-neutral-100':'bg-white')} onClick={handleclick}>
       {data.isGroup?<Avatargroup user={data.user}/>: <Avatar user={otherUser}/> }
      <div className=" min-w-0 flex-1">
        <div className=" focus:outline-none">
          <span className=' absolute inset-0' aria-hidden="true"/> 
          <div className=" flex justify-between items-center mb-1">
             <p className=' text-sm font-medium text-gray-900'>{data.name || otherUser.name}</p>  
              {lastmessage?.createdAt &&(
                <p className=' text-xs text-gray-400 font-light'>{format(new Date(lastmessage.createdAt), 'p')}</p>
              )}
          </div> 
          <p className={clsx('truncate text-sm',hasseen?'text-gray-500':'text-black font-medium')}>{lastmessagetext}</p> 

        </div>
      </div>
    </div>
  )
}

export default Conversationbox