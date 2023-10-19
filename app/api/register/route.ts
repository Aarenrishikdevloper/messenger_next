import { NextApiRequest, NextApiResponse } from "next";
import bycrypt from 'bcrypt' 
import prisma from "@/lib/primsdb" 
import { NextResponse } from "next/server";
export async function POST(request:Request){ 
    const body = await request.json(); 
    const{email, name, password} = body;  
    try{
      
      console.log(password)
      console.log(name)
      const  hassedpassword = await bycrypt.hash(password, 12)
      const user = await prisma.user.create({
                  data:{
                    email, 
                    name, 
                    hassedpassword
                  }
      }) 
      return NextResponse.json(user)
    }catch(error){ 
        console.log(error)
        return new NextResponse('Internal error',{status:400})
    }
}