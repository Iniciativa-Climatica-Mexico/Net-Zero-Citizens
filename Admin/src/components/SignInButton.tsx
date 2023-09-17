'use client';
import React from 'react'

import {signIn,signOut,useSession} from "next-auth/react"
import GoogleButton from "../components/GoogleButton";

const SignInButton = () => {
    const {data: session} = useSession();

     if(session && session.user){
        console.log(session);
        return(
            <div className='flex gap-4 ml-auto'>
                <p className="text-sky-600" > {session.user.name} </p>
               <button  onClick = {() => signOut()} className="text-red-600">
               Sign Out
                </button> 
            </div>

        )
     }
  return  (
    <button onClick={() => signIn()} className="text-green-600 ml-auto">
        <GoogleButton/>
    </button>
  )
  
} 

export default SignInButton