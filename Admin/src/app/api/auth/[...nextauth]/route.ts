import { googleLogin, AuthResponse, credentialsLogin } from '@/utils/authUtils'
import { SERVER_BASE_URL } from '@/utils/constants'
import nextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { refreshTokenResponse } from '@/utils/sessionHooks'
import axios from 'axios'

const handler = nextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        if (!credentials) return null
        const res = await credentialsLogin(
          credentials.username,
          credentials.password
        )
        const user = res?.user

        if (!user) {
          // If you return null then an error will be displayed advising the user to check their details.
          return {
            id: 'none',
            first_name: 'none',
            last_name: 'none',
            uuid: 'none',
            roles: 'none',
            login_type: 'none',
          }
          // return null
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
        user.refresh_token = res?.tokens?.refreshToken
        return user
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn(user) {
      if (user.user.login_type == 'none') return '/notRegistered'
      if (user.user.roles != 'admin') return '/notAllowed'
      return true
    },
    async jwt({ token, account, user }) {
      if (!token || !account || !user) return token

      if (user.login_type === 'credentials') {
        const refresh = user.refresh_token
        const tokens: refreshTokenResponse = (
          await axios.post(`${SERVER_BASE_URL}/auth/refresh`, {
            refreshToken: refresh,
          })
        ).data
        token.authToken = tokens.tokens.authToken
        token.refreshToken = tokens.tokens.refreshToken
        token.user = user
      } else {
        const res: AuthResponse | null = await googleLogin(
          `${SERVER_BASE_URL}/auth/login/google`,
          account.id_token as string
        )
        if (res) {
          token.authToken = res.tokens?.authToken
          token.refreshToken = res.tokens?.refreshToken
          token.user = res.user
        }
      }
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
