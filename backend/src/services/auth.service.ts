import Token from '../models/token.model'
import * as UserService from '../services/users.service'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'
import bcrypt from 'bcrypt'
import User from '../models/users.model'
import { z } from 'zod'
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// TYPES
/**
 * @brief
 * Tipo de dato para el payload de los tokens que contiene la información del usuario
 */
export type Payload = {
  id: string
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

export type ApplePayload = {
  id: string
  first_name: string
  last_name: string
  uuid: string
  email: string
  roles: string
  appleId?: string | null
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
  googleToken: string,
  ios: boolean = false
): Promise<AuthResponse | null> => {
  // Verificar el token de Google
  try {
    const data = await verifyGoogleToken(googleToken, ios)
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
      id: '',
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
 * Función para generar un nuevo par de tokens a partir de nueva información de usuario
 * @param authToken token de autenticación
 * @param userData información del usuario
 * @returns {AuthResponse} objeto con los tokens generados y los datos del usuario
 */
export const updateUserTokensData = async (
  authToken: string
): Promise<AuthResponse | null> => {
  // Verificar el token de Google
  try {
    const data = verifyToken(authToken, 'auth')
    if (!data) return null

    const user = await UserService.getUserByEmailWithRole(data.email)

    if (!user) return null

    // Si ya está registrado, crear un Payload con la información del usuario
    const userPayload: Payload = {
      id: user.userId,
      first_name: user.firstName,
      last_name: user.lastName,
      uuid: user.userId,
      email: user.email,
      picture: user.profilePicture != null ? user.profilePicture : undefined,
      roles: user.role.dataValues.NAME,
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
    id: userData.id,
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
  token: string,
  ios: boolean = false
): Promise<Payload | null> => {
  const clientId = ios
    ? process.env.GOOGLE_CLIENT_ID_IOS
    : process.env.GOOGLE_CLIENT_ID
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    })

    const payload = ticket.getPayload()

    if (!payload) throw new Error('Invalid Google token')

    return {
      id: payload.sub!,
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

export const login = async (
  emailIn: string,
  passwordIn: string
): Promise<AuthResponse | null> => {
  const email = emailIn.trim()
  const password = passwordIn.trim()
  const user = await UserService.getUserByEmailWithRole(email)
  if (!user || !user.salt || !user.password) return null

  const isAllowed = bcrypt.compareSync(password, user.password)
  if (!isAllowed) return null

  // Si ya está registrado, crear un Payload con la información del usuario
  const userPayload: Payload = {
    id: user.userId,
    first_name: user.firstName,
    last_name: user.lastName,
    uuid: user.userId,
    email: user.email,
    picture: user.profilePicture != null ? user.profilePicture : undefined,
    roles: user.role.dataValues.NAME,
    login_type: 'credentials',
  }

  const tokens = await createTokens(userPayload)
  if (!tokens) return null

  return {
    tokens: tokens,
    user: userPayload,
  }
}

export const registerUserSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().trim(),
  firstName: z.string().trim(),
  lastName: z.string().optional(),
  secondLastName: z.string().optional(),
  phoneNumber: z.string().optional(),
  age: z.number().int().optional(),
  state: z.string().optional(),
  gender: z.enum(['masculine', 'femenine', 'other', 'no_answer']).optional(),
  profilePicture: z.string().optional(),
})

export type RegisterUser = z.infer<typeof registerUserSchema>
export const register = async (
  user: RegisterUser
): Promise<AuthResponse | null> => {
  const oldUser = await UserService.getUserByEmailWithRole(user.email)
  if (oldUser) return null

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(user.password, salt)

  const userCreate = {
    firstName: user.firstName,
    lastName: user.lastName,
    secondLastName: user.secondLastName ?? null,
    email: user.email,
    phoneNumber: user.phoneNumber ?? null,
    age: user.age ?? 0,
    state: user.state ?? '',
    gender: user.gender ?? 'no_answer',
    salt,
    password: hash,
    roleId: 'NEW_USER_ROLE_ID',
  }
  const userDb = await User.create(userCreate)
  if (!userDb) return null
  const newUser = await UserService.getUserByEmailWithRole(userDb.email)
  if (!newUser) return null
  // Si ya está registrado, crear un Payload con la información del usuario
  const userPayload: Payload = {
    id: newUser.userId,
    first_name: newUser.firstName,
    last_name: newUser.lastName,
    uuid: newUser.userId,
    email: newUser.email,
    picture:
      newUser.profilePicture != null ? newUser.profilePicture : undefined,
    roles: newUser.role.dataValues.NAME,
    login_type: 'credentials',
  }

  const tokens = await createTokens(userPayload)
  if (!tokens) return null

  return {
    tokens: tokens,
    user: userPayload,
  }
}

export const appleLogin = async (
  payload: ApplePayload
): Promise<AuthResponse | null> => {
  const { appleId, first_name, last_name, email } = payload

  const user = await UserService.getUserByEmailWithRole(email)

  // Registrar cliente
  if (!user) {
    const userCreate = {
      email,
      firstName: first_name,
      lastName: last_name,
      appleId: appleId,
      roleId: 'NEW_USER_ROLE_ID',
    }
    const userDb = await User.create(userCreate)
    if (!userDb) return null
  }

  const userDb = await UserService.getUserByEmailWithRole(email)
  if (!userDb) return null

  // Si ya está registrado, crear un Payload con la información del usuario
  const userPayload: ApplePayload = {
    id: userDb.userId,
    first_name: userDb.firstName,
    last_name: userDb.lastName,
    uuid: userDb.userId,
    email: userDb.email,
    roles: userDb.role.dataValues.NAME,
    login_type: 'apple',
    appleId: userDb.appleId,
  }

  const tokens = await createTokens(userPayload)
  if (!tokens) return null

  return {
    tokens: tokens,
    user: userPayload,
  }
}
