import getcurrentuser from "@/app/action/getcurrentuser";
import { NextResponse } from "next/server";
import prisma from "@/lib/primsdb"
import { pusherServer } from "@/lib/pusher";
export async function POST(request:Request,){
try{
    const currentuser = await getcurrentuser(); 
    const body = await request.json(); 
    const{userid, isGroup, members,name} = body;  
    if(!currentuser?.id || !currentuser?.email){
        return new NextResponse('Unauthorize',{status:400})
    } 
    if(isGroup && (!members || members.lenght <2 || !name)){
        return new NextResponse('Unauthorized',{status:401})
    }  
    
    if(isGroup){
        const newconversation = await prisma.conversation.create({
            data: {
              name,
              isGroup,
              user: {
                connect: [
                  ...members.map((member: { value: string }) => ({
                    id: member.value
                  })),
                  { id: currentuser.id }
                ]

              }
            },
            include: {
              user: true
            }
          }); 
          newconversation.user.forEach((user)=>{
            if(user.email){
              pusherServer.trigger(user.email, "conversation:new", newconversation)
            }
          })
          return NextResponse.json(newconversation);
    } 
    const existingconversation = await prisma.conversation.findMany({where:{OR:[{userids:{equals:[currentuser.id,userid]}},{userids:{equals:[userid,currentuser.id]}}]},include:{user:true}});  

    const singleconversation = existingconversation[0]; 
    if(singleconversation){
      return NextResponse.json(singleconversation)
  } 
    const newconversation = await prisma.conversation.create({data:{user:{connect:[{id:currentuser.id},{id:userid}]}},include:{user:true}});  
    newconversation.user.map((user)=>{
      if(user.email){
        pusherServer.trigger(user.email, "conversation:new", newconversation)
      }
    })
   
    
    
    return NextResponse.json(newconversation);

}catch(error){ 
    console.log(error); 
    return new NextResponse('Internal error',{status:500})
}
}