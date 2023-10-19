'use client';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import React, { useCallback, useEffect, useState } from 'react' 
import { ClipLoader } from "react-spinners"
import {BsGithub, BsGoogle } from "react-icons/bs"
import Authsocialbutton from './Authsocialbutton';
import toast from 'react-hot-toast';
import axios from 'axios';
import { signIn , useSession} from 'next-auth/react';
import {  useRouter } from 'next/navigation';


type Variant = 'LOGIN' | 'REGISTER'


const Authform = () => {   
  const session = useSession()  
  const router = useRouter() 

 
  useEffect(()=>{
    
    if(session?.status === "authenticated"){
      router.push('/conversation')  
      
      
    }
  },[session?.status, router])

  const [variant, setvariant] = useState<Variant>('LOGIN');  
  const[email, setemail] = useState(''); 
  const[password, setpassword] = useState(''); 
  const[name, setname] = useState('');
  const[isloading, setloading] = useState(false); 
  
  const tooglevariant = useCallback(()=>{
      if(variant === "LOGIN"){
        setvariant('REGISTER')
      }else{
        setvariant('LOGIN')
      }
  },[variant]) 

  const submit = useCallback(async(e:any)=>{  
    e.preventDefault()
    setloading(true);
    if(variant === "REGISTER"){
     try{
        const res = await axios.post("/api/register",{email, password, name}) 
        setloading(false); 
        toast.success("Account Created",{style:{borderRadius:"10px", background:'#333', color:"#fff"}}) 
        signIn('credentials', {email,password})
        router.push('/conversation')
        
        
     }catch{
       toast.error("Something Went Wrong",{style:{borderRadius:"10px", background:'#333', color:"#fff"}})
     }finally{
        setloading(false);
     }
    } 
    if(variant ==="LOGIN"){
       
        try{
          signIn('credentials', {email,password})  
          toast.success("Logged in",{style:{borderRadius:"10px", background:'#333', color:"#fff"}}) 
          router.push('/conversation') 
        
        }catch{
          toast.error("Something Went Wrong",{style:{borderRadius:"10px", background:'#333', color:"#fff"}})
        }
      
    }   
  },[email, password, name,variant,router])
  const socialauth = (action:string)=>{  
    setloading(true)
      signIn(action,{redirect:false}).then((callback)=>{
         if(callback?.ok){
          toast.success("Logged in",{style:{borderRadius:"10px", background:'#333', color:"#fff"}}) 
         }if(callback?.error && !callback.ok){
          toast.error("Logged in",{style:{borderRadius:"10px", background:'#333', color:"#fff"}}) 
         }
      }).finally(()=>setloading(false))
       
  }  
 
 
  return (
    
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'> 
    
      
      <div className=" bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className=' space-y-6' onSubmit={submit}> 
      {variant === "REGISTER" && (  
      
      
      <Input disabled={isloading}  required id="name" label="Name" type="text" value={name} onChange={(e)=>setname(e.target.value)}/>)}
     <Input disabled={isloading} type='email' required id="email" label='email' value={email} onChange={(e)=>setemail(e.target.value)}/>
       
        <Input disabled={isloading} value={password} onChange={(e)=>setpassword(e.target.value)} required id="password" label="password" type="password"/> 
        <div>
          <Button disabled={isloading} fullwidth type="submit">
            {variant === "LOGIN" ?"Sign in":"Sign up"}
          </Button>
        </div>
        </form>   
        <div className="mt-6">
          <div className="relative">
            <div className=" absolute inset-0 flex items-center">
               <div className='w-full border-t border-gray-300'/>
            </div> 
            <div className="relative flex justify-center text-sm">
              <span className='bg-white px-2 text-gary-500'> Or Continue with</span>
            </div>
          </div> 
          <div className="mt-6 flex gap-2">
            <Authsocialbutton icon={BsGithub} onclick={()=>socialauth('github')} /> 
            <Authsocialbutton icon={BsGoogle} onclick={()=>socialauth('google')} /> 
          </div>
        </div> 
        <div className=" flex gap-2 justify-center text-sm  mt-6 px-2  text-gray-600">
          <div onClick={tooglevariant} className=' underline cursor-pointer'>
            {variant==="LOGIN" ?"Create an Account":"Login"}
          </div>
        </div>

      </div>
      </div>
    

  )
}

export default Authform