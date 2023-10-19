import { useEffect, useState } from "react";
import useActivelist from "./useactiveList"
import {Channel,Members} from 'pusher-js'
import { pusherclient } from "@/lib/pusher";
const useActivechannel = ()=>{
    const{set, add, remove} = useActivelist();  
    const[activeChannel, setActiveChannel]= useState<Channel | null>(null); 
    
    useEffect(()=>{
        let channel = activeChannel; 
        if(!channel){
            channel = pusherclient.subscribe('presence-messenger'); 
            setActiveChannel(channel)
        } 
        channel.bind('pusher:subscription_succeeded',(members:Members)=>{
            const intialmember:string[]=[]; 
            members.each((members:Record<string,any>)=>intialmember.push(members.id)); 
            set(intialmember);

            
        }); 
        channel.bind("pusher:member_added",(member:Record<string,any>)=>{
            add(member.id)
        }) 
        channel.bind("pusher:member_removed",(member:Record<string,any>)=>{
            remove(member.id)
        }) 
        return()=>{
            if(activeChannel){
                pusherclient.unsubscribe('presence-messenger'); 
                setActiveChannel(null);
            }
        }
  },[activeChannel, set, add, remove]); 


} 
export default useActivechannel;