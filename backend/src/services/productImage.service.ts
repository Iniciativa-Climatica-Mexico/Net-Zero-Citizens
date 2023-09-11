import ProductImage from '../models/productImage.model'

// TYPES
export type ProductImageType = {
  productId: string,
  imageUrl: string,
  altText: string,
}

/**
 * @brief
 * Función del servicio sube una imagen a la base de datos
 * @param ProductImage Objeto con la información de la imagen
 * @returns Promesa con la información de la imagen o null
 */
export const createProductImage = async (productImage: ProductImageType): Promise<ProductImage | null> => {
  return await ProductImage.create(productImage)
}