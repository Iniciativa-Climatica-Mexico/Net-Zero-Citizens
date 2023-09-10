import express from 'express'
import * as controller from '../controllers/survey.controller'

const router = express.Router()

router.get('/', controller.getAllSurveys)
router.get('/:surveyId', controller.getSurveyById)

//router.post('/', controller.createSurvey);

export default router
