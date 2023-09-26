import Complaint from '../models/complaint.model'
import User from '../models/users.model'
import { PaginationParams, PaginatedQuery } from '../utils/RequestResponse'

/**
 * @brief
 * Función del servicio que devuelve todas las complaints existentes en la base de datos
 * @param params pageSize, start
 * @returns Una promesa con la(s) complaint(s) o null
 */

export const getAllComplaints = async <T>(
  params: PaginationParams<T>
): Promise<PaginatedQuery<Complaint>> => {
  return await Complaint.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
  })
}


/**
 * @brief
 * Función del servicio que devuelve un complaint por id de la base de datos
 * @param params ComplaintId
 * @returns Una promesa con la(s) complaint(s) o null
 */

export const getComplaintById = async (
  params: PaginationParams<{ ComplaintId: string }>
): Promise<PaginatedQuery<Complaint>> => {
  const { ComplaintId } = params
  return await Complaint.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
    where: {
      ComplaintId: ComplaintId,
    },
  })
}


/**
 * @brief
 * Función del servicio que devuelve la(s) complaint(s) por id de la compañia de la base de datos
 * @param params companyId
 * @returns Una promesa con la(s) complaint(s) de una compañia o null
 */

export const getComplaintByCompany = async (
  params: PaginationParams<{ companyId: string }>
): Promise<PaginatedQuery<Complaint>> => {
  const { companyId } = params
  return await Complaint.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
    where: {
      companyId: companyId,
    },

    include: [
      {
        model: User,
        attributes: ['firstName', 'lastName'],
      },
    ],
  })
}


/**
 * @brief
 * Función del servicio que devuelve la(s) complaint(s) por id de usuario de la base de datos
 * @param params userId
 * @returns Una promesa con la(s) complaint(s) de un usuario o null
 */

export const getComplaintByUser = async (
  params: PaginationParams<{ userId: string }>
): Promise<PaginatedQuery<Complaint>> => {
  const { userId } = params
  return await Complaint.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
    where: {
      userId: userId,
    },
  })
}


/**
 * @brief
 * Función del servicio que agrega una complaint a la base de datos
 * @param params userId, companyId, complaintDescription, complaintStatus
 * @returns Una promesa con la complaint creada
 */

export const addComplaint = async (
  userId: string,
  companyId: string,
  complaintDescription: string,
  complaintStatus: string
): Promise<Complaint> => {
  const complaint = await Complaint.create({
    userId: userId,
    companyId: companyId,
    complaintDescription: complaintDescription,
    complaintStatus: complaintStatus,
  })
  return complaint
}


/**
 * @brief
 * Función del servicio que elimina una complaint de la base de datos
 * @param params complaintId
 * @returns Una promesa con la complaint eliminada
 */

export const deleteComplaint = async (complaintId: string): Promise<Complaint> => {
  const complaint = await Complaint.findOne({
    where: {
      complaintId: complaintId,
    },
  })
  if (complaint) {
    await complaint.destroy()
    return complaint
  } else {
    throw new Error('Complaint not found.')
  }
}


/**
 * @brief
 * Función del servicio que marca como inactiva una complaint
 * @param params complaintId, complaintStatus
 * @returns Una promesa con la complaintStatus actualizada
 */

export const flagComplaintAsInactive = async (
  complaintId: string,
): Promise<Complaint> => {
  const res = await Complaint.findOne({
    where: {
      complaintId: complaintId,
    },
  })

  const complaintStatus = 'inactive'

  if (res) {
    res.complaintStatus = complaintStatus
    await res.save()
    return res
  } else {
    throw new Error('Complaint not found.')
  }
}

/**
 * @brief
 * Función del servicio que marca como no válida una complaint
 * @param params complaintId, complaintStatus
 * @returns Una promesa con el status de la complaint actualizada
 */


export const flagComplaintAsInvalid = async (
  complaintId: string,
): Promise<Complaint> => {
  const res = await Complaint.findOne({
    where: {
      complaintId: complaintId,
    },
  })

  const complaintStatus = 'invalid'

  if (res) {
    res.complaintStatus = complaintStatus
    await res.save()
    return res
  } else {
    throw new Error('Complaint not found.')
  }
}