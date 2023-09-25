import { Session } from 'next-auth/react'
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from './constants'
import { useEffect, useState } from 'react'

export const saveSession = (session: Session) => {
  localStorage.setItem(AUTH_TOKEN_KEY, session.authToken || '')
  localStorage.setItem(REFRESH_TOKEN_KEY, session.refreshToken || '')
  if (session.user) {
    localStorage.setItem(USER_KEY, JSON.stringify(session.user))
  }
}

export const recoverSession = (): Session => {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY) || undefined
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) || undefined
  const userLS = localStorage.getItem(USER_KEY)
  const user = userLS ? JSON.parse(userLS) : undefined

  return {
    authToken: authToken,
    refreshToken: refreshToken,
    user: user,
  }
}

export const deleteSession = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export const useRecoverSession = () => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const authToken = localStorage.getItem(AUTH_TOKEN_KEY) || undefined

    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) || undefined

    const userLS = localStorage.getItem(USER_KEY)
    const user = userLS ? JSON.parse(userLS) : undefined

    setSession({
      authToken: authToken,
      refreshToken: refreshToken,
      user: user,
    })
  }, [])
  return session
}