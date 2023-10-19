import { User } from '@prisma/client'
import Image from 'next/image';
import React from 'react'
interface groupprops{
    user: User[]
}
const Avatargroup:React.FC<groupprops> = ({user=[]}) => { 
    const sliceduser = user.slice(0,3); 
    const positionMap = {
        0: 'top-0 left-[12px]', 
        1: 'bottom-0', 
        2: 'bottom-0 right-0'
    }
  return (
    <div className=' relative h-11 w-11 '>
        {sliceduser.map((user, index)=>(
            <div className={ `absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px] ${positionMap[index as keyof typeof positionMap]}`} key={user.id}>
                <Image fill src={user?.image || '/image/placeholder.webp'} alt='avatar'/>
            </div>
        ))}
    </div>
  )
}

export default Avatargroup