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
  AuthService.AuthResponse,
  { googleToken: string },
  NoRecord> = async (req, res) => {
    console.log('GOOGLE LOGIN')
    let authResponse: AuthService.AuthResponse = {tokens: null, user: null, error: null}
    // Verificar que el token se haya mandado
    if(!req.body.googleToken) {
      authResponse.error = 'No google token provided'
      return res.json(authResponse)
    }
    const { googleToken } = req.body

    const data = await AuthService.googleLogin(googleToken)

    if(!data?.user || !data.tokens) {
      authResponse.error = 'Invalid user'
      return res.json(authResponse)
    }

    authResponse = data
    // Devolver los tokens
    res.status(200).json(authResponse)
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

/**
 * @brief
 * Función del controlador que genera un token de autenticación y un token de refresco
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los proveedores y la información de paginación
 */
export const test: RequestHandler<
  NoRecord,
  { message: string, url: string },
  NoRecord,
  NoRecord> = async (req, res) => {
    console.log('TEST ENDPOINT')
    res.json({message: 'Google login works!', url: req.url})
  }
