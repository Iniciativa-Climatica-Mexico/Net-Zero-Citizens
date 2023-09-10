import { RequestHandler } from 'express'
import Survey from '../models/survey.model'
import { NoRecord } from '../utils/RequestResponse'
import { unwrap } from '../../test/utils'
import * as ReportService from '../services/report.service'

export const getSurveyReport: RequestHandler<
  { surveyId?: string },
  Survey | { error: string },
  NoRecord,
  NoRecord
> = async (req, res) => {
  const { surveyId } = req.params
  
  if (!surveyId) {
    return res.status(400).json({ error: 'Survey ID is required' })
  }

  const survey = await ReportService.getSurveyReport(surveyId)
  if (!survey) {
    return res.status(404).json({ error: 'Survey not found' })
  }

  return res.json(survey)
}
