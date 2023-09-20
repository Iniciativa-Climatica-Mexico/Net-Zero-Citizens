import { googleLogin, AuthResponse } from '@/utils/authUtils'
import { SERVER_BASE_URL } from '@/utils/constants'
import nextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = nextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (!token || !account) return token
      const res: AuthResponse | null = await googleLogin(
        `${SERVER_BASE_URL}/auth/login/google`,
        account.id_token as string
      )
      if (res) {
        console.log(res.tokens)
        token.authToken = res.tokens?.authToken
        token.refreshToken = res.tokens?.refreshToken
        token.user = res.user
      }
      // console.log(token)
      return token
    },
    async session({ session, token }) {
      if (!token) return session

      if (token.authToken) session.authToken = token.authToken
      if (token.refreshToken) session.refreshToken = token.refreshToken
      if (token.user) session.user = token.user

      return session
    },
  },
})

export { handler as GET, handler as POST }
