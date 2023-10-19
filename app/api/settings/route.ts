import getcurrentuser from "@/app/action/getcurrentuser";
import { NextServer } from "next/dist/server/next";
import { NextResponse } from "next/server";
import prisma from "@/lib/primsdb"
export async function POST(request:Request) {
    try{
        const currentuser = await getcurrentuser(); 
        const body = await request.json() 
        const{image, name} = body; 
        if(!currentuser?.id){
           return new NextResponse("Unauthorize",{status:401})
        } 
        const updateuser = await prisma.user.update({
            where:{
                id:currentuser?.id
            }, 
            data:{
                image:image, 
                name:name
            }
        }) 
        return NextResponse.json(updateuser);
    }catch(error){
        console.log(error); 
        return  new NextResponse("Something went wrong", {status:400})
    }
    
}