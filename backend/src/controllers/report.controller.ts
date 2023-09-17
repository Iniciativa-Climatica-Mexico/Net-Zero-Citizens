import { RequestHandler } from 'express'
import Survey from '../models/survey.model'
import { NoRecord } from '../utils/RequestResponse'
import * as ReportService from '../services/report.service'

/**
 * @brief
 * Función del controlador que devuelve una encuesta por su id
 * de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con las encuestas y la
 *         información de paginación
 */
export const getSurveyReport: RequestHandler<
  { surveyId?: string },
  ReportService.SurveyReport | { error: string },
  NoRecord,
  NoRecord
> = async (req, res) => {
  const { surveyId } = req.params
  if (!surveyId) {
    return res.status(400).json({ error: 'Survey ID is required' })
  }
  try {
    const survey = await ReportService.getSurveyReport(surveyId)
    if (!survey) {
      return res.status(404).json({ error: 'Survey not found' })
    }

    return res.json(survey)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
