
import React from 'react'
import Emptystate from '../components/Emptystate'
import Userlayout from './Userlayout'


const User = () => {  
  
  return (
    <Userlayout>
    <div className=' hidden lg:block lg:pl-80 h-full'>
      <Emptystate/>
    </div>
    </Userlayout>
  )
}

export default User
