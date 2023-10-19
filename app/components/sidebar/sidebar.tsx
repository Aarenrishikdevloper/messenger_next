import React from 'react'
import Desktopbar from './Desktopbar'
import Mobilebar from './Mobilebar'
import getcurrentuser from '@/app/action/getcurrentuser'

async function Sidebar({children}:{children:React.ReactNode},) { 
  const currentuser =  await getcurrentuser()
  return (
    <div className='h-full'>
      <Desktopbar currentuser={currentuser!}/>
      <Mobilebar currentuser={currentuser!}/>
        <main className=' lg:pl-20 h-full'>
            {children}
        </main>
    </div>
  )
}

export default Sidebar