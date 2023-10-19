import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import useActivelist from '../hook/useactiveList'
interface avatar{
    user: User
}
const Avatar:React.FC<avatar> = ({user}) => {  
  const{members} = useActivelist()
  const isactive = members.indexOf(user?.email!) !== -1
  return (
   <div className="relative">
     <div className=" relative inline-block  rounded-full overflow-hidden h-9 w-9 md:w-9 md:h-9">
        <Image height={60} width={60} src={user?.image || '/image/placeholder.webp'} alt="avatar"/>
     </div>
    {isactive? <span className='absolute block rounded-full bg-green-500 ring-white top-0 right-0 h-1 w-1 md:h-2 md:w-2'/>:null}
   </div>
  )
}

export default Avatar