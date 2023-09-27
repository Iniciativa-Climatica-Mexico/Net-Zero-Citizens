import * as CompanyFileService from '../services/companyFiles.service'
import { NoRecord } from '../utils/RequestResponse'
import { RequestHandler } from 'express'

/**
 * @brief
 * Función del controlador para crear una nueva imagen
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los proveedores y la
 *            información de paginación
 */
export const uploadCompanyImage: RequestHandler<
  NoRecord,
  { companyImageId: string; message?: string; error?: string },
  { companyImage: CompanyFileService.CompanyImageType },
  NoRecord
> = async (req, res) => {
  if (!req.body.companyImage)
    return res.json({
      companyImageId: '',
      message: 'No product image provided',
    })

  if (!req.body.companyImage.companyId)
    return res.json({ companyImageId: '', message: 'No product provided' })

  if (!req.body.companyImage.fileUrl)
    return res.json({ companyImageId: '', message: 'No image provided' })

  const companyImage = await CompanyFileService.uploadCompanyImage(
    req.body.companyImage
  )

  if (!companyImage)
    return res.json({
      companyImageId: '',
      message: 'Error creating product image',
    })

  return res.json({
    companyImageId: companyImage.dataValues.companyImageId,
    message: 'Product image created',
  })
}

/**
 * @brief
 * Función del controlador para subir un archivo de una empresa
 * @param req La solicitud HTTP al servidor
 * @param res Respuesta HTTP del servidor
 */

export const uploadCompanyFileController: RequestHandler = async (req, res) => {
  try {
    const { companyId, fileDescription, fileFormat } = req.body
    const file = req.file

    if (!file || !companyId || !fileDescription || !fileFormat) {
      return res.status(400).json({ message: 'Datos incompletos.' })
    }

    const companyFile = await CompanyFileService.uploadCompanyFile(
      file,
      companyId,
      fileDescription,
      fileFormat
    )

    if (!companyFile) {
      return res.status(500).json({
        message: 'Error al subir el archivo de la empresa.',
      })
    }

    return res.status(201).json({
      message: 'Archivo subido exitosamente.',
    })
  } catch (error) {
    console.error('Error uploading company file:', error)
    return res.status(500).json({
      message: 'Ocurrió un error interno al intentar subir el archivo.',
    })
  }
}
