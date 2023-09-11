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
  Survey,
  Partial<Survey>,
  NoRecord
> = async (req, res) => {
  const surveyData = req.body
  const survey = await SurveyService.createSurvey(surveyData)
  res.json(survey)
}
