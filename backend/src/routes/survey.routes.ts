import express from 'express'
import * as controller from '../controllers/survey.controller'

const router = express.Router()

router.get('/', controller.getAllSurveys)
router.get('/:surveyId', controller.getSurveyById)
router.get('/pending/:userId', controller.getSurveyPending)

//router.post('/', controller.createSurvey);

export default router
