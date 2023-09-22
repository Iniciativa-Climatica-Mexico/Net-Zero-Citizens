import * as EcoinfoService from '../services/ecoinfo.service'
import { RequestHandler } from 'express'
import { NoRecord } from '../utils/RequestResponse'
import Ecoinfo from '../models/ecoinfo.model'

/**
 * @brief
 * Función del controlador que devuelve todos los ecoinfo
 * de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los ecoinfo y la
 *            información de paginación
 */
export const getAllEcoinfos: RequestHandler<
  NoRecord,
  Ecoinfo[] | { error: string },
  NoRecord,
  NoRecord
> = async (_req, res) => {
  try {
    const ecoinfos: Ecoinfo[] = await EcoinfoService.getAllEcoinfo()
    res.json(ecoinfos)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Error al obtener la información de ecoinfo' })
  }
}
