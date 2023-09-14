import { z } from 'zod'
import { unwrap } from '../../test/utils'
import Survey from '../models/survey.model'
import { PaginationParams, PaginatedQuery } from '../utils/RequestResponse'
import Question from '../models/question.model'
import QuestionOption from '../models/questionOption.model'

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
    include: [
      {
        model: Question,
        association: 'questions',
        attributes: ['questionId', 'questionText', 'questionType', 'isRequired'],
        include: [
          {
            model: QuestionOption,
            association: 'questionOptions',
          },
        ],
      },
    ],
  })
  return s ? unwrap(s) : null
}

export const createSurveyBodyScheme = z.object({
  title: z.string().nonempty(),
  description: z.string(),
  questions: z.array(
    z.object({
      questionText: z.string(),
      questionType: z.enum(['open', 'scale', 'multiple_choice']),
      questionOptions: z.array(z.object({ textOption: z.string() })).optional(),
    })
  ),
})

export type CreateSurveyReqBody = z.infer<typeof createSurveyBodyScheme>
/**
 * @brief
 * Función del servicio que devuelve todas las encuestas cerradas de la base de datos
 * @param params Los parametros de paginación
 * @returns Una promesa con las encuestas y la información de paginación
 *
 * TODO: Verificar caul de las dos funciones es la correcta.
 */
export const createSurvey = async (
  survey: CreateSurveyReqBody
): Promise<Survey> => {
  const s = await Survey.create(survey, {
    include: [
      {
        model: Question,
        association: 'questions',
        include: [
          {
            model: QuestionOption,
            association: 'questionOptions',
          },
        ],
      },
    ],
  })
  return unwrap(s)
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
  const s = await Survey.findByPk(surveyId)
  if (s) {
    s.endDate = new Date()
    await s.save()
  }
  return unwrap(s)
}
