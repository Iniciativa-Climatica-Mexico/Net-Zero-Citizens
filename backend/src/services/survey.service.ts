import { z } from 'zod'
import { unwrap } from '../../test/utils'
import Survey from '../models/survey.model'
import { PaginationParams, PaginatedQuery } from '../utils/RequestResponse'
import Question from '../models/question.model'
import QuestionOption from '../models/questionOption.model'
import Answer from '../models/answer.model'

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
        attributes: [
          'questionId',
          'questionText',
          'questionType',
          'isRequired',
        ],
        include: [
          {
            model: QuestionOption,
            association: 'questionOptions',
            attributes: { exclude: ['questionId'] },
          },
        ],
      },
    ],
  })
  return s ? unwrap(s) : null
}

export const getSurveyPending = async (
  userId: string
): Promise<Survey | null> => {
  const survey = await Survey.findOne({
    order: [['createdAt', 'DESC']],
    where: {
      endDate: null,
    },
    include: [
      {
        model: Question,
        association: 'questions',
        attributes: [
          'questionId',
          'questionText',
          'questionType',
          'isRequired',
        ],
        include: [
          {
            model: QuestionOption,
            association: 'questionOptions',
            attributes: { exclude: ['questionId'] },
          },
        ],
      },
    ],
  })
  if (!survey) return null

  const pool = await Promise.all(
    survey.questions.map(async (question) => {
      const answers = await question.$get('answers', {
        where: {
          userId,
        },
      })
      return answers.length
    })
  )
  const alreadyAnswered = pool.some((length) => length > 0)
  if (alreadyAnswered) return null
  return survey
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
 */
export const closeSurvey = async (surveyId: string): Promise<Survey | null> => {
  const s = await Survey.findByPk(surveyId)
  if (s) {
    s.endDate = new Date()
    await s.save()
  }
  return unwrap(s)
}

/**
 * @brief
 * Schema para validar el body de la petición de contestar una encuesta
 */
export const answerSurveyBodyScheme = z.object({
  answers: z.array(
    z.object({
      questionId: z.string(),
      scaleValue: z.number().optional(),
      answerText: z.string().optional(),
    })
  ),
})

type AnswerSurveyReqBody = z.infer<typeof answerSurveyBodyScheme>
type FullAnswers = AnswerSurveyReqBody & { userId: string; surveyId: string }

/**
 * Función del servicio que crea respuestas a una encuesta 
 * @param answers Lista de respuestas y el id de la encuesta y el usuario
 * @returns Un arreglo de las respuestas creadas
 */
export const answerSurvey = async (answers: FullAnswers): Promise<Answer[]> => {
  const processedAnswers = answers.answers.map((a) => {
    const processedAns = { ...a, userId: answers.userId }
    return processedAns
  })

  const surveyId = answers.surveyId
  const survey = await Survey.findByPk(surveyId, {
    include: [
      {
        model: Question,
        association: 'questions',
        attributes: ['questionId', 'questionType', 'isRequired'],
        include: [
          {
            model: QuestionOption,
            association: 'questionOptions',
          },
        ],
      },
    ],
  })
  if (!survey) throw new Error('Survey not found')

  const answersToInsert: typeof processedAnswers = []
  const questions = survey.questions
  for (const question of questions) {
    const ans = processedAnswers.find(
      (a) => a.questionId === question.questionId
    )

    if (!ans) {
      if (question.isRequired) {
        throw new Error('Answer is required')
      } else {
        continue
      }
    }

    if (question.questionType === 'multiple_choice') {
      if (ans.scaleValue) throw new Error('Scale value not allowed')
      if (!ans.answerText) throw new Error('Text answer is required')
      const isValidOption = question.questionOptions.some(
        (option) => option.textOption === ans.answerText
      )
      if (!isValidOption) throw new Error('Invalid option')
    } else if (question.questionType === 'scale') {
      if (ans.answerText) throw new Error('Text answer not allowed')
      if (!ans.scaleValue) throw new Error('Scale value is required')
    } else if (question.questionType === 'open') {
      if (ans.scaleValue) throw new Error('Scale value not allowed')
      if (!ans.answerText) throw new Error('Text answer is required')
    } else {
      throw new Error('Invalid question type')
    }
    answersToInsert.push(ans)
  }

  const s = await Answer.bulkCreate(answersToInsert)
  return unwrap(s)
}
