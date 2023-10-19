'use client';
import React, { useMemo, useState } from 'react' 
import { Conversation, User,  } from '@prisma/client'
import useOtherUser from '@/app/hook/getOtheruser'
import Avatar from '@/app/components/Avatar'
import Link from 'next/link';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import Profiledrawer from './Profiledrawer';
import Avatargroup from './Avatargroup';
import useActivelist from '@/app/hook/useactiveList';
interface header{
    conversation: Conversation &{
        user:User[]
    }
}
const Header:React.FC<header> = ({conversation}) => { 
    const otheruser = useOtherUser(conversation);  
    const{members} = useActivelist()
  const isactive = members.indexOf(otheruser?.email!) !== -1
    const[state, setstate] = useState(false);   
    const statusText = useMemo(()=>{
       if(conversation.isGroup){
         return `${conversation.user.length} members` 

       }
       return isactive? "Online":"Offline";
    },[conversation, isactive])
  return ( 
    <>
    <Profiledrawer data={conversation}  isopen={state} onClose={()=>setstate(false)}/>
    <div className=" bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className=" flex gap-3 items-center"> 
        <Link href="/conversation" className=' lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer'> 
          <HiChevronLeft size={32}/>
        </Link>
           {conversation.isGroup?<Avatargroup user={conversation.user}/>: <Avatar user={otheruser}/> }
            <div className=" flex flex-col">
                <div>{conversation.name || otheruser.name}</div> 
                <div className=" text-sm font-light text-neutral-500">{statusText}</div>
            </div> 
           
        </div> 
        <HiEllipsisHorizontal size={32}  className=" text-sky-500 cursor-pointer hover:text-sky-600 translate-x-2nsition" onClick={()=>setstate(true)}/> 
        </div> 
        </> 
  )
} 
export default Header;