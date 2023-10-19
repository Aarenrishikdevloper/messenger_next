import React from 'react'
import { IconType } from 'react-icons'
interface buttonprops{
    icon:IconType, 
    onclick:()=>void
}
const Authsocialbutton:React.FC<buttonprops> = ({icon:Icon, onclick}) => {
  return (
    <button className='inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm right-1 ring-inset ring-gray-300 hover:bg-gary-50 focus:outline-offset-0' onClick={onclick} type='button'>
        <Icon/>
    </button>
  )
}

export default Authsocialbutton