// import * as CompanyService from '../services/company.service'
import { blackListToken } from '../services/auth.service'
import { generateAuthToken, generateRefreshToken, verifyToken, Payload, verifyGoogleToken } from '../utils/AuthUtil'
import { NoRecord } from '../utils/RequestResponse'
import { RequestHandler } from 'express'

/**
 * @brief
 * Función del controlador que genera un token de autenticación y un token de refresco
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los proveedores y la información de paginación
 */

export const googleLogin: RequestHandler<
  NoRecord,
  { token: string, refreshToken: string, error?: string },
  { googleToken: string },
  NoRecord> = async (req, res) => {
    const { googleToken } = req.body

    if(!googleToken) return res.json({ token: '', refreshToken: '', error: 'No google token provided' })

    // Verificar el token de google
    // TODO probar esta función
    const data = await verifyGoogleToken(googleToken)

    // TODO Revisar si el usaurio ya existe en la base de datos

    // TODO Registrar cliente

    // TODO Registrar empresa

    // TODO Obtener la información del usaurio de la base de datos y eliminar este ejemplo
    const dummyUser: Payload = {
      first_name: 'Dummy',
      last_name: 'User',
      uuid: googleToken,
      email: 'dummy@user.com',
      login_type: 'google',
      roles: ['user']
    }

    // Generar nuevo token de autenticación y nuevo token de refresco
    const authToken: string = generateAuthToken(dummyUser)
    const refreshToken: string = generateRefreshToken(dummyUser)

    // Devolver los tokens
    res.status(200).json({ token: authToken, refreshToken: refreshToken })
  }

/**
 * @brief
 * Función del controlador que genera un token de autenticación y un token de refresco
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los proveedores y la información de paginación
 */
export const updateTokens: RequestHandler<
  NoRecord,
  { token: string, refreshToken: string, error?: string },
  { refreshToken: string },
  NoRecord> = async (req, res) => {
    const token: string = req.body.refreshToken
    if(!token) return res.json({ token: '', refreshToken: '', error: 'No refresh token provided' })    
   
    try {
      // Verificar el token de refresco
      const userData: Payload = verifyToken(token, 'refresh')

      // Obtener los datos del usuario del token
      const payload: Payload = {
        first_name: userData.first_name,
        last_name: userData.last_name,
        uuid: userData.uuid,
        email: userData.email,
        roles: userData.roles,
        login_type: userData.login_type
      }

      // Generar nuevo token de autenticación y nuevo token de refresco
      const authToken: string = generateAuthToken(payload)
      const refreshToken: string = generateRefreshToken(payload)

      // Guardar el token anterior de refresco en la blacklist
      await blackListToken(token)

      // Devolver los tokens
      res.json({ token: authToken, refreshToken: refreshToken })
    } catch(error) {
      res.json({ token: '', refreshToken: '', error: 'Invalid refresh token' })
    }
  }
