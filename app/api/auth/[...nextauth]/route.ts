import bycrypt from 'bcrypt'; 

import prisma from "@/lib/primsdb"; 
import { AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GithubProvider from 'next-auth/providers/github' 
import GoogleProvider from "next-auth/providers/google" 
import CredentialProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth/next';
export const authOptions :AuthOptions={
    adapter:PrismaAdapter(prisma),
    providers:[
        GithubProvider({
            clientId:process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_SECRET as string, 
            checks: ['none']
        }),  
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret:process.env.GOOGle_Client_SECRET as string, 
            httpOptions: {
                timeout: 40000,
              },
        }), 
        CredentialProvider({
            name:'credentials', 
            credentials:{
                email:{label:'email', type:'email'}, 
                password:{label:'password', type:'password'}, 
               
            }, 
            async authorize(credentials){
                if(!credentials?.email|| !credentials?.password){
                    throw new Error("Invalid credential")
                } 
                const user = await prisma.user.findUnique({where:{email:credentials.email}}) 
                if(!user  || !user?.hassedpassword){
                    throw new Error('Invalid Credential')
                } 
                const iscorrect = await bycrypt.compare(credentials.password, user.hassedpassword) 
                if(!iscorrect){
                    throw new Error("Invalid password"); 

                }
                return user;
            }
        })
        
    ], 
    debug:process.env.NODE_ENV ==='development',  
    session:{strategy:'jwt'}, 
    secret:process.env.NEXTAUTH_SECRET,  

} 
const handler = NextAuth(authOptions) 
export {handler as GET, handler as POST }