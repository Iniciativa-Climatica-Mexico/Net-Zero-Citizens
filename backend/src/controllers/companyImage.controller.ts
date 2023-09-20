import * as CompanyImageService from '../services/companyImage.service'
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
  {companyImageId: string, message?: string, error?: string},
  {companyImage: CompanyImageService.CompanyImageType},
  NoRecord> = async (req, res) => {
    if(!req.body.companyImage)
      return res.json({ companyImageId: '', message: 'No product image provided'})
    
    if(!req.body.companyImage.companyId)
      return res.json({ companyImageId: '', message: 'No product provided'})

    if(!req.body.companyImage.imageUrl)
      return res.json({ companyImageId: '', message: 'No image provided'})

    if(!req.body.companyImage.altText)
      return res.json({ companyImageId: '', message: 'No image alt text provided'})

    const companyImage = await CompanyImageService.uploadCompanyImage(req.body.companyImage)

    if(!companyImage)
      return res.json({ companyImageId: '', message: 'Error creating product image'})    

    return res.json({ companyImageId: companyImage.dataValues.companyImageId, message: 'Product image created'})
  }