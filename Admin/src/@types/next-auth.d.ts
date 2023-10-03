import { User as UserC } from '@/utils/authUtils'
import { DefaultSession as DefaultSessionR } from 'next-auth/react'
import { DefaultSession as DefaultSessionN } from 'next-auth'

declare module 'next-auth/react' {
  interface User extends UserC {}
  interface Session extends DefaultSessionR {
    user?: User;
    authToken?: string;
    refreshToken?: string;
  }
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User extends UserC {}
  interface Session extends DefaultSessionN{
    user?: User
    authToken?: string
    refreshToken?: string
  } 


}

declare module 'next-auth/jwt' {
    /**
     * Returned by the `jwt` callback and `getToken`, when using JWT sessions
     */
    interface JWT {
        user?: User
        authToken?: string
        refreshToken?: string
    }
}
