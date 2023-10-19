import PusherServer from 'pusher'; 
import PusherClient from 'pusher-js'  

export const pusherServer = new PusherServer({
    appId: "1690703",
    key:"ddbab919f14002710c8d",
    secret:"aca0664e6037685160c6",
    cluster:"ap2"
}) 
export const pusherclient = new PusherClient(
    "ddbab919f14002710c8d",{
        channelAuthorization:{
            endpoint:'/api/pusher/auth', 
            transport:'ajax',
        },
        cluster:"ap2",
    }
)