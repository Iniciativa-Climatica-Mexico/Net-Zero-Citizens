/** 
  * @module authUtils
  * @desc This module contains functions that are used to authenticate users.
*/

import { Session } from 'inspector'
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from './constants'

export type AuthResponse = {
  tokens?: {
    authToken: string,
    refreshToken: string
  },
  user?: {
    first_name: string,
    last_name: string,
    uuid: string,
    email: string,
    picture?: string,
    roles: string,
    googleId?: string,
    login_type?: string,
    created_at?: number,
  },
  error?: string
}

/**
 * @function googleLogin
 * @desc This function is used to authenticate users using Google OAuth.
 * @param {RequestInfo} url - The url to send the request to.
 * @param {string} uuid - The uuid of the user.
 * @returns {void}
 * @example
 * googleLogin('http://localhost:3000/api/auth/google', '1234')
 * // => {message: 'success'}
 */
const googleLogin = async(url: RequestInfo, googleToken: string): Promise<AuthResponse | null> => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        googleToken: googleToken
      })
    })

    if(res.status !== 200) return null

    const data = await res.json()
    return data
    
  } catch(err) {
    console.log(err)
    return null
  }
}

const saveTokensFromSession = (session: Session) => {
  saveTokens({
    authToken: session.authToken,
    refreshToken: session.refreshToken
  })
}

const saveTokens = (tokens: {authToken: string, refreshToken: string}) => {
  localStorage.setItem(AUTH_TOKEN_KEY, tokens.authToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
}

const recoverTokens = () => {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)

  return {authToken, refreshToken}
}

const deleteTokens = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export { googleLogin, saveTokens, recoverTokens, saveTokensFromSession, deleteTokens}