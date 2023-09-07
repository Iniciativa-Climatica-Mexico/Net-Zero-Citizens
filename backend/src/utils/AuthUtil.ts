import jwt from 'jsonwebtoken'

export type Payload = {
  first_name: string,
  last_name: string,
  uuid: string,
  roles: string[],
  created_at?: number
}

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
  return jwt.sign(payload, process.env.JWT_AUTH, { expiresIn: '300ms' })
}

/**
 * @brief
 * Función para generar un refresh token de tipo JWT
 * @param payload Información que se desea guardar en el token de tipo Payload
 * @returns string con el token generado
 */
export const generateRefreshToken = (payload: Payload): string => {
  if (!process.env.JWT_REFRESH) {
    throw new Error('JWT_AUTH not set')
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