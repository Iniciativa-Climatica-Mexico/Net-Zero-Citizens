import { unwrap } from '../../test/utils'
import Survey from '../models/survey.model'
import { PaginationParams, PaginatedQuery } from '../utils/RequestResponse'

/**
 * @brief
 * Función del servicio que devuelve todas las encuestas de la base de datos
 * @param params Los parametros de paginación
 * @returns Una promesa con las encuestas y la información de paginación
 */
export const getAllSurveys = async <T>(
  params: PaginationParams<T>
): Promise<PaginatedQuery<Survey>> => {
  return await Survey.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
  })
}

/**
 * @brief
 * Función del servicio que devuelve todas las encuestas abiertas de la base de datos
 * @param params Los parametros de paginación
 * @returns Una promesa con las encuestas y la información de paginación
 *
 * TODO: Añadir atributo isOpen a la tabla SURVEYS o funciona con el campo END_DATE?
 */
// export const getOpenSurveys = async <T>(
//     params: PaginationParams<T>
// ): Promise<PaginatedQuery<Survey>> => {
//     return await Survey.findAndCountAll({
//         limit: params.pageSize,
//         offset: params.start,
//         where: {
//             isOpen: true
//         }
//     })
// }

/**
 * @brief
 * Función del servicio que devuelve todas las encuestas cerradas de la base de datos
 * @param params Los parametros de paginación
 * @returns Una promesa con las encuestas y la información de paginación
 *
 */
export const getSurveyById = async (
  surveyId: string
): Promise<Survey | null> => {
  const s = await Survey.findByPk(surveyId, {
    plain: true,
  })
  return s ? unwrap(s) : null
}

/**
 * @brief
 * Función del servicio que devuelve todas las encuestas cerradas de la base de datos
 * @param params Los parametros de paginación
 * @returns Una promesa con las encuestas y la información de paginación
 *
 * TODO: Verificar caul de las dos funciones es la correcta.
 */
export const createSurvey = async (
  surveyData: Partial<Survey>
): Promise<Survey> => {
  const survey = await Survey.create(surveyData)
  return unwrap(survey)
}

/**
 * @brief
 * Función del servicio que cierra la encuesta y la actualiza en la base de datos
 * @param params Los parametros de paginación
 * @returns Una promesa con las encuestas y la información de paginación
 *
 * TODO: Hasta que quede la función de getOpenSurveys funcionando.
 */
export const closeSurvey = async (surveyId: string): Promise<Survey | null> => {
  const s = await Survey.findByPk(surveyId, {
    plain: true,
  })
  if (s) {
    s.endDate = new Date() 
    await s.save()
  }
  return s ? unwrap(s) : null
}
