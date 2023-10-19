
import React from "react";
import Sidebar from "../components/sidebar/sidebar";
import Conversationlist from "./components/Conversationlist";
import getconversation from "../action/getconversation";
import getusers from "../action/getusers";

export default async function Layout({children}:{children:React.ReactNode,}){ 
    const conversations = await getconversation();  
    const user = await getusers()
    console.log(conversations);
    return(
       
        <Sidebar>
            <div className="h-full"> 
            
              <Conversationlist intialitem={conversations} user={user!}/>
                {children}
            </div>
        </Sidebar>
    ) 
}