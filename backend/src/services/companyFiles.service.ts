import CompanyFile from '../models/companyFiles.model'
import { s3 } from '../configs/aws.config'
import { v4 as uuidv4 } from 'uuid'
import Company from '../models/company.model'

export type CompanyImageType = {
  companyId: string
  fileUrl: string
  fileDescription: 'Imagen'
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
): Promise<CompanyFile | null> => {
  return await CompanyFile.create(companyImage)
}

type FileDescription =
  | 'INE representante legal'
  | 'Acta constitutiva'
  | 'Curriculum'
  | 'Directorio de instaladores certificados de CDMX'
  | 'Padron de empresas especializadas FIDE'
  | 'Certificaciones sistemas fotovoltaicos'
  | 'NOM-027-ENER/SCH-2018'
  | 'NMX-ES-004-NORMEX-2015'
  | 'Archivos presion mayor a 294k Pa'
  | 'Archivos presion menor a 294k Pa'
  | 'Carta de compromiso'
  | 'Imagen'
  | 'Otro' // EVITAR USAR ESTE VALOR

type FileFormat =
  | '.jpg'
  | '.jpeg'
  | '.png'
  | '.pdf'
  | '.docx'
  | '.xlsx'
  | '.pptx'

/**
 * @brief Tipo de dato para la información de un archivo
 */

type CompanyFileType = {
  companyId: string
  fileUrl: string | null // cambiar no puede ser null
  fileDescription: FileDescription
  fileFormat?: FileFormat
}

/**
 * @brief Función del servicio sube un archivo al s3 y crea un registro en la base de datos
 * @param file -> Archivo a subir
 * @param companyId -> Id de la empresa
 * @param fileDescription -> Descripción del archivo
 * @param fileFormat -> Formato del archivo
 * @returns Promesa con la información del archivo o null
 */

export const uploadCompanyFile = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file: any,
  companyId: string,
  fileDescription: FileDescription,
  fileFormat: FileFormat
): Promise<CompanyFileType | null> => {
  // Validar que exista el bucket
  const bucketName = process.env.AWS_BUCKET_NAME
  if (!bucketName) {
    throw new Error('AWS_BUCKET_NAME is not defined')
  }

  try {
    // Obtener la información de la empresa
    const company = await Company.findByPk(companyId)

    // Convertir el archivo a base64
    const base64data = Buffer.from(file.buffer, 'binary')

    // Definir los parámetros para subir el archivo
    const params = {
      Bucket: bucketName,
      Key: `${company?.name}/${fileDescription + '.' + fileFormat}`,
      Body: base64data,
    }

    // Subir el archivo al bucket
    const s3Response = await s3.upload(params).promise()
    console.log(s3Response)

    // // Crear el registro en la base de datos
    const companyFileId = uuidv4()
    const newFile = await CompanyFile.create({
      companyFileId: companyFileId,
      companyId: companyId,
      fileUrl: s3Response.Location,
      fileDescription: fileDescription,
      fileFormat: fileFormat,
    })

    return newFile
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getCompanyFiles = async (): Promise<CompanyFile[] | null> => {
  return await CompanyFile.findAll()
}
