import { NextResponse } from "next/server";
import prisma from "@/lib/primsdb"; 
import getcurrentuser from "@/app/action/getcurrentuser";
import { pusherServer } from "@/lib/pusher";


export async function POST(req: Request,) {
  try {
    const body = await req.json()   
   
    const{messageid}= body;
    if(!messageid){
        return new NextResponse("Internal Server Error", { status: 400 });
    }
    
    // Use Prid sma to find the message by its ID
    const message = await prisma.message.findUnique({ where: { id: messageid } });

    if(!message){
        return new NextResponse("Internal Server Error", { status: 400 });
    }

    // Use Prisma to delete the message
    await prisma.message.delete({ where: { id: message.id } }); 
   

    return new NextResponse("Deleted Successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting message:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}