import Ecoinfo from '../models/ecoinfo.model'
import { z } from 'zod'
import cron from 'node-cron'

/**
 * @brief
 * Función del controlador que devuelve todos los ecoinfo
 * de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los ecoinfo y la
 *            información de paginación
 */
export const getAllEcoinfo = async (): Promise<Ecoinfo[]> => {
  return await Ecoinfo.findAll({
    attributes: { exclude: ['createdPostAt'] },
    order: [['createdPostAt', 'DESC']],
  })
}

/**
 * @brief
 * Funcion que realiza un fetch a la página de Facebook de ICM
 * Cada día
 */
export const cronEcoInfo = cron.schedule('0 0 * * *', () => {
  fetchEcoInfo()
  console.log('EcoInfo updated')
})

/**
 * @brief
 * Función del controlador que hace un fetch a la página de
 * Facebook de ICM
 */
export const fetchEcoInfo = async () => {
  const pageId: string = process.env.ECO_INFO_PAGE_ID || ''
  const pageAccessToken: string = process.env.ECO_INFO_TOKEN || ''

  const apiUrl = `https://graph.facebook.com/${pageId}/posts?limit=10&fields=attachments{media,description},created_time,permalink_url&access_token=${pageAccessToken}`

  if (pageId === '' || pageAccessToken === '') {
    throw new Error('No se ha configurado el id de la página o el access token')
  }

  try {
    const response = await fetch(apiUrl)

    if (response.statusText == 'OK') {
      const dataJson = await response.json()
      const data = EcoInfoApiSchema.parse(dataJson)

      await updateEcoInfo(data)
    } else {
      throw new Error('Error al obtener la información de la página')
    }
  } catch (err) {
    console.log(err)
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
      attachments: z
        .object({
          data: z.array(
            z.object({
              media: z.object({ image: z.object({ src: z.string() }) }),
              description: z.string().optional(),
            })
          ),
        })
        .optional(),
      created_time: z.string(),
      permalink_url: z.string(),
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
        if (!post.attachments?.data[0].media.image.src) {
          return
        } else {
          const coverImage = post.attachments.data[0].media.image.src
          let description = post.attachments.data[0].description
          if (description && description.length > 500) {
            description = post.attachments.data[0].description?.slice(0, 500)
          }
          const postLink = post.permalink_url
          const createdPostAt = post.created_time
          const tempEcoInfoTemplate = {
            postId,
            coverImage,
            description,
            postLink,
            createdPostAt,
          }
          return Ecoinfo.create(tempEcoInfoTemplate)
        }
      }
    })
  )
}
