'use client';
import React, { useState } from 'react'
import Modal from './Modal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from './sidebar/SettingInput';
import { User } from '@prisma/client';
import Select from './Select';
import Button from './Button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface groupprops{
    isOpen?:boolean; 
    onClose:()=>void; 
    user:User[]
}
const Groupchat:React.FC<groupprops> = ({isOpen, onClose, user}) => {
    const {register, handleSubmit, setValue, watch, formState:{errors}}=useForm<FieldValues>({
        defaultValues:{
            name:'', 
            members:[]
        }
    })
    const members = watch('members')  
    const router = useRouter()
    const[loading, setloading] = useState(false) 
    const onSubmit:SubmitHandler<FieldValues> = (data)=>{
        setloading(true); 
        axios.post('/api/conversation',{...data,isGroup:true}).then(()=>{
             router.refresh() 
             onClose()
        }).catch(()=>toast.error("Something went Wrong")).finally(()=>setloading(false))
    }
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
                <div className=" border-b border-gray-500/10 pb-12">
                    <h2 className=' text-base font-semibold leading-7 text-gray-900'>Create a Group Chat</h2> 
                    <p className=' mt-1 text-sm leading-6 text-gray-600'>Create a chat with more than 2 people</p> 
                    <div className=" mt-10 flex flex-col gap-y-8">
                        <Input disabled={loading} label='Name' id='name' errors={errors} required register={register}/>
                        <Select disabled={loading} label="Members" options={user.map((user)=>({
                                   value:user.id, 
                                   label:user.name
                        }))}  onChange={(value)=>setValue('members',value, {
                            shouldValidate:true
                        })} value={members}/>
                    </div>
                </div>
            </div>
            <div className=" mt-6 flex items-center justify-end gap-x-6">
                 <Button disabled={loading} onclick={onClose} type='button' secoundary>Cancel</Button> 
                 <Button disabled={loading}  type='submit' >Create</Button>
            </div>
        </form>
    </Modal>
  )
}

export default Groupchat