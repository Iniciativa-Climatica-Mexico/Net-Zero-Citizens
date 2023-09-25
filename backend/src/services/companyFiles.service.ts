import CompanyImage from '../models/companyFiles.model'

// TYPES
export type CompanyImageType = {
  companyId: string
  fileUrl: string
  fileDescription: string
  fileFormat?: string
}

/**
 * @brief
 * Función del servicio sube una imagen a la base de datos
 * @param CompanyImage Objeto con la información de la imagen
 * @returns Promesa con la información de la imagen o null
 */
export const uploadCompanyImage = async (
  companyImage: CompanyImageType
): Promise<CompanyImage | null> => {
  return await CompanyImage.create(companyImage)
}

// Se va a cambiar a s3 de aws

