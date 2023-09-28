import Complaint, {
  ComplaintStatusEnum,
  ComplaintSubjectEnum,
} from '../models/complaint.model'
import User from '../models/users.model'
import Company from '../models/company.model'
import { PaginationParams, PaginatedQuery } from '../utils/RequestResponse'

export type ComplaintType = {
  complaintId?: string
  userId: string
  companyId: string
  complaintStatus: ComplaintStatusEnum
  complaintSubject: ComplaintSubjectEnum
  complaintDescription: string
}

/**
 * @brief
 * Función del servicio que devuelve todas las complaints existentes en la base de datos
 * @param params pageSize, start
 * @returns Una promesa con la(s) complaint(s) o null
 */
export const getAllComplaints = async <T>(
  params: PaginationParams<T>
): Promise<PaginatedQuery<Complaint>> => {
  try {
    const complaints = await Complaint.findAndCountAll({
      limit: params.pageSize,
      offset: params.start,
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName'],
        },
        {
          model: Company,
          attributes: ['name'],
        },
      ],
    })
    return complaints
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * @brief
 * Función del servicio que devuelve un complaint por id de la base de datos
 * @param params ComplaintId
 * @returns Una promesa con la(s) complaint(s) o null
 */

export const getComplaintById = async (
  complaintId: string
): Promise<Complaint | null> => {
  const complaint = await Complaint.findByPk(complaintId, {
    include: [
      {
        model: User,
        attributes: ['firstName', 'lastName'],
      },
      {
        model: Company,
        attributes: ['name'],
      },
    ],
  })

  if (complaint) {
    return complaint
  } else {
    throw new Error('Complaint not found')
  }
}

/**
 * @brief
 * Función del servicio que devuelve la(s) complaint(s) por id de la compañia de la base de datos
 * @param params companyId
 * @returns Una promesa con la(s) complaint(s) de una compañia o null
 */
export const getComplaintsByCompany = async (
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
export const getComplaintsByUser = async (
  params: PaginationParams<{ userId: string }>
): Promise<PaginatedQuery<Complaint>> => {
  const { userId } = params
  return await Complaint.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
    where: {
      userId: userId,
    },

    include: [
      {
        model: Company,
        attributes: ['name'],
      },
    ],
  })
}

/**
 * @brief
 * Función del servicio que agrega una complaint a la base de datos
 * @param params userId, companyId, complaintDescription, complaintStatus
 * @returns Una promesa con la complaint creada
 */
export const addComplaint = async (
  complaint: ComplaintType
): Promise<Complaint> => {
  try {
    return await Complaint.create(complaint)
  } catch (error) {
    console.error('Error creating complaint:', error)
    throw error
  }
}

/**
 * @brief
 * Función del servicio que marca como inactiva una complaint
 * @param params complaintId, complaintStatus
 * @returns Una promesa con la complaintStatus actualizada
 */
export const updateComplaintStatus = async (
  complaintId: string,
  complaintStatus: ComplaintStatusEnum
): Promise<Complaint> => {
  const res = await Complaint.findOne({
    where: {
      complaintId: complaintId,
    },
  })

  if (res) {
    res.complaintStatus = complaintStatus
    await res.save()
    return res
  } else {
    throw new Error('Complaint not found')
  }
}
