import * as ProductImageService from '../services/productImage.service'
import { NoRecord } from '../utils/RequestResponse'
import { RequestHandler } from 'express'

/**
 * @brief
 * Función del controlador para crear una nueva imagen
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los proveedores y la
 *            información de paginación
 */
export const createProductImage: RequestHandler<
  NoRecord,
  {productImageId: string, message?: string, error?: string},
  {productImage: ProductImageService.ProductImageType},
  NoRecord> = async (req, res) => {
    if(!req.body.productImage)
      return res.json({ productImageId: '', message: 'No product image provided'})
    
    if(!req.body.productImage.productId)
      return res.json({ productImageId: '', message: 'No product provided'})

    if(!req.body.productImage.imageUrl)
      return res.json({ productImageId: '', message: 'No image provided'})

    if(!req.body.productImage.altText)
      return res.json({ productImageId: '', message: 'No image alt text provided'})

    const productImage = await ProductImageService.createProductImage(req.body.productImage)

    if(!productImage)
      return res.json({ productImageId: '', message: 'Error creating product image'})
    

    return res.json({ productImageId: productImage.id, message: 'Product image created'})
  }