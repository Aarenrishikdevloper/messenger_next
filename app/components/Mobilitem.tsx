import clsx from 'clsx';
import Link from 'next/link';
import React from 'react'
interface mobileprops{
    label:string, 
    href:string,  
    icon:any, 
    onClick?:()=>void;
    active?:boolean,


}
const Mobileitem:React.FC<mobileprops>= ({label, href, icon:Icon, active, onClick}) => { 
  const handleclick = ()=>{
    if(onClick){
      return onClick()
    }
  }
  return (
    <Link href={href} onClick={handleclick} className={clsx(' flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100 ',active && 'bg-gray-100 text-black')}> 
        <Icon className="h-6 w-6" />
    </Link>
  )
}

export default Mobileitem