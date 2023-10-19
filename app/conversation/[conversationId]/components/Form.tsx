"use client";
import useConversation from '@/app/hook/useConversation';
import axios from 'axios';
import React from 'react'
import { useForm ,FieldValues, SubmitHandler} from 'react-hook-form';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import MessageInput from './MessageInput';
import {CldUploadButton} from 'next-cloudinary'
const Form = () => {
    const {conversationId} = useConversation(); 
    const{register, handleSubmit, setValue, formState:{errors,}}=useForm<FieldValues>({defaultValues:{message:""}}); 
    const onsubmit:SubmitHandler<FieldValues>=(data)=>{
        setValue('message','',{shouldValidate:true}); 
        axios.post('/api/messages',{...data, conversationId:conversationId}) 
        console.log(data);
    }  
    const handleupload = (result:any)=>{
       axios.post('/api/messages',{image:result.info.secure_url, conversationId:conversationId})
    }
  return (
    <div className=' py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4  w-full' onSubmit={handleSubmit(onsubmit)}>
       <CldUploadButton  options={{maxFiles:1}} onUpload={handleupload}  uploadPreset='qljh2gdx'>
       <HiPhoto size={30} className=" text-sky-500"/> 
       </CldUploadButton>
        
        <form className='flex items-center gap-2 lg:gap-4 w-full'>
          <MessageInput id="message" register={register} errors={errors} required placeholder="write a message"/> 
          <button type="submit" className=' rounded-full p-2 bg-sky-500 cursor-default hover:bg-sky-500 transition '>
            <HiPaperAirplane size={18} className=" text-white"/>
          </button>
        </form>
    </div>
  )
}

export default Form