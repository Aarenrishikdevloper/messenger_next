import Avatar from '@/app/components/Avatar';
import Loadingmodel from '@/app/components/Loadingmodel';
import { User } from '@prisma/client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'
interface Userprops{
    info:User;
}
const Userbox:React.FC<Userprops> = ({info}) => { 
  const [loading, setloading] = useState(false) 
  const router = useRouter() 
  
  const handleclick = useCallback(()=>{ 
    setloading(true); 
    axios.post('/api/conversation',{userid:info.id}).then((info)=>{
      router.push(`/conversation/${info.data.id}`);

    }).finally(()=>setloading(false));
  },[info, router])
  return (
    <>
    {loading&&<Loadingmodel/>}
    <div className='w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 transition cursor-pointer' onClick={handleclick}>
        <Avatar user={info}/> 
        <div className="min-w-0 flex-1">  
         <div className="focus:outline-none ">
            <span className=' absolute inset-0 ' aria-hidden="true"/> 
            <div className="flex justify-between items-center mb-1">
                <p className='text-sm font-medium text-gray-900'>{info.name}</p>
            </div>
         </div>
        </div>
    </div>
    </>
  )
}

export default Userbox