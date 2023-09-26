import Token from '../models/token.model'
import * as UserService from '../services/users.service'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// TYPES
/**
 * @brief
 * Tipo de dato para el payload de los tokens que contiene la información del usuario
 */
export type Payload = {
  first_name: string
  last_name: string
  uuid: string
  email: string
  picture?: string
  roles: string
  googleId?: string
  login_type?: string
  created_at?: number
}

/**
 * @brief
 * Tipo de dato para el par de tokens
 */
export type TokenPair = {
  authToken: string
  refreshToken: string
}

export type AuthResponse = {
  tokens?: TokenPair | null
  user?: Payload | null
  error?: string | null
}

/**
 * @brief
 * Tipo de dato para el tipo de token
 */
export type TokenType = 'auth' | 'refresh'

// DB METHODS
/**
 * @brief
 * Función para obtener un refresh token de la base de datos por id
 * @param token Token a verificar
 * @returns Token | null con la información del token
 */
const getTokenById = async (tokenId: string): Promise<Token | null> => {
  return await Token.findByPk(tokenId)
}

/**
 * @brief
 * Función para guardar un token en la base de datos (blacklist)
 * @param token Token a guardar
 * @returns void
 */
const blackListToken = async (tokenId: string): Promise<void> => {
  if (!tokenId) throw new Error('No token provided')
  await Token.create({ tokenId: tokenId })
}

// EXPORT METHODS
/**
 * @brief
 * Función iniciar sesión con Google
 * @param googleToken token de Google con la información del usuario
 * @returns {authToken, refreshToken, user} objeto con los tokens generados
 */
export const googleLogin = async (
  googleToken: string
): Promise<AuthResponse | null> => {
  // Verificar el token de Google
  try {
    const data = await verifyGoogleToken(googleToken)
    if (!data) return null

    let user = await UserService.getUserByEmailWithRole(data.email)

    // Registrar cliente
    if (!user) {
      user = await UserService.createUser({
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        googleId: data.googleId,
        roleId: 'NEW_USER_ROLE_ID',
        phoneNumber: null,
        age: 0,
        state: '',
        gender: 'no_answer',
        profilePicture: data.picture,
        companyId: null,
      })
      if (user) user = await UserService.getUserByEmailWithRole(data.email)
    }

    // Si ya está registrado, crear un Payload con la información del usuario
    const userPayload: Payload = {
      first_name: '',
      last_name: '',
      uuid: '',
      email: '',
      login_type: 'google',
      picture: data.picture,
      roles: '',
    }
    if (user) {
      userPayload.first_name = user.firstName
      userPayload.last_name = user.lastName
      userPayload.uuid = user.userId
      userPayload.email = user.email
      userPayload.roles = user.role.dataValues.NAME
    }

    const tokens = await createTokens(userPayload)
    if (!tokens) return null

    return {
      tokens: tokens,
      user: userPayload,
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

/**
 * @brief
 * Función para crear un nuevo par de tokens
 * @param payload información del usuario para guardar en el token
 * @returns {authToken, refreshToken} objeto con los tokens generados
 */
export const createTokens = async (
  payload: Payload
): Promise<TokenPair | null> => {
  const authToken: string = generateAuthToken(payload)
  const refreshToken: string = generateRefreshToken(payload)

  if (!authToken || !refreshToken) return null

  return {
    authToken: authToken,
    refreshToken: refreshToken,
  }
}

/**
 * @brief
 * Función para actualizar un nuevo par de tokens
 * @param refreshToken token de refresco con la información del usuario
 * @returns {AuthResponse} objeto con los tokens generados y los datos del usuario
 */
export const updateTokens = async (
  token: string
): Promise<AuthResponse | null> => {
  const userData = verifyToken(token, 'refresh')
  if (!userData) return null
  const res = await getTokenById(token)
  if (res) return null

  const payload: Payload = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    uuid: userData.uuid,
    email: userData.email,
    roles: userData.roles,
    login_type: userData.login_type,
  }

  const tokens = await createTokens(payload)

  await blackListToken(token)

  if (!tokens) return null
  return {
    tokens: tokens,
    user: payload,
  }
}

// UTIL METHODS
/**
 * @brief
 * Función para generar un auth token de tipo JWT
 * @param payload Información que se desea guardar en el token de tipo Payload
 * @returns string con el token generado
 */
const generateAuthToken = (payload: Payload): string => {
  if (!process.env.JWT_AUTH) {
    throw new Error('JWT_AUTH not set')
  }
  return jwt.sign(payload, process.env.JWT_AUTH, { expiresIn: '24h' })
}

/**
 * @brief
 * Función para generar un refresh token de tipo JWT
 * @param payload Información que se desea guardar en el token de tipo Payload
 * @returns string con el token generado
 */
const generateRefreshToken = (payload: Payload): string => {
  if (!process.env.JWT_REFRESH) {
    throw new Error('JWT_REFRESH not set')
  }
  payload.created_at = new Date().getTime()
  return jwt.sign(payload, process.env.JWT_REFRESH, { expiresIn: '48h' })
}

/**
 * @brief
 * Función para verificar el token de tipo JWT
 * @param token Token a verificar
 * @param type Tipo de token a verificar
 * @returns Payload con la información del token
 */
export const verifyToken = (token: string, type: TokenType): Payload | null => {
  if (type == null) type = 'auth'
  if (type == 'auth' && !process.env.JWT_AUTH)
    throw new Error('JWT_AUTH not set')
  if (type == 'refresh' && !process.env.JWT_REFRESH)
    throw new Error('JWT_REFRESH not set')

  const secret: string =
    type == 'auth' ? process.env.JWT_AUTH! : process.env.JWT_REFRESH!
  return jwt.verify(token, secret) as Payload
}

/**
 * @brief
 * Función para verificar el token de Google
 * @param token Token a verificar
 * @returns Payload con la información del token
 */
export const verifyGoogleToken = async (
  token: string
): Promise<Payload | null> => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()

    if (!payload) throw new Error('Invalid Google token')

    return {
      first_name: payload.given_name!,
      last_name: payload.family_name!,
      uuid: payload.sub!,
      email: payload.email!,
      picture: payload.picture!,
      roles: 'CUSTOMER_ROLE_ID',
      login_type: 'google',
      googleId: payload.sub!,
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
