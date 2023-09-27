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
  Paginator<Complaint>| { error: string },
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
  try{
  const complaints = await ComplaintService.getAllComplaints(params)
  res.json({
    rows: complaints.rows,
    start: params.start,
    pageSize: params.pageSize,
    total: complaints.count,
  })
}
catch(error){
  res.status(400).json({error: 'Error getting complaints'})
}
}

export const getComplaintById: RequestHandler<
  NoRecord,
  Complaint | { message: string },
  NoRecord,
  { id: string }
> = async (req, res) => {
  try {
    const complaint = await ComplaintService.getComplaintById(req.params.id)

    if (!complaint) {
      res.status(404).json({ message: 'Complaint not found' })
    } else {
      res.json(complaint)
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}


export const getComplaintByCompany: RequestHandler<
  NoRecord,
  Complaint | { message: string },
  NoRecord,
  PaginationParams<{ companyId: string }>
> = async (req, res) => {
  const params = {
    start: req.query.start || 0,
    pageSize: req.query.pageSize || 10,
  }
  try {
    const complaint = await ComplaintService.getComplaintByCompany(req.params.companyId, params)

    if (!complaint) {
      res.status(404).json({ message: 'Complaint not found' })
    } else {
      res.json()
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getComplaintByUser: RequestHandler<
  NoRecord,
  Complaint | { message: string },
  NoRecord,
  PaginationParams<{ userId: string }>
> = async (req, res) => {
  const params = {
    start: req.query.start || 0,
    pageSize: req.query.pageSize || 10,
  }
  try {
    const complaint = await ComplaintService.getComplaintByUser(req.params.userId, params)

    if (!complaint) {
      res.status(404).json({ message: 'Complaint not found' })
    } else {
      res.json()
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

