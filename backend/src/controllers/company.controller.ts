import Company from '../models/company.model'
import CompanyProduct from '../models/companyProducts.model'
import * as CompanyService from '../services/company.service'
import { NoRecord, Paginator, PaginationParams } from '../utils/RequestResponse'
import { RequestHandler } from 'express'

/**
 * @brief
 * Función del controlador que devuelve todos los proveedores
 * de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los proveedores y la
 *            información de paginación
 */
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
      name: req.query.name || '',
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

/**
 * @brief
 * Función del controlador para registrar un nuevo proveedor
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los proveedores y la
 *            información de paginación
 */
export const createCompany: RequestHandler<
  NoRecord,
  { companyId: string; message?: string; error?: string },
  { company: Company },
  NoRecord
> = async (req, res) => {
  try {
    if (!req.body.company)
      return res
        .status(400)
        .json({ companyId: '', error: 'Missing company data' })
    const company = req.body.company

    const newCompany = await CompanyService.createCompany(company)
    console.log(newCompany)

    if (!newCompany)
      return res
        .status(400)
        .json({ companyId: '', error: 'Error creating company' })

    return res.json({
      companyId: newCompany?.dataValues.companyId,
      message: 'Company created',
    })
  } catch (error) {
    res.status(400).json({ companyId: '', error: 'Error creating company' })
  }
}

/**
 * @brief
 * Función del controlador para añadir un producto a un proveedor
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los proveedores y la
 *            información de paginación
 */
export const addProduct: RequestHandler<
  NoRecord,
  { companyProductId: string; message?: string; error?: string },
  { companyProduct: CompanyProduct },
  NoRecord
> = async (req, res) => {
  try {
    if (!req.body.companyProduct)
      res
        .status(400)
        .json({
          companyProductId: '',
          error: 'Missing company or product data',
        })
    const company = req.body.companyProduct
    const newCompanyProduct = await CompanyService.addProduct(company)

    if (!newCompanyProduct)
      res
        .status(400)
        .json({
          companyProductId: '',
          error: 'Error adding product to company',
        })

    res.json({
      companyProductId: newCompanyProduct?.dataValues.companyId,
      message: 'Product added to company',
    })
  } catch (error) {
    res
      .status(400)
      .json({ companyProductId: '', error: 'Error adding product to company' })
  }
}
