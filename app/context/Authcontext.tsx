'use client';
import { Session } from 'inspector';
import { SessionProvider } from 'next-auth/react';
import React from 'react'

 export interface authcontextprops{
    children:React.ReactNode
 }
const Authcontext = ({children}:authcontextprops) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default Authcontext