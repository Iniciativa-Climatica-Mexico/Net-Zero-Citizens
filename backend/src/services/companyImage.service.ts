import CompanyImage from '../models/companyImages.model'

// TYPES
export type CompanyImageType = {
  companyId: string,
  imageUrl: string,
  altText: string,
}

/**
 * @brief
 * Función del servicio sube una imagen a la base de datos
 * @param CompanyImage Objeto con la información de la imagen
 * @returns Promesa con la información de la imagen o null
 */
export const uploadCompanyImage = async (companyImage: CompanyImageType): Promise<CompanyImage | null> => {
  return await CompanyImage.create(companyImage)
}