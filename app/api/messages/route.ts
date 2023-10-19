import getcurrentuser from "@/app/action/getcurrentuser";
import prisma from "@/lib/primsdb"; 
import { pusherServer } from "@/lib/pusher";
import { update } from "lodash";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    try{ 
        const currentuser = await getcurrentuser()
        const body = await request.json()
       const{image, message, conversationId} = body; 
     
       if(!currentuser?.id || !currentuser?.email){
        return new NextResponse("Unauthorize",{status:401})
        
       } 
      
       const newmessage = await prisma.message.create({ 
        include:{seen:true, sender:true},
        data:{
            body:message, 
            image:image, 
           conversation:{
             connect:{id:conversationId}
           }, 
           sender:{
             connect:{id:currentuser.id}
           },
           seen:{
             connect:{id:currentuser.id}
           }, 
           


        }, 
       
    });
    const updatemessage = await prisma.conversation.update({
        where:{
            id:conversationId, 

        }, 
        data:{
            lastMessageAt: new Date(), 
            message:{
                connect:{id:newmessage.id}
            }
        }, 
        include:{user:true, message:{include:{seen:true}}}
        
        
        
        
    }); 
    await pusherServer.trigger(conversationId, 'message:new', newmessage); 
    const lastmessage = updatemessage.message[updatemessage.message.length -1] 
     updatemessage.user.map((user)=>{
        pusherServer.trigger(user.email!, 'conversation:update',{id:conversationId,message:[lastmessage]})
     })
    return NextResponse.json(newmessage);

    }catch(error){
        console.log(error); 
        return  new NextResponse('Internal error',{status:500})
    }
}