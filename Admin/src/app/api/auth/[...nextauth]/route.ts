import { googleLogin, AuthResponse } from '@/utils/authUtils'
import { SERVER_BASE_URL } from '@/utils/constants'
import nextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = nextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID??'',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET??'',
    })

  ],

  callbacks: {
    async jwt({ token, account }) {
      if(!token || !account) return token
      const res: AuthResponse | null = await googleLogin(`${SERVER_BASE_URL}/auth/login/google`, account.id_token as string)
      console.log(res)
      return token
    },
  }
})

export {handler as GET, handler as POST}