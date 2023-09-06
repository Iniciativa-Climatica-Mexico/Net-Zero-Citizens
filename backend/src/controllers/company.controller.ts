import { Company } from '../models/company.model'
import * as CompanyService from '../services/company.service'
import { NoRecord, Paginator, PaginationParams } from '../utils/RequestResponse'
import { RequestHandler } from 'express'

export const getAllCompanies: RequestHandler<
  NoRecord,
  Paginator<Company>,
  NoRecord,
  PaginationParams<{ name?: string }>
> = async (req, res) => {
  const params = {
    start: req.query.start || 0,
    pageSize: req.query.pageSize || 10,
    filters: {
      name: req.query.filters?.name || '',
    },
  }
  const companies = await CompanyService.getAllCompanies(params)
  res.json({
    rows: companies.rows,
    start: params.start,
    pageSize: params.pageSize,
    total: companies.count,
  })
}

/**
 * @brief
 * Obtiene un proveedor por su id y lo devuelve en la respuesta
 * @param req Request con el id del proveedor
 * @param res Response con el proveedor
 */
export const getCompanyById: RequestHandler<
  NoRecord,
  Company | { message: string },
  NoRecord,
  { id: string }
> = async (req, res) => {
  try {
    const company = await CompanyService.getCompanyById(req.params.id)

    if (!company) {
      res.status(404).json({ message: 'Company not found' })
    } else {
      res.json(company)
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}
