import Ecoinfo from '../models/ecoinfo.model'
import { z } from 'zod'

/**
 * @brief
 * Función del controlador que devuelve todos los ecoinfo
 * de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los ecoinfo y la
 *            información de paginación
 */
export const getAllEcoinfo = async (): Promise<Ecoinfo[]> => {
  await fetchEcoInfo()
  return await Ecoinfo.findAll()
}

/**
 * @brief
 * Función del controlador que hace un fetch a la página de
 * Facebook de ICM
 */
const fetchEcoInfo = async () => {
  const pageId: string = process.env.ECO_INFO_PAGE_ID || ''
  const pageAccessToken: string = process.env.ECO_INFO_TOKEN || ''

  const apiUrl = `https://graph.facebook.com/${pageId}/posts?fields=attachments{media,description,url}&access_token=${pageAccessToken}`

  if (pageId === '' || pageAccessToken === '') {
    throw new Error('No se ha configurado el id de la página o el access token')
  }

  try {
    const response = await fetch(apiUrl)

    if (response.statusText == 'OK') {
      const dataJson = await response.json()
      const data = EcoInfoApiSchema.parse(dataJson)
      updateEcoInfo(data)
    } else {
      throw new Error('Error al obtener la información de la página')
    }
  } catch {
    throw new Error('Error al obtener la información de la página')
  }
}

/**
 * @brief
 * Esquema de validación de la respuesta de la API de Facebook
 */
const EcoInfoApiSchema = z.object({
  data: z.array(
    z.object({
      attachments: z.object({
        data: z.array(
          z.object({
            media: z.object({ image: z.object({ src: z.string() }) }),
            description: z.string().optional(),
            url: z.string(),
          })
        ),
      }),
      id: z.string(),
    })
  ),
})

/**
 * @brief
 * Modelo de la respuesta de la API de Facebook
 */
type EcoInfoApiModel = z.infer<typeof EcoInfoApiSchema>

/**
 * @brief
 * Función que actualiza la información de ecoinfo en la base de datos
 */
const updateEcoInfo = async (data: EcoInfoApiModel) => {
  await Promise.all(
    data.data.map(async (post) => {
      const postId = post.id
      const exists = await Ecoinfo.findOne({ where: { postId } })

      if (!exists) {
        const coverImage = post.attachments.data[0].media.image.src
        const description = post.attachments.data[0].description
        const postLink = post.attachments.data[0].url

        const tempEcoInfoTemplate = {
          postId,
          coverImage,
          description,
          postLink,
        }
        return Ecoinfo.create(tempEcoInfoTemplate)
      }
    })
  )
}
