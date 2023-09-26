import Complaint from '../models/complaint.model'
import * as ComplaintService from '../services/complaints.service'
import { NoRecord, Paginator, PaginationParams } from '../utils/RequestResponse'
import { RequestHandler } from 'express'

/**
 * @brief
 * Función del controlador que devuelve todos los reviews
 * de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los reviews y la
 *            información de paginación
 */

export const getAllComplaints: RequestHandler<
  NoRecord,
  Paginator<Complaint>,
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

  const complaints = await ComplaintService.getAllComplaints(params)
  res.json({
    rows: complaints.rows,
    start: params.start,
    pageSize: params.pageSize,
    total: complaints.count,
  })
}

export const 