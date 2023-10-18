import { Session, signOut } from 'next-auth/react'
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY, SERVER_BASE_URL, USER_KEY } from './constants'
import axios from 'axios'
import { User } from './authUtils'

export const saveSession = (session: Session) => {
  if(!session.authToken || !session.refreshToken) {
    console.log('No tokens to save')
    return
  }

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

export type refreshTokenResponse = {
  tokens: {
    authToken: string
    refreshToken: string
  }, 
  user: User,
  error?: string
}

export const refreshTokens = async () => {
  try {
    const session = recoverSession()
    const refreshToken = session.refreshToken
    const res: refreshTokenResponse = await axios
      .post(`${SERVER_BASE_URL}/auth/refresh`, {
        refreshToken,
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err)
      })

    if (res.error) {
      throw Error(`Error updating tokens, ${res.error}`)
    }

    const _session:Session = session

    _session.user = res.user
    _session.authToken = res.tokens.authToken
    _session.refreshToken = res.tokens.refreshToken

    saveSession(_session)
    session.authToken = res.tokens.authToken
    session.refreshToken = res.tokens.refreshToken
  } catch (e) {
    console.log('Error updating tokens: ' + e)
    signOut()
    deleteSession()
  }
}
