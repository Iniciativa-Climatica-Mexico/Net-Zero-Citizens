'use client'
import React from 'react'

import {signIn, signOut, useSession} from 'next-auth/react'
import GoogleButton from '../components/GoogleButton'

const SignInButton = () => {
  const {data: session} = useSession()

  if(session && session.user){
    return(
      <button  onClick = {() => signOut()} className='text-red-600'>
        Salir
      </button> 
    )
  }

  return  (
    <button onClick={() => signIn()} className='w-full'>
      <GoogleButton/>
    </button>
  )
  
} 

export default SignInButton