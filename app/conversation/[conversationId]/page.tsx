
import React from 'react'
import Header from './components/Header'
import getconversationbyid from '@/app/action/getconversationbyid'
import Emptystate from '@/app/components/Emptystate'
import Form from './components/Form'
import Body from './components/Body'
import getmesssages from '@/app/action/getmessage'

interface Iprams{
    conversationId:string
}
const page = async({params}:{params:Iprams}) => { 
    const conversation = await getconversationbyid(params.conversationId)  
    const message = await getmesssages(params.conversationId) 
  
    if(!conversation){
        return(
            <div className="lg:pl-80 h-full">
            <div className=" h-full flex flex-col">
                <Emptystate/>
            </div>
        </div>
        )
    }
  return (
    <div className=' lg:pl-80 h-full'>
      <div className=" h-full flex flex-col">
        <Header conversation={conversation!}/>
        <Body intialmessage={message}/>
        <Form/>
      </div>
    </div>
  )
}

export default page