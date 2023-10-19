'use client';
import Modal from '@/app/components/Modal';
import Image from 'next/image';
import React from 'react'
interface imagemodel{
    isOpen?:boolean; 
    onClose:()=>void; 
    src?:string | null;
}
const Imagemodel:React.FC<imagemodel> = ({isOpen, onClose, src}) => { 
    if(!src){
        return null
    }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className=" w-80 h-80">
            <Image className=' object-cover' fill alt='image' src={src}/>
        </div>
    </Modal>
  )
}

export default Imagemodel