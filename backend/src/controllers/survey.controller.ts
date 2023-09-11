import Survey from '../models/survey.model'
import * as SurveyService from '../services/survey.service'
import {
  NoRecord,
  Paginator,
  PaginationParams,
  DeepPartial,
} from '../utils/RequestResponse'
import { RequestHandler } from 'express'

/**
 * @brief
 * Función del controlador que devuelve todas las encuestas
 * de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con las encuestas y la
 *           información de paginación
 */
export const getAllSurveys: RequestHandler<
  NoRecord,
  Paginator<Survey>,
  NoRecord,
  PaginationParams<{ name?: string }>
> = async (req, res) => {
  const params = {
    start: req.query.start || 0,
    pageSize: req.query.pageSize || 10,
    filters: {
      title: req.query.name || '',
    },
  }

  const surveys = await SurveyService.getAllSurveys(params)
  res.json({
    rows: surveys.rows,
    start: params.start,
    pageSize: params.pageSize,
    total: surveys.count,
  })
}

/**
 * @brief
 * Función del controlador que devuelve una encuesta por su id
 * de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con las encuestas y la
 *          información de paginación
 *
 */
export const getSurveyById: RequestHandler<
  NoRecord,
  Survey,
  NoRecord,
  NoRecord
> = async (req, res) => {
  const surveyId = req.params.surveyId
  const survey = await SurveyService.getSurveyById(surveyId)
  res.json(survey || undefined)
}

/**
 * @brief
 * Función del controlador que crea una encuesta en la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con las encuestas y la
 *         información de paginación
 *
 * TODO: Verificar caul de las dos funciones es la correcta del servicio.
 */
export const createSurvey: RequestHandler<
  NoRecord,
  Survey | { message: string },
  DeepPartial<SurveyService.CreateSurveyReqBody>,
  NoRecord
> = async (req, res) => {
  try {
    if (!req.body.title) {
      res.status(400).json({ message: 'Title is required' })
      return
    }
    if (!req.body.description) {
      res.status(400).json({ message: 'Description is required' })
      return
    }
    if (!req.body.questions) {
      res.status(400).json({ message: 'Questions are required' })
      return
    }

    for (const question of req.body.questions) {
      if (!question?.questionText) {
        res.status(400).json({ message: 'Question text is required' })
        return
      }
      if (!question.questionType) {
        res.status(400).json({ message: 'Question type is required' })
        return
      }
      if (question.questionType === 'multipleChoice') {
        if (!question.questionOptions) {
          res.status(400).json({ message: 'Question options are required' })
          return
        }
        question.questionOptions.forEach((option) => {
          if (!option?.textOption) {
            res.status(400).json({ message: 'Option text is required' })
            return
          }
        })
      }
    }

    const surveyData: SurveyService.CreateSurveyReqBody = {
      title: req.body.title,
      description: req.body.description,
      questions: req.body.questions as SurveyService.QuestionsReq[],
    }

    const survey = await SurveyService.createSurvey(surveyData)
    res.json(survey)
  } catch (err) {
    res.status(500).json({ message: 'Error creating survey' })
  }
}

/**
 * @brief
 * Función del controlador que cierra la encuesta y la actualiza en la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con las encuestas y la
 *        información de paginación
 */
export const closeSurvey: RequestHandler<
  { surveyId: string },
  { message: string } | null,
  NoRecord,
  NoRecord
> = async (req, res) => {
  const surveyId = req.params.surveyId
  const survey = await SurveyService.closeSurvey(surveyId)

  if (!survey) {
    res.status(404).json({ message: 'Survey not found' })
  } else {
    res.status(200)
  }
}
