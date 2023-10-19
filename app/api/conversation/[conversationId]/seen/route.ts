import getcurrentuser from "@/app/action/getcurrentuser";
import { NextResponse } from "next/server";
import prisma from '@/lib/primsdb'
import { pusherServer } from "@/lib/pusher";

interface Iprarams{
    conversationId:string;
} 

export async function POST(request:Request, {params}:{params:Iprarams}){
    try{
      const currentuser = await getcurrentuser()  
      const{conversationId} = params;
      if(!currentuser?.id || !currentuser?.email){
        return new NextResponse("Unauthorize", {status:401})
      } 
      const conversation = await prisma.conversation.findUnique({
        where:{id:conversationId}, 
        include:{
            message:{
               include:{
                  seen:true
               }
            }, 
            user:true
        }
      }); 
      if(!conversation){
        return new NextResponse("Invalid Id", {status:400})
      } 
      const lastmessage = conversation.message[conversation.message.length - 1]; 
      if(!lastmessage){
        return NextResponse.json(conversation)
      } 
      const updatemessage = await prisma.message.update({
        where:{id:lastmessage.id}, 
        include:{sender:true, seen:true}, 
        data:{seen:{connect:{id:currentuser?.id}}} 

      })
      await pusherServer.trigger(currentuser.email,'conversation:update', {id:conversationId, message:[updatemessage]}); 
      if(lastmessage.seenIds.indexOf(currentuser.id) !== -1){
        return NextResponse.json(conversation);
      } 
      await pusherServer.trigger(conversationId!, 'message:update',updatemessage);
      return NextResponse.json(updatemessage);
    }catch(error){
        console.log(error); 
        return new NextResponse("Error",{status:500})
    }
}