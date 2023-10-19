'use client';
import useOtherUser from '@/app/hook/getOtheruser';
import { Conversation, User } from '@prisma/client';
import { format } from 'date-fns';
import React, { Fragment, useMemo, useState } from 'react'  
import {Dialog, Transition} from '@headlessui/react' 
import {IoClose, IoTrash} from 'react-icons/io5'
import Avatar from '@/app/components/Avatar';
import ConfirmModel from './ConfirmModel';
import Avatargroup from './Avatargroup';

import useActivelist from '@/app/hook/useactiveList';

interface profile{
    isopen: boolean; 
    onClose:()=>void; 
    data: Conversation &{
        user:User[]
    }
}

const Profiledrawer:React.FC<profile> = ({isopen, onClose, data }) => {  
    const[confirm, setconfirmstate] = useState(false);
    const otheruser = useOtherUser(data);   
   
    const title = useMemo(()=>{
        return data.name || otheruser.name
    },[data.name, otheruser.name]) 
    const joineddate = useMemo(()=>{
        return format(new Date(otheruser.createdAt),'PP');
    },[otheruser.createdAt])  
    const{members} = useActivelist()
  const isactive = members.indexOf(otheruser?.email!) !== -1
    const staustext =useMemo(()=>{
        if(data.isGroup){
            return `${data.user.length} menmbers`
        }
        return isactive?"Online":"Offline";
    },[data, isactive]); 
   
  return (
    <>
   <ConfirmModel isOpen={confirm} onClose={()=>setconfirmstate(false)}/>
    <Transition.Root show={isopen} as={Fragment}>
        <Dialog as="div" className={' relative z-50'} onClose={onClose}>
            <Transition.Child as={Fragment} enter='ease-out duration-500' enterFrom=' opacity-0 ' enterTo='opacity-100' leave='ease-in duration-500' leaveFrom=' opacity-100' leaveTo='opacity-0'>
                <div className=" fixed inset-0 bg-black bg-opacity-40"/>
                

            </Transition.Child>
            <div className="fixed inset-0 overflow-hidden">
                <div className=" absolute inset-0 overflow-hidden">
                    <div className=" pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <Transition.Child as={Fragment} enter=' transform transition ease-in-out duration-500' enterFrom='translate-x-0 ' leave=' transform transition ease-in-out duration-500 '  leaveTo=' translate-x-full'> 
                        <Dialog.Panel className='pointer-events-none w-screen max-w-md'> 
                           <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl"> 
                              <div className=" px-4 sm:px-6">
                                <div className=" flex items-start justify-end">
                                     <div className=" ml-3 flex h-7 items-center">
                                        <button type="button" onClick={onClose} className=' rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 '>
                                            <span className=' sr-only'> Close panel</span> 
                                            <IoClose size={34}/>
                                        </button>
                                     </div>
                                </div>
                              </div>
                              <div className=" relative mt-6 flex-1 px-4 sm:px-6">
                                 <div className=" flex flex-col items-center">
                                    <div className=" mb-2">
                                    {data.isGroup?<Avatargroup user={data.user}/>: <Avatar user={otheruser}/> }
                                    </div> 
                                    <div>
                                        {title}
                                    </div> 
                                    <div className=" text-sm text-gray-500">
                                        {staustext}
                                    </div> 
                                   
                                  
                                </div>  
                            <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                                <dl className=' space-y-8 px-4 sm:space-y-6 sm:px-6'> 
                                   {!data.isGroup&&(
                                     <div>
                                        <dt className=' text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
                                           Email
                                        </dt>
                                        <dd className=' mt-1 text-sm text-gray-900 sm:flex-shrink-0'>
                                            {otheruser.email}
                                        </dd>
                                     </div>
                                   )}
                                   {!data.isGroup &&(
                                     <>
                                        <hr/> 
                                        <div>
                                            <dt className=' text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
                                                Joined
                                            </dt>
                                            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
                                                <time dateTime={joineddate}>{joineddate}</time>
                                            </dd>
                                        </div>
                                     </>
                                   )} 
                                   {data.isGroup &&(
                                     <div>
                                        <dt className=' text-sm font-medium text-gray-500  sm:w-40 sm:flex-shrink-0'>Emails</dt> 
                                        <dd className=' mt-1 text-sm text-gray-900 sm:col-span-2'>{data.user.map((user)=>user.email).join(' , ')}</dd>
                                     </div>
                                   )}
                                </dl>
                            </div>   
                                 
                                
                          </div>    
                             
                           </div>   
                              
                           

                        </Dialog.Panel>

                        </Transition.Child>
                    </div>
                </div>
            </div> 
        </Dialog>
    </Transition.Root> 
    </>
  )
}

export default Profiledrawer