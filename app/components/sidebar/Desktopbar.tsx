'use client'
import useRouters from '@/app/hook/useroute';
import React, { useState } from 'react'
import Desktopitem from './Desktopitem';
import { User } from '@prisma/client';
import Avatar from '../Avatar'; 
import Settingmodel from '../Settingmodel';
interface desktopprops{
  currentuser: User;
}
const Desktopbar:React.FC<desktopprops> = ({currentuser}) => {   
  console.log({currentuser}); 
  const [open, setopen] = useState(false);
    const route = useRouters()
  return ( 
    <>
   <Settingmodel currentuser={currentuser} isOpen={open} onClose={()=>setopen(false)}/>
    <div className=' hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between '>
        <nav className='mt-4 flex flex-col justify-between'>
          <ul role='list' className=' flex flex-col items-center space-y-1'>
            {route.map((item)=>(
              <Desktopitem key={item.id} label={item.label} href={item.href} icon={item.icon} active={item.active} onClick={item.onClick}/>
            ))}
          </ul>
        </nav> 
        <nav className=' mt-4 flex flex-col justify-between items-center'>
          <div onClick={()=>setopen(true)}  className=" cursor-pointer hover:opacity-75 transition">
             <Avatar user={currentuser}/>
          </div>
        </nav>
    </div> 
    </>
  )
}

export default Desktopbar