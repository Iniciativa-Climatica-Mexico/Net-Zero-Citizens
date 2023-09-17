import { apiV1Url } from "@/utils/constants";
import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

const handler = nextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID??"",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET??"",
        })

    ],

    callbacks: {
        async jwt({ token, account, session }) {
          if(!token || !account) return token
          
          fetch(apiV1Url+'/auth/login/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              googleToken: account.id_token
            })
          })
            .then(res => res.json())
            .then(data => {
              console.log(data)
            })
            
          //TODO Save tokens in cookies
    
          return token
        },
    }
})

export {handler as GET, handler as POST};