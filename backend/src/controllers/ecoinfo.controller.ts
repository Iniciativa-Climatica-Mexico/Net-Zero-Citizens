import Ecoinfo from '../models/ecoinfo.model'
import * as EcoinfoService from '../services/ecoinfo.service'
import { NoRecord, Paginator, PaginationParams } from '../utils/RequestResponse'
import { RequestHandler } from 'express'

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
  Paginator<Ecoinfo>,
  NoRecord,
  PaginationParams<{ name?: string }>
> = async (req, res) => {
  const params = {
    start: req.query.start || 0,
    pageSize: req.query.pageSize || 10,
    filters: {
      name: req.query.name || '',
    },
  }

  const ecoinfos = await EcoinfoService.getAllEcoinfo(params)
  res.json({
    rows: ecoinfos.rows,
    start: params.start,
    pageSize: params.pageSize,
    total: ecoinfos.count,
  })
}
