
import React from 'react'

import Sidebar from '../components/sidebar/sidebar'
import Userlist from './components/Userlist'
import getusers from '../action/getusers'

export default async function Userlayout({children}:{children:React.ReactNode}) { 
  const users = await getusers()
  return (
  <Sidebar>
    <div className='h-full'>
    <Userlist data={users!}/>
        {children}
    </div>
    </Sidebar>
  )
}

