import CompanyFiles from '../models/companyFiles.model'
import * as CompanyFileService from '../services/companyFiles.service'
import { NoRecord } from '../utils/RequestResponse'
import { RequestHandler } from 'express'
import { FileFormat, FileDescription } from '../models/companyFiles.model'

export const uploadCompanyFile: RequestHandler = async (req, res) => {
  try {
    let { companyId, fileFormat, fileDescription } = req.body

    // Format the string from android petitions
    companyId = companyId.replace(/"/g, '')
    fileFormat = fileFormat.replace(/"/g, '')
    fileDescription = fileDescription.replace(/"/g, '')

    // Service to upload the file
    CompanyFileService.uploadCompanyFile(
      req.file,
      companyId,
      fileDescription as FileDescription,
      fileFormat as FileFormat
    )
    return res.status(200).send('File uploaded!')
  } catch (error) {
    return res.status(500).send('Error uploading file')
  }
}

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

export const getCompanyFiles: RequestHandler<
  NoRecord,
  CompanyFiles[] | null,
  NoRecord,
  NoRecord
> = async (_, res) => {
  const companyFiles = await CompanyFileService.getCompanyFiles()
  return res.json(companyFiles)
}

export const downloadCompanyFile: RequestHandler = async (req, res) => {
  try {
    const { companyId, fileFormat, fileDescription } = req.body
    console.log(req.body)
    if ( !companyId || !fileFormat || !fileDescription) {
      return res.status(400).send('Missing parameters')
    }

    const fileStream = await CompanyFileService.downloadCompanyFile(
      companyId,
      fileDescription,
      fileFormat
    )

    if (!fileStream) {
      return res.status(404).send('File not found')
    }

    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${fileDescription}.${fileFormat}`
    )
    res.setHeader('Content-Type', 'application/pdf')
    fileStream.pipe(res)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Error downloading file')
  }
}
