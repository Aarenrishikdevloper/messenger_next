'use client';
import useConversation from '@/app/hook/useConversation';
import { Fullconversationtype } from '@/types';
import clsx from 'clsx'
import React, { useState, useMemo, useEffect } from 'react'
import {MdOutlineGroupAdd} from "react-icons/md" 
import Conversationbox from './Conversationbox';
import Groupchat from '@/app/components/Groupchat';
import { User } from '@prisma/client'; 
import { pusherclient } from '@/lib/pusher'; 
import {useSession} from "next-auth/react" 
import {find} from "lodash";
interface conversationlistprops{
  intialitem:Fullconversationtype[]; 
  user:User[]
}
const Conversationlist:React.FC<conversationlistprops> = ({intialitem,user}) => { 
    const {isopen} = useConversation()  
    const[item ,setitem] = useState(intialitem); 
    const[open , setopen] = useState(false);  
    const session = useSession()
    const pusherkey = useMemo(()=>{
      return session.data?.user?.email
    },[ session.data?.user?.email]) 
    useEffect(()=>{
      if(!pusherkey){
        return;
      }  
      const newhandler=(conversation:Fullconversationtype)=>{
        
        setitem((current)=>{
          if(find(current,{id:conversation.id})){
            return current;
          } 
          return[conversation, ...current]
        })
      } 
      const updtehandler =(conversation:Fullconversationtype)=>{
        setitem((current)=>current.map((currentconversation)=>{
          if(currentconversation.id === conversation.id){
            return{
              ...currentconversation, message:conversation.message
            };

            
          } 
          return currentconversation;
        }))
      }
      pusherclient.subscribe(pusherkey); 
      pusherclient.bind("conversation:new", newhandler)  
      pusherclient.bind('conversation:update', updtehandler)

    },[pusherkey])
  return (
    <> 
    <Groupchat isOpen={open} onClose={()=>setopen(false) } user={user}/>
    <aside className={clsx('fixed inset-y-0 lg:pb-20 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200',isopen?'hidden':'block w-full left-0')}>  
    <div className=" px-5">
      <div className=" flex justify-between mb-4 pt-4">
        <div className=" text-2xl font-bold text-neutral-800">Messages</div> 
        <div className=" rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition" onClick={()=>setopen(true)}>
            <MdOutlineGroupAdd size={20}/>
        </div>
      </div> 
      {item.map((items)=>(
        <Conversationbox key={items.id} data={items}/>
      ))}
    </div> 
    

    </aside> 
    </>
  )
}

export default Conversationlist