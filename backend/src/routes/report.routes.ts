import express from 'express'
import * as controller from '../controllers/report.controller'

const router = express.Router()

router.get('/survey/:surveyId', controller.getSurveyReport)

export default router
