import * as EcoinfoService from '../services/ecoinfo.service'
import { RequestHandler } from 'express'

/**
 * @brief
 * Función del controlador que devuelve todos los ecoinfo
 * de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los ecoinfo y la
 *            información de paginación
 */
export const getAllEcoinfos: RequestHandler = async (req, res) => {
  const ecoinfos = await EcoinfoService.getAllEcoinfo()

  res.json(ecoinfos)
}
