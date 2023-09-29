import Product from '../models/products.model'
import * as ProductService from '../services/product.service'
import { NoRecord, Paginator, PaginationParams } from '../utils/RequestResponse'
import { RequestHandler } from 'express'

/**
 * @brief
 * Función del controlador que devuelve todos los productos
 * de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los proveedores y la
 *            información de paginación
 */
export const getAllProducts: RequestHandler<
  NoRecord,
  Paginator<Product>,
  NoRecord,
  PaginationParams<{ name?: string }>
> = async (req, res) => {
  const params = {
    start: req.query.start || 0,
    pageSize: req.query.pageSize || 1000,
    filters: {
      name: req.query.name || '',
    },
  }

  const products = await ProductService.getAllProducts(params)
  res.json({
    rows: products.rows,
    start: params.start,
    pageSize: params.pageSize,
    total: products.count,
  })
}