
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react' 
import { useRouter } from 'next/navigation';
interface desktopprops{
    label:string, 
    href:string,  
    icon:any, 
    onClick?:()=>void;
    active?:boolean,


}
const Desktopitem:React.FC<desktopprops> = ({label, href, icon:Icon, active, onClick}) => {  
  const router = useRouter()
    const handleclick = ()=>{
        if(onClick){
          return onClick(); 
          
        } 
        
    }
  return (
    <li onClick={handleclick}key={label}> 
      <Link href={href} className={clsx('group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold hover:text-black text-gray-500 hover:bg-gray-100', active && 'bg-gray-100 text-black' )}>
        <Icon className="h-6 w-6 shrink-0"/>
        <span className=' sr-only'>{label}</span> 
         
      </Link>
       
    </li>
  )
}

export default Desktopitem