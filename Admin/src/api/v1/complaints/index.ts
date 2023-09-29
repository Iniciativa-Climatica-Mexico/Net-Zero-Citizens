import type { Company } from '@/@types/company/company'
import { authAxios } from '../axios.config'
import type { CompanyComplaints } from '@/@types/complaint/complaint'

/**
 * @brief
 * Funcion que regresa los complaints por empresa
 * @param status
 * @returns Una respuesta conteniendo todos los complaints por id de las empresas
 */

export const getCompaniesWithComplaints = async () => {
  try {
    const approvedCompanies = await authAxios().get('/company/approved')

    const companies: Company[] = approvedCompanies.data.rows
    const companiesWithComplaints: CompanyComplaints[] = []
    
    for (const company of companies) {
      const companyComplaints = await authAxios().get(`/complaints/company/${company.companyId}`)
      const numberComplaints = companyComplaints.data.rows.length
        if (numberComplaints > 0) {
            companiesWithComplaints.push({...company, numberComplaints: numberComplaints, complaints: companyComplaints.data.rows})
        }
    }
    
    return companiesWithComplaints

  } catch (error) {
    console.error('Error fetching companies with complaints:', error)
    throw error
  }
}

