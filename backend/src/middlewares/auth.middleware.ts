import { Request, Response, NextFunction } from 'express'
import * as AuthService from '../services/auth.service'
// import { verifyToken } from '../utils/AuthUtil'
// import { Payload } from '../utils/AuthUtil'

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

    const decoded = await AuthService.verifyToken(token, 'auth')    
    if (!decoded) throw new Error('Invalid token')

    next()
  } catch (err) {
    res.json({ message: 'Invalid token' })
    next(err) // Pass the error to the next middleware
  }
}

/**
 * @brief
 * Función middleware para verificar el tipo de rol de un usuario
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns void
 */

export const validateRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // TODO Revisar rol en la base de datos
    
    // Get the user ID from token
    const auth = req.headers['authorization'] as string
    const token = auth.split(' ')[1]

    const decoded = await AuthService.verifyToken(token, 'auth')
    if(!decoded) throw new Error('Error')

    console.log(decoded.roles)
    console.log(roles)

    let flag = false
    for(let i = 0; i < roles.length; i++) {
      if(decoded.roles.includes(roles[i])) {
        flag = true
        break
      }
    }

    if (!flag) return res.status(401).json({ message: 'Unauthorized' })
  
    next()
  }
}