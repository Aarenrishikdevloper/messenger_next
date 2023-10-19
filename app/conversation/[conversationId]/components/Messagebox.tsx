import { FullMessagetype } from '@/types'
import React, { useCallback, useState } from 'react' 
import {useSession} from  'next-auth/react'
import clsx from 'clsx'
import Avatar from '@/app/components/Avatar' 
import {format} from 'date-fns';
import Image from 'next/image'
import axios from 'axios';
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Imagemodel from './Imagemodel'

interface messageprops{
    data:FullMessagetype, 
    islast?:boolean
}
const Messagebox:React.FC<messageprops> = ({data, islast}) => { 

    const session = useSession()   
   
    const router = useRouter()
    const isown = session.data?.user?.email === data.sender?.email;  
    const seenlist = (data.seen || []).filter((user)=>user.email !== data?.sender?.email).map((user)=> user.name).join(',');
    const [openmenu, setmenu] = useState(false);
    const container =  clsx('flex gap-3 p-4', isown && ' justify-end')  
    const body = clsx(' flex flex-col gap-2 ', isown && 'items-end')
    const avatar = clsx(isown && 'order-2') 
    const message = clsx(' text-sm w-fit overflow-hidden', isown?"bg-sky-500 text-white":'bg-gray-100', data.image?'rounded-md p-0':'rounded-full py-2 px-3') 
    const usedelete = useCallback(() => {
      console.log(data.id);
      const  messageid= data.id; 
    
      axios.post(`/api/delete`,{messageid:data.id}).then(() => {
        toast.success("Conversation deleted"); 
        window.location.reload()
      }).catch(()=>toast.error("Something went wrong"))
    }, [data.id]);
    const[open, setopen] = useState(false); 
   
  return (
  
    <div className={container} >
      <div className={clsx(isown && 'order-2')}>
        <Avatar user={data.sender}/>
      </div> 
      <div className={body} >
        <div className=" flex items-center gap-1">
            <div className=" text-sm text-gray-500 ">
                {data.sender.name}
            </div> 
            <div className=" text-xs text-gray-400">
                {format(new Date(data.createdAt), 'p')}
            </div>
        </div>
        <div className={message} onClick={()=> setmenu(!openmenu)}>
          <Imagemodel src={data.image} isOpen={open} onClose={()=>setopen(false)}/>
            {data.image?<Image alt="image" width={288} height={288} src={data.image} className=' object-cover cursor-pointer hover:scale-110 transition translate' onClick={()=>setopen(true)}/>:<div>{data.body}</div>}
        </div> 
        {islast && isown && seenlist.length > 0 &&(
          <div className=" text-xs font-light  text-gray-500">
             {`Seen by ${seenlist}`}
          </div>
        )}  
        {isown && openmenu&&(
           <div className="relative mb-2 " >
             <button className=' absolute top-0 right-0 p-2 text-gray-500 hover:text-red-500 ' onClick={usedelete}>Delete</button>
           </div>
        )}

      </div>
    </div>
  )
}

export default Messagebox