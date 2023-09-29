import Complaint from '../models/complaint.model'
import * as ComplaintService from '../services/complaints.service'
import { NoRecord, Paginator, PaginationParams } from '../utils/RequestResponse'
import { RequestHandler } from 'express'

/**
 * @brief
 * Función del controlador que devuelve todos los complaints
 * de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con las complaints y la
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

/**
 * @brief
 * Función del controlador que devuelve un complaint por id de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con la complaint y la
 *           información de paginación
 */

export const getComplaintById: RequestHandler<
  NoRecord,
  Complaint | { message: string },
  NoRecord,
  { complaintId: string }
> = async (req, res) => {
  try {
    const complaint = await ComplaintService.getComplaintById(req.params.complaintId)

    if (!complaint) {
      res.status(404).json({ message: 'Complaint not found' })
    } else {
      res.json(complaint)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error' })
  }
}

/**
 * @brief
 * Función del controlador que devuelve las complaints por idCompany
 * de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con las complaint y la
 *            información de paginación
 */

export const getComplaintsByCompany: RequestHandler<
  { companyId: string },
  Paginator<Complaint>,
  NoRecord,
  NoRecord
> = async (req, res) => {
  const { companyId } = req.params
  const params = {
    start: req.query.start || 0,
    pageSize: req.query.pageSize || 10,
    companyId: companyId,
  }
  const complaint = await ComplaintService.getComplaintsByCompany(params)
  res.json({
    rows: complaint.rows,
    start: params.start,
    pageSize: params.pageSize,
    total: complaint.count,
  })
}


/**
 * @brief
 * Función del controlador que devuelve las complaint por userId
 * de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con las complaint y la
 *            información de paginación
 */

export const getComplaintByUser: RequestHandler<
  { userId: string },
  Paginator<Complaint> | { message: string },
  NoRecord,
  NoRecord
> = async (req, res) => {
  const { userId } = req.params
  const params = {
    start: req.query.start || 0,
    pageSize: req.query.pageSize || 10,
    userId: userId,
  }

  const complaint = await ComplaintService.getComplaintsByUser(params)

  try {
    res.json({
      rows: complaint.rows,
      start: params.start,
      pageSize: params.pageSize,
      total: complaint.count,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error' })
  }
}


/**
 * @brief
 * Función del controlador que agrega una complaint a la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto con la complaint creada
 * @returns
 * - 400 si no se envía el userId o el complaintId
 * - 201 si se crea la complaint
 * - 500 si ocurre un error en el servidor
 */

export const addComplaint: RequestHandler = async (req, res) => {
  try {
    const { userId, companyId, complaintSubject, complaintDescription, complaintStatus } = req.body

    if (!userId || !companyId || !complaintSubject || !complaintDescription || !complaintStatus) {
      return res.status(400).json({ complaintId: '', error: 'Missing required data!' })
    }

    const newComplaint = await ComplaintService.addComplaint({
      userId,
      companyId,
      complaintSubject,
      complaintDescription,
      complaintStatus
    })

    if (!newComplaint) {
      return res.status(500).json({ complaintId: '', error: 'Error creating complaint!' })
    }

    return res.status(201).json({
      complaintId: newComplaint?.dataValues.complaintId,
      message: 'Complaint created'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ complaintId: '', error: 'Error creating complaint!' })
  }
}



/**
 * @brief
 * Función del controlador que actualiza el status de una complaint de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto con la complaint actualizada
 * @returns
 * - 400 si no se envía el complaintId
 * - 200 si se actualiza correctamente el status
 * - 500 si ocurre un error en el servidor
 */

export const updateComplaintStatus: RequestHandler<
  { complaintId: string },
  string,
  { complaintStatus: typeof Complaint.prototype.complaintStatus },
  NoRecord
> = async (req, res) => {
  const { complaintId } = req.params
  const { complaintStatus } = req.body
  
  if (!complaintId) {
    res.status(400).json('Missing complaintId!')
    return
  }
  if (!complaintStatus) {
    res.status(400).json('Missing status!')
    return
  }
  try {
    await ComplaintService.updateComplaintStatus(complaintId, complaintStatus)
    res.status(200).send('Updated complaint status')
  } catch (error) {
    console.log(error)
    res.status(500).send('Error')
  }
}