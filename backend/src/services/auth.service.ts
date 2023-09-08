import Token from '../models/token.model'
import { Payload, TokenPair, generateAuthToken, generateRefreshToken } from '../utils/AuthUtil'


/**
 * @brief
 * Función para obtener un refresh token de la base de datos por id
 * @param token Token a verificar
 * @returns Token | null con la información del token
*/
export const getTokenById = async (tokenId: string): Promise<Token | null> => {
  return await Token.findByPk(tokenId) 
}

/**
 * @brief
 * Función para guardar un token en la base de datos (blacklist)
 * @param token Token a guardar
 * @returns void
*/
export const blackListToken = async (tokenId: string): Promise<void> => {
  if(!tokenId) throw new Error('No token provided')
  await Token.create({ tokenId: tokenId })
}


/**
 * @brief
 * Función para crear un nuevo par de tokens
 * @param payload información del usuario para guardar en el token
 * @returns {authToken, refreshToken} objeto con los tokens generados
*/
export const createTokens = async (payload: Payload, token: string = ''): Promise<TokenPair> => {
  const authToken: string = generateAuthToken(payload)
  const refreshToken: string = generateRefreshToken(payload)

  if(!authToken || !refreshToken) throw new Error('Error generating tokens')

  if(token) await blackListToken(token)

  return {
    authToken: authToken, 
    refreshToken: refreshToken
  }
}