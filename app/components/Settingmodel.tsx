import { User } from '@prisma/client'
import React, { useState } from 'react'
import Modal from './Modal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FieldValue } from 'firebase-admin/firestore';
import Input from './sidebar/SettingInput';
import Image from 'next/image';
import { image } from 'image-downloader';
import Button from './Button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { CldUploadButton } from 'next-cloudinary';

interface settinmodal{
    currentuser:User; 
    onClose: () => void  
    isOpen?:boolean;
}
const Settingmodel:React.FC<settinmodal> = ({currentuser, onClose, isOpen}) => { 
    const [isloading, setloading]  = useState(false); 
    const router = useRouter()
    const {register, handleSubmit, setValue, watch,formState:{errors,}}=useForm<FieldValues>({
        defaultValues:{
            name:currentuser?.name, 
            image:currentuser?.image
        }
    })  
    const handleupload = (result:any)=>{
        setValue('image', result.info.secure_url);
    } 
    const onsubmit:SubmitHandler<FieldValues> = (data)=>{  
        setloading(true)
        axios.post('/api/settings',data).then(()=>{
          router.refresh(); 
          onClose()
        }).catch(()=>toast.error("Something went wrong")).finally(()=>setloading(false));

    }
    const image = watch('image')
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
        <form onSubmit={handleSubmit(onsubmit)}>
            <div className=" space-y-12 ">
                <div className=" border-b border-gray-900/10 pb-12">
                    <h2 className='text-base font-semibold leading-7 text-gray-900'>
                        Profile
                    </h2> 
                    <p className=' mt-1 text-sm leading-6 text-gray-600'>Edit your Profile</p> 
                    <div className=" mt-10 flex flex-col gap-y-8">
                        <Input disabled={isloading} label='Name' errors={errors} required register={register} id='name'/> 
                        <div> 
                            <label htmlFor="photo"  className='block text-sm font-medium leading-6 text-gray-900'>Photo</label> 
                            <div className="mt-2 flex items-center gap-x-3">
                                <Image width={48} height={48} className='rounded-full' src={image || currentuser?.image || '/image/placeholder.webp'} alt="avatar"/>
                                <CldUploadButton options={{maxFiles:1}} onUpload={handleupload} uploadPreset='qljh2gdx'>
                                <Button disabled={isloading} secoundary type='button'>Change</Button> 
                                </CldUploadButton>
                            </div>
                        </div>
                    </div> 

                </div> 
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Button disabled={isloading} secoundary onclick={onClose}>Cancel</Button> 
                    <Button disabled={isloading}  type='submit'>Save</Button>
                </div>
            </div>
        </form>
    </Modal>
  )
}

export default Settingmodel