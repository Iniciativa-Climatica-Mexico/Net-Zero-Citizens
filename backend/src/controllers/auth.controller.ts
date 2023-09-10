import * as AuthService from '../services/auth.service'
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
  { authToken: string, refreshToken: string, error?: string },
  { googleToken: string },
  NoRecord> = async (req, res) => {
    const { googleToken } = req.body

    if(!googleToken) return res.json({ authToken: '', refreshToken: '', error: 'No google token provided' })

    // Verificar el token de google
    // TODO probar esta función
    // const data = await verifyGoogleToken(googleToken)

    // TODO Revisar si el usaurio ya existe en la base de datos

    // TODO Registrar cliente

    // TODO Registrar empresa

    // TODO Obtener la información del usaurio de la base de datos y eliminar este ejemplo
    const dummyUser: AuthService.Payload = {
      first_name: 'Dummy',
      last_name: 'User',
      uuid: googleToken,
      email: 'dummy@user.com',
      login_type: 'google',
      roles: ['admin', 'user']
    }

    // Generar nuevo token de autenticación y nuevo token de refresco
    const tokens = await AuthService.createTokens(dummyUser)
    if(!tokens) return res.json({authToken: '', refreshToken: '', error: 'Invalid user'})

    // Devolver los tokens
    res.status(200).json(tokens)
  }

/**
 * @brief
 * Función del controlador que genera un token de autenticación y un token de refresco
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los proveedores y la información de paginación
 */
export const updateTokens: RequestHandler<
  NoRecord,
  { authToken: string, refreshToken: string, error?: string },
  { refreshToken?: string },
  NoRecord> = async (req, res) => {
    // Verificar que el refreshToken se haya mandado
    if(!req.body.refreshToken) return res.json({ authToken: '', refreshToken: '', error: 'No refresh token provided' })    
    const token: string = req.body.refreshToken
   
    try {
      // Actualizar tokens
      const tokens = await AuthService.updateTokens(token)
      if(!tokens) return res.json({authToken: '', refreshToken: '', error: 'Invalid token'})
      
      // Devolver los tokens
      res.status(200).json(tokens) 
    } catch(error) {
      res.json({ authToken: '', refreshToken: '', error: 'Invalid token' })
    }
  }
