import Answer from '../models/answer.model'
import Survey from '../models/survey.model'
import * as SurveyService from '../services/survey.service'
import { NoRecord, Paginator, PaginationParams } from '../utils/RequestResponse'
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
    pageSize: req.query.pageSize || 1000,
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
 * @param res Un objeto de la encuesta
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
 * Función del controlador que devuelve la ultima encuesta no cerrada
 * si el usuario aun no la ha contestado
 * @param req La request HTTP al servidor
 * @param res Un objeto de la encuesta
 */
export const getSurveyPending: RequestHandler<
  { userId: string },
  Survey | null | { message: string },
  NoRecord,
  NoRecord
> = async (req, res) => {
  try {
    const userId = req.params.userId
    const survey = await SurveyService.getSurveyPending(userId)
    res.json(survey || null)
  } catch (err) {
    res.status(500).json({ message: 'Error getting pending surveys' })
  }
}

/**
 * @brief
 * Función del controlador que crea una encuesta en la base de datos
 * @param req La request HTTP al servidor
 * @param res El objeto de la encuesta creada
 */
export const createSurvey: RequestHandler<
  NoRecord,
  Survey | { message: string },
  undefined,
  NoRecord
> = async (req, res) => {
  try {
    const surveyData = SurveyService.createSurveyBodyScheme.parse(req.body)

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
 * @param res Estatus 200 si la encuesta se cierra correctamente, 404 si no se encuentra
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
    res.status(200).send()
  }
}

/**
 * @brief
 * Función del controlador que crea respuestas a una encuesta
 * de parte de un usuario en la base de datos
 * @param req La request HTTP al servidor
 * @param res Un arreglo de las respuestas creadas
 */
export const answerSurvey: RequestHandler<
  { userId: string; surveyId: string },
  Answer[] | { message: string },
  undefined,
  NoRecord
> = async (req, res) => {
  try {
    const answerData = SurveyService.answerSurveyBodyScheme.parse(req.body)
    const userId = req.params.userId
    const surveyId = req.params.surveyId
    const answers = await SurveyService.answerSurvey({
      ...answerData,
      userId,
      surveyId,
    })
    res.json(answers)
  } catch (err) {
    res.status(500).json({ message: 'Error creating answer' })
  }
}
