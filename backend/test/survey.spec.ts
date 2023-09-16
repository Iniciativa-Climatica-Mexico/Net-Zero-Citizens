import chai from 'chai'
import chaiExclude from 'chai-exclude'
import chaiSubset from 'chai-subset'
import { db, initDB } from '../src/configs/database.config'
import {
  getAllSurveys,
  getSurveyById,
  createSurvey,
  closeSurvey,
  CreateSurveyReqBody,
} from '../src/services/survey.service'
import { unwrap } from './utils'
import Survey from '../src/models/survey.model'
import Question from '../src/models/question.model'
import QuestionOption from '../src/models/questionOption.model'

chai.use(chaiExclude)
chai.use(chaiSubset)

const { expect } = chai

const testSurveyList = [
  {
    surveyId: 'surv-1234-efgh-0000',
    title: 'Encuesta de satisfacción',
    description: 'Encuesta para medir la satisfacción de los clientes',
    endDate: null,
  },
  {
    surveyId: 'surv-5678-abcd-1111',
    title: 'Product Feedback Survey',
    description: 'Survey to gather feedback on our latest product',
    endDate: null,
  },
  {
    surveyId: 'surv-9876-dcba-2222',
    title: 'Employee Engagement Survey',
    description: 'Survey to measure employee engagement in the company',
    endDate: null,
  },
  {
    surveyId: 'surv-5555-efgh-3333',
    title: 'Website Usability Survey',
    description: 'Survey to assess the usability of our website',
    endDate: null,
  },
]

const testSurveyById =   {
  surveyId: 'surv-1234-efgh-0000',
  title: 'Encuesta de satisfacción',
  description: 'Encuesta para medir la satisfacción de los clientes',
  endDate: null,
  questions: [
    {
      questionId: 'ques-1234-efgh-0000',
      questionText: '¿Qué tan satisfecho está con el servicio?',
      questionType: 'scale',
      isRequired: true,
      questionOptions: [],
    },
    {
      questionId: 'ques-1234-efgh-0001',
      questionText: '¿Cómo describiría nuestro servicio?',
      questionType: 'multiple_choice',
      isRequired: true,
      questionOptions: [
        {
          questionOptionId: 'optn-1234-efgh-0000',
          textOption: 'Excelente',
        },
        {
          questionOptionId: 'optn-1234-efgh-0001',
          textOption: 'Bueno',
        },
        {
          questionOptionId: 'optn-1234-efgh-0002',
          textOption: 'Regular',
        },
        {
          questionOptionId: 'optn-1234-efgh-0003',
          textOption: 'Malo',
        },
        {
          questionOptionId: 'optn-1234-efgh-0004',
          textOption: 'Pésimo',
        },
      ],
    },
  ],
}



const testSurvey: CreateSurveyReqBody = {
  title: 'Encuesta de Porta',
  description: 'Encuesta de portaluppi con su portafolio',
  questions: [
    {
      questionText: '¿Qué tan satisfecho está con el servicio?',
      questionType: 'scale',
    },
    {
      questionText: '¿Cómo describiría nuestro servicio?',
      questionType: 'multiple_choice',
      questionOptions: [
        {
          textOption: 'Excelente',
        },
        {
          textOption: 'Bueno',
        },
        {
          textOption: 'Regular',
        },
        {
          textOption: 'Malo',
        },
        {
          textOption: 'Pésimo',
        },
      ],
    },
  ],
}

const attributesToExclude = ['createdAt', 'updatedAt', 'startDate']

beforeEach(async () => {
  await db.drop()
  await initDB()
})

describe('Survey Service', () => {
  it('should return a list of all surveys', async () => {
    const response = await getAllSurveys({ start: 0, pageSize: 10 })
    expect(unwrap(response).rows)
      .excludingEvery(attributesToExclude)
      .to.deep.equal(testSurveyList)
  })

  it('should return a survey by id', async () => {
    const response = await getSurveyById('surv-1234-efgh-0000')
    expect(unwrap(response))
      .excludingEvery(attributesToExclude)
      .to.deep.equal(testSurveyById)
  })

  it('should return null if survey does not exist', async () => {
    const response = await getSurveyById('surv-1234-efgh-0001')
    expect(response).to.be.null
  })

  it('should create a new survey', async () => {
    const response = await createSurvey(testSurvey)
    const surveyDb = await Survey.findByPk(response.surveyId, {
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
    expect(unwrap(surveyDb)).containSubset(testSurvey)
  })

  it('should close a survey giving an endDate to the testSurvey', async () => {
    const response = await createSurvey(testSurvey)
    const closedSurvey = await closeSurvey(response.surveyId)
    expect(closedSurvey?.endDate).to.not.be.null
  })
})
