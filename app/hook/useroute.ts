import { usePathname } from "next/navigation"
import { useMemo } from "react";
import {HiChat} from 'react-icons/hi' 
import {HiArrowLeftOnRectangle, HiUser} from 'react-icons/hi2'
import {signOut} from 'next-auth/react' 

const useRouters = ()=>{ 
    
    
    const pathname = usePathname(); 
    const route = useMemo(()=>[
        {   id:1,
            label:"Chat", 
            href:'/conversation', 
            icon : HiChat, 
            active:pathname === "/conversation"
        },
        {   id:2, 
            label:"Users", 
            href:'/user', 
            icon : HiUser, 
            active:pathname === "/user"
        }, 
        {   id:3, 
            label:"Logout",  
            onClick : ()=> signOut(),
            href:'#', 
            icon : HiArrowLeftOnRectangle, 
           
        }
    ],[pathname]) 
    return route;
}
export default useRouters