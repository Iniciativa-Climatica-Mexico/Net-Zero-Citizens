import { Session, signOut } from 'next-auth/react'
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY, SERVER_BASE_URL, USER_KEY } from './constants'
import axios from 'axios'

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

type refreshTokenResponse = {
  authToken: string
  refreshToken: string
  error?: string
}

export const refreshTokens = async () => {
  try {
    const session = recoverSession()

    console.log('UPDATING TOKENS')
    const refreshToken = session.refreshToken

    const tokens: refreshTokenResponse = await axios
      .post(`${SERVER_BASE_URL}/auth/refresh`, {
        refreshToken,
      })
      .then((res) => res.data)

    if (tokens.error) {
      throw Error(`Error updating tokens, ${tokens.error}`)
    }

    saveSession(tokens)
    session.authToken = tokens.authToken
    session.refreshToken = tokens.refreshToken
  } catch (e) {
    console.log('Erro updating tokens: ' + e)
    signOut()
    deleteSession()
  }
}
