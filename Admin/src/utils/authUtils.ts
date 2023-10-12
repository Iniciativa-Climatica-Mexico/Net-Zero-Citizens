import { SERVER_BASE_URL } from './constants'

/**
 * @module authUtils
 * @desc This module contains functions that are used to authenticate users.
 */
export type AuthResponse = {
  tokens?: {
    authToken: string
    refreshToken: string
  }
  user?: User
  error?: string
}

export type User = {
  id: string
  first_name: string
  last_name: string
  uuid: string
  email?: string | null
  picture?: string
  roles: string
  googleId?: string
  login_type?: string
  created_at?: number
  refresh_token?: string
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
export const googleLogin = async (
  url: RequestInfo,
  googleToken: string
): Promise<AuthResponse | null> => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        googleToken: googleToken,
      }),
    })
    if (res.status !== 200) return null

    const data = await res.json()
    return data
  } catch (err) {
    return null
  }
}

/**
 * @function credentialsLogin
 * @desc This function is used to authenticate users using Google OAuth.
 * @example
 * // => {message: 'success'}
 */
export const credentialsLogin = async (
  email: string,
  password: string
): Promise<AuthResponse | null> => {
  try {
    const res = await fetch(`${SERVER_BASE_URL}/auth/login/credentials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    if (res.status !== 200) return null

    const data = await res.json()
    return data
  } catch (err) {
    return null
  }
}
