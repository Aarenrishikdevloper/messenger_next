'use client'
import { FullMessagetype } from '@/types'
import React, { useEffect, useRef, useState } from 'react'
import Messagebox from './Messagebox'
import useConversation from '@/app/hook/useConversation'
import axios from 'axios'
import { pusherclient } from '@/lib/pusher'
import { find } from 'lodash'
interface bodyprops{
  intialmessage: FullMessagetype[]
}
const Body:React.FC<bodyprops> = ({intialmessage=[]}) => {    
  const {conversationId} = useConversation()  
  const[messages, setmessage] = useState(intialmessage)
  
  const bottomref = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    axios.post(`/api/conversation/${conversationId}/seen`);
  },[conversationId]) 
  useEffect(()=>{ 
    pusherclient.subscribe(conversationId); 
    bottomref?.current?.scrollIntoView(); 
   const messagehandler = (messages:FullMessagetype)=>{
    axios.post(`/api/conversation/${conversationId}/seen`);
    setmessage((current)=>{ 
      if(find(current, {id:messages.id})){ 
        return current;

      } 
      return[...current, messages]
    }); 
    bottomref?.current?.scrollIntoView();
   } 
   const updatehandler =(newmessages:FullMessagetype)=>{
    setmessage((current)=>current.map((currentmesssage)=>{
      if(currentmesssage.id === newmessages.id){
        return newmessages
      } 
      return currentmesssage;
    }))
   };  
   
   
         
   pusherclient.bind('message:new',messagehandler);  
   pusherclient.bind('message:update',updatehandler);  
   
   return()=>{
    pusherclient.unsubscribe(conversationId); 
    pusherclient.unbind('message:new',messagehandler);   
    pusherclient.unbind('message:update',updatehandler);  
   
    
    
    
   };
  },[conversationId]);
  
  return ( 
    <div className=' flex-1 overflow-y-auto'>
      {messages.map((message, i)=>(
        <Messagebox islast={i=== messages.length -1}  key={message.id} data={message}/>
         
      ))} 
      <div className=" pt-24" ref={bottomref}/>
    </div>
  )
}

export default Body 