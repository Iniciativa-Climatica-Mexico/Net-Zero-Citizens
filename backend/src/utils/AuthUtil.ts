import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

/**
 * @brief
 * Tipo de dato para el payload de los tokens que contiene la información del usuario
 */
export type Payload = {
  first_name: string,
  last_name: string,
  uuid: string,
  email: string,
  roles: string[],
  login_type?: string,
  created_at?: number,
}

/**
 * @brief
 * Tipo de dato para el par de tokens
 */
export type TokenPair = {
  authToken: string, 
  refreshToken: string
}

/**
 * @brief
 * Tipo de dato para el tipo de token
 */
export type TokenType = 'auth' | 'refresh'

/**
 * @brief
 * Función para generar un auth token de tipo JWT
 * @param payload Información que se desea guardar en el token de tipo Payload
 * @returns string con el token generado
 */
export const generateAuthToken = (payload: Payload): string => {
  if (!process.env.JWT_AUTH) {
    throw new Error('JWT_AUTH not set')
  }
  return jwt.sign(payload, process.env.JWT_AUTH, { expiresIn: '300s' })

}

/**
 * @brief
 * Función para generar un refresh token de tipo JWT
 * @param payload Información que se desea guardar en el token de tipo Payload
 * @returns string con el token generado
 */
export const generateRefreshToken = (payload: Payload): string => {
  if (!process.env.JWT_REFRESH) {
    throw new Error('JWT_REFRESH not set')
  }
  payload.created_at = new Date().getTime()
  return jwt.sign(payload, process.env.JWT_REFRESH, { expiresIn: '24h' })
}

/**
 * @brief
 * Función para verificar el token de tipo JWT
 * @param token Token a verificar
 * @param type Tipo de token a verificar
 * @returns Payload con la información del token
*/
export const verifyToken = (token: string, type: TokenType): Payload => {
  if(!token) throw new Error('No token provided')

  if(type == null) type = 'auth'
  if(type == 'auth' && !process.env.JWT_AUTH) throw new Error('JWT_AUTH not set')
  if(type == 'refresh' && !process.env.JWT_REFRESH) throw new Error('JWT_REFRESH not set')
    
  const secret: string = type == 'auth' ? process.env.JWT_AUTH! : process.env.JWT_REFRESH!
  return jwt.verify(token, secret) as Payload
}

/**
 * @brief
 * Función para verificar el token de Google
 * @param token Token a verificar
 * @returns Payload con la información del token
*/
export const verifyGoogleToken = async(token: string): Promise<Payload> => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  })

  const payload = ticket.getPayload()

  if(!payload) throw new Error('Invalid Google token')

  return {
    first_name: payload.given_name!,
    last_name: payload.family_name!,
    uuid: payload.sub!,
    email: payload.email!,
    roles: [],
    login_type: 'google'
  }
}