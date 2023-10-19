'use client';
import useRouters from '@/app/hook/useroute'
import React from 'react'
import Mobelitem from '../Mobilitem'
import useConversation from '@/app/hook/useConversation';
import { useState } from 'react'; 
import { User } from '@prisma/client';
import Avatar from '../Avatar';
import Image from 'next/image'; 
import clsx from 'clsx';
import {ImUser} from "react-icons/im"
import Settingmodel from '../Settingmodel';
interface mobileprops{
  currentuser: User;
}
const Mobilebar:React.FC<mobileprops> = ({currentuser}) => {    
  console.log(currentuser);
   const {isopen} = useConversation() 
   const [open, setopen] = useState(false);
    const route = useRouters()  

    if(isopen){
      return null;
    }
    
  return (
    <>
    <Settingmodel onClose={()=>setopen(false)} isOpen={open} currentuser={currentuser}/>
    <div className='fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden'>
        {route.map((item)=>(
            <Mobelitem key={item.id} label={item.label} href={item.href} icon={item.icon} active={item.active} onClick={item.onClick}/>
        ))} 
          <div onClick={()=>setopen(true)}  className=" cursor-pointer hover:opacity-75 transition mt-3 mr-4">
             <Avatar user={currentuser}/>
          </div>
        
      
    </div> 
</>

  )
}

export default Mobilebar