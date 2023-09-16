import Company from '../models/company.model'
import * as CompanyService from '../services/company.service'
import { NoRecord, Paginator, PaginationParams } from '../utils/RequestResponse'
import { RequestHandler } from 'express'
const NodeGeocoder = require('node-geocoder');

const geocoder = NodeGeocoder({
  provider: 'google',
  apiKey: process.env.GOOGLE_MAPS_API,
});

export const getCompanyInfo : RequestHandler<{ companyId: string }> =async (
  req,
  res
) => {
  const compId = req.params.companyId

  const companyInfo = await CompanyService.getCompanyInfo(compId)

  if (companyInfo){
    res.json(companyInfo)
  }
  else {
    res.status(404).json({error: 'Company not found'})
  }
}

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
 * Función del controlador que devuelve todos los proveedores pendientes por aprobar de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los proveedores y la información de paginación
 */
export const getPendingCompanies: RequestHandler<
  NoRecord,
  Paginator<Company>,
  NoRecord,
  PaginationParams<{ status: string}>
> = async (req, res) => {
  const params = {
    start: req.query.start || 0,
    pageSize: req.query.pageSize || 10
  }
  const companies = await CompanyService.getPendingCompanies(params)
  res.json({
    rows: companies.rows,
    start: params.start,
    pageSize: params.pageSize,
    total: companies.count,
  })
}

/**
 * @brief
 * Función del controlador que actualiza a un proveedor de la base de datos
 * @param req 
 * @param res 
 */
export const updateCompanyInfo: RequestHandler<
  { companyId: string },
  { message: string }, 
  CompanyService.UpdateCompanyInfoBody
> = async (req, res) => {
  const compId = req.params.companyId
  const companyInfo = await CompanyService.getCompanyInfo(compId)
  if (companyInfo) {
    await CompanyService.updateCompanyInfo(compId, req.body)
    res.status(201).json({ message: 'Company updated' })
  }
  else {
    res.status(404).json({ message: 'Company not found' })
  }
}

/**
 * @brief
 * Función del controlador que convierte las ubicaciones
 * de los proveedores aprovados a longitudes y latitudes
 * @param req 
 * @param res 
 */

interface FilteredCompany {
  companyId: string;
  name: string;
  latitude: number;
  longitude: number;
  profilePicture: string;
}

export const getCoordinates: RequestHandler<
  NoRecord,
  Paginator<FilteredCompany>,
  NoRecord,
  PaginationParams<{ status: string }>
> = async (req, res) => {
  const params = {
    start: req.query.start || 0,
    pageSize: req.query.pageSize || 10,
  };

  // Define un tipo para la respuesta de geocodificación
  interface GeocodeResult {
    latitude: number;
    longitude: number;
  }

  const companies = await CompanyService.getApprovedCompanies(params);

  // Configura el geocoder con tu clave de API
  const geocoder = NodeGeocoder({
    provider: 'google',
    apiKey: process.env.GOOGLE_MAPS_API,
  });

  const companiesWithCoordinates = await Promise.all(
    companies.rows.map(async (company) => {
      const { street, streetNumber, city, state, zipCode } = company.dataValues;

      // Crea la dirección a partir de los campos de la empresa
      const address = `${street} ${streetNumber}, ${city}, ${state}, ${zipCode}`;

      try {
        // Realiza la geocodificación
        const geocodeResult = await geocoder.geocode(address);
        if (geocodeResult.length > 0) {
          const { latitude, longitude } = geocodeResult[0];
          return {
            companyId: company.dataValues.companyId,
            name: company.dataValues.name,
            latitude,
            longitude,
            profilePicture: company.dataValues.profilePicture,
          };
        }
      } catch (error: any) {
        console.error(`Error al geocodificar la empresa ${company.dataValues.companyId}: ${error.message}`);
      }

      // Si la geocodificación falla o no se encuentra, regresa null
      return null;
    })
  );

  // Filtra las empresas que no pudieron geocodificarse
  const filteredCompanies = companiesWithCoordinates.filter((company) => company !== null);

  const filteredCompaniesTyped: FilteredCompany[] = filteredCompanies.filter(
    (company): company is FilteredCompany => company !== null
  );

  const paginator: Paginator<FilteredCompany> = {
    rows: filteredCompaniesTyped,
    start: 0,
    pageSize: filteredCompanies.length,
    total: filteredCompanies.length,
  };

  res.json(paginator);
};