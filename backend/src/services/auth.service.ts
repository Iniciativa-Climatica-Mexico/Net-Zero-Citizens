import { TokensModel, Token } from '../models/token.model'


/**
 * @brief
 * Función para obtener un refresh token de la base de datos por id
 * @param token Token a verificar
 * @returns Token | null con la información del token
*/
export const getTokenById = async (tokenId: string): Promise<Token | null> => {
  return await TokensModel.findByPk(tokenId) 
}

/**
 * @brief
 * Función para guardar un token en la base de datos (blacklist)
 * @param token Token a guardar
 * @returns void
*/
export const blackListToken = async (tokenId: string): Promise<void> => {
  if(!tokenId) throw new Error('No token provided')
  await TokensModel.create({ tokenId: tokenId })
}