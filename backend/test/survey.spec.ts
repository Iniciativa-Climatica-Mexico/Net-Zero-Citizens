import chai from 'chai'
import chaiExclude from 'chai-exclude'
import chaiSubset from 'chai-subset'
import chaiAsPromised from 'chai-as-promised'
import { db, initDB } from '../src/configs/database.config'
import {
  getAllSurveys,
  getSurveyById,
  createSurvey,
  closeSurvey,
  CreateSurveyReqBody,
  getSurveyPending,
  answerSurvey,
  FullAnswers,
} from '../src/services/survey.service'
import { unwrap } from './utils'
import Survey from '../src/models/survey.model'
import Question from '../src/models/question.model'
import QuestionOption from '../src/models/questionOption.model'
import Answer from '../src/models/answer.model'
import { create } from 'domain'

chai.use(chaiExclude)
chai.use(chaiSubset)
chai.use(chaiAsPromised)

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

const testSurveyById = {
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

const testSurveyPending = {
  surveyId: 'surv-5555-efgh-3333',
  title: 'Website Usability Survey',
  description: 'Survey to assess the usability of our website',
  endDate: null,
  questions: [
    {
      questionId: 'ques-5555-efgh-3330',
      questionText: 'Did you find the website easy to navigate?',
      questionType: 'multiple_choice',
      isRequired: true,
      questionOptions: [
        {
          questionOptionId: 'optn-5555-efgh-3330',
          textOption: 'Yes',
        },
        {
          questionOptionId: 'optn-5555-efgh-3331',
          textOption: 'No',
        },
      ],
    },
    {
      questionId: 'ques-5678-abcd-3331',
      questionText: 'What features would you like to see in our product?',
      questionType: 'open',
      isRequired: false,
      questionOptions: [],
    },
    {
      questionId: 'ques-5678-abcd-3332',
      questionText:
        'On a scale of 1 to 10, how likely are you to recommend our product?',
      questionType: 'scale',
      questionOptions: [],
      isRequired: true,
    },
    {
      questionId: 'ques-1234-efgh-3333',
      questionText: '¿Cómo describiría nuestro servicio?',
      questionType: 'multiple_choice',
      isRequired: true,
      questionOptions: [
        {
          questionOptionId: 'optn-1234-efgh-3332',
          textOption: 'Excelente',
        },
        {
          questionOptionId: 'optn-1234-efgh-3333',
          textOption: 'Bueno',
        },
        {
          questionOptionId: 'optn-1234-efgh-3334',
          textOption: 'Regular',
        },
        {
          questionOptionId: 'optn-1234-efgh-3335',
          textOption: 'Malo',
        },
        {
          questionOptionId: 'optn-1234-efgh-3336',
          textOption: 'Pésimo',
        },
      ],
    },
  ],
}

const testCreateSurvey: CreateSurveyReqBody = {
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

const testAnswer: FullAnswers = {
  surveyId: 'surv-5555-efgh-3333',
  userId: 'abcd-1234-efgh-5678',
  answers: [
    {
      questionId: 'ques-5555-efgh-3330',
      answerText: 'No',
    },
    {
      questionId: 'ques-5678-abcd-3331',
      answerText: 'Hola',
    },
    {
      questionId: 'ques-5678-abcd-3332',
      scaleValue: 5,
    },
    {
      questionId: 'ques-1234-efgh-3333',
      answerText: 'Bueno',
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
      .excludingEvery(attributesToExclude.concat('endDate'))
      .to.deep.equal(testSurveyList)
  })

  it('should return a survey by id', async () => {
    const response = await getSurveyById('surv-1234-efgh-0000')
    expect(unwrap(response))
      .excludingEvery(attributesToExclude.concat('endDate'))
      .to.deep.equal(testSurveyById)
  })

  it('should return null if survey does not exist', async () => {
    const response = await getSurveyById('surv-1234-efgh-0001')
    expect(response).to.be.null
  })

  it('should return a pending survey', async () => {
    const response = await getSurveyPending('abcd-1234-efgh-5678')
    expect(response)
      .excludingEvery(attributesToExclude)
      .to.deep.equal(testSurveyPending)
  })

  it('should create a new survey', async () => {
    const response = await createSurvey(testCreateSurvey)
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
    expect(unwrap(surveyDb)).containSubset(testCreateSurvey)
  })

  it('should close a survey giving an endDate to the testSurvey', async () => {
    const response = await createSurvey(testCreateSurvey)
    const closedSurvey = await closeSurvey(response.surveyId)
    expect(closedSurvey?.endDate).to.not.be.null
  })
})

describe('Answer Service', () => {
  it('should throw if survey is closed', async () => {
    await closeSurvey(testAnswer.surveyId)
    expect(answerSurvey(testAnswer)).to.be.rejectedWith('Survey is closed')
  })

  it('should throw if user has already answered the survey', async () => {
    await answerSurvey(testAnswer)
    expect(answerSurvey(testAnswer)).to.be.rejectedWith(
      'User has already answered the survey'
    )
  })

  it('should create an answer to a survey', async () => {
    await answerSurvey(testAnswer)
    const answerDb = await Answer.findAll({
      where: {
        userId: testAnswer.userId,
      },
    })
    console.log(unwrap(answerDb))
    expect(unwrap(answerDb))
      .excludingEvery(attributesToExclude)
      .containSubset(testAnswer.answers)
  })
})
