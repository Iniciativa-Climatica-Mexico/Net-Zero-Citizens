import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/AuthUtil'
import { Payload } from '../utils/AuthUtil'

/**
 * @brief
 * Función middleware para verificar el token de tipo JWT
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = req.headers['authorization'] as string
    const token = auth.split(' ')[1]
    if (!token) throw new Error('No token provided')

    const decoded: Payload = await verifyToken(token, 'auth')    
    if (!decoded) throw new Error('Invalid token')

    next()
  } catch (err) {
    res.json({ message: err })
    next(err) // Pass the error to the next middleware
  }
}

