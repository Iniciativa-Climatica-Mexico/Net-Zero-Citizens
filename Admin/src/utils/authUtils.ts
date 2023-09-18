/** 
  * @module authUtils
  * @desc This module contains functions that are used to authenticate users.
*/
import { serialize } from 'cookie'
import { NextApiResponse } from 'next'

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
const googleLogin = async(url: RequestInfo, googleToken: string) => {
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

    const data = await res.json()
    if(data) {
      // Save tokens in cookies
    }
  } catch(err) {
    console.log(err)
  }
}
export { googleLogin }