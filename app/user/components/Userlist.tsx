'use client';
import { User } from '@prisma/client';
import React from 'react'
import Userbox from './Userbox';
interface userprops{
    data:User[];
}
const Userlist:React.FC<userprops> = ({data}) => {
  return (
    <aside className='fixed space-y-0 inset-y-0 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 black w-full left-0 '>
        <div className=" px-5">
            <div className="flex-col">
                <div className=" text-2xl font-bold text-neutral-800 py-4">People</div>
            </div>
        </div>
        {data.map((item)=>(
            <Userbox key={item.id} info={item}/>
        ))}
    </aside>
  )
}

export default Userlist