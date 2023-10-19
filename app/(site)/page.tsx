import React from 'react'
import Image from 'next/image'
import Authform from './components/Authform'
const page = () => {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 bg-gray-100 sm:px-6 lg:px-8">
     <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image alt="logo" src="/image/logo.png" height={48} width={48} className=' mx-auto w-auto' /> 
        <h2 className='mt-6 text-center text-3xl font-bold text-gray-900'>Sign In to your account</h2>
     </div> 
     <Authform/>
    </div>
  )
}

export default page