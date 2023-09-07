// import * as CompanyService from '../services/company.service'
import { generateAuthToken, generateRefreshToken, verifyToken, Payload } from '../utils/AuthUtil'
import { NoRecord } from '../utils/RequestResponse'
import { RequestHandler } from 'express'

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
      const payload: Payload = verifyToken(token, 'refresh')

      // Generar nuevo token de autenticación y nuevo token de refresco
      const authToken: string = generateAuthToken(payload)
      const refreshToken: string = generateRefreshToken(payload)

      // Devolver los tokens
      res.json({ token: authToken, refreshToken: refreshToken })
    } catch(error) {
      res.json({ token: '', refreshToken: '', error: 'Invalid refresh token' })
    }

  }
