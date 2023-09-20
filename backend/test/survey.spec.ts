import chai from 'chai'
import chaiExclude from 'chai-exclude'
import chaiSubset from 'chai-subset'
import chaiAsPromised from 'chai-as-promised'
import chaiDeepEqualInAnyOrder from 'deep-equal-in-any-order'

import { db, initDB } from '../src/configs/database.config'
import {
  getAllSurveys,
  getSurveyById,
  createSurvey,
  closeSurvey,
  CreateSurveyReqBody,
  getSurveyPending,
  answerSurvey,
} from '../src/services/survey.service'
import { unwrap } from './utils'
import Survey from '../src/models/survey.model'
import Question from '../src/models/question.model'
import QuestionOption from '../src/models/questionOption.model'
import Answer from '../src/models/answer.model'

chai.use(chaiExclude)
chai.use(chaiSubset)
chai.use(chaiAsPromised)
chai.use(chaiDeepEqualInAnyOrder)

const { expect } = chai

const testSurveyList = [
  {
    surveyId: 'beaa7b8d-0531-4f24-9a0a-d08900f1f7db',
    title: 'Encuesta de satisfacción',
    description: 'Encuesta para medir la satisfacción de los clientes',
    endDate: null,
  },
  {
    surveyId: '2d233918-2b99-4a3d-ba43-e69aee89497a',
    title: 'Product Feedback Survey',
    description: 'Survey to gather feedback on our latest product',
    endDate: null,
  },
  {
    surveyId: 'd65281ba-53ff-42ce-b434-8a5915ca5e35',
    title: 'Employee Engagement Survey',
    description: 'Survey to measure employee engagement in the company',
    endDate: null,
  },
  {
    surveyId: '48aca777-4baa-4365-8ca8-ed7ba4d33681',
    title: 'Website Usability Survey',
    description: 'Survey to assess the usability of our website',
    endDate: null,
  },
]

const testSurveyById = {
  surveyId: 'beaa7b8d-0531-4f24-9a0a-d08900f1f7db',
  title: 'Encuesta de satisfacción',
  description: 'Encuesta para medir la satisfacción de los clientes',
  endDate: null,
  questions: [
    {
      questionId: '4f6ba762-60a3-4b64-a5ed-5a54fe534969',
      questionText: '¿Qué tan satisfecho está con el servicio?',
      questionType: 'scale',
      isRequired: true,
      questionOptions: [],
    },
    {
      questionId: 'd5034404-24eb-4eb6-92a0-f39a5a4fe592',
      questionText: '¿Cómo describiría nuestro servicio?',
      questionType: 'multiple_choice',
      isRequired: true,
      questionOptions: [
        {
          questionOptionId: 'e42b3e35-9a57-471a-9868-da23adb93f3d',
          textOption: 'Excelente',
        },
        {
          questionOptionId: '89d38b7a-f75e-481e-b522-f642d38bc87c',
          textOption: 'Bueno',
        },
        {
          questionOptionId: '1fb3772a-6ac7-4609-ab7b-c2777ecad62b',
          textOption: 'Regular',
        },
        {
          questionOptionId: '8e5d10c3-ab64-4ef9-9433-33870e1bbd49',
          textOption: 'Malo',
        },
        {
          questionOptionId: '581ec9c2-5b40-44f5-a9e9-9e1166042506',
          textOption: 'Pésimo',
        },
      ],
    },
  ],
}

const testSurveyPending = {
  surveyId: '48aca777-4baa-4365-8ca8-ed7ba4d33681',
  title: 'Website Usability Survey',
  description: 'Survey to assess the usability of our website',
  endDate: null,
  questions: [
    {
      questionId: 'c96f70e0-c966-4f87-bdd5-184ec7cf0ffa',
      questionText: 'Did you find the website easy to navigate?',
      questionType: 'multiple_choice',
      isRequired: true,
      questionOptions: [
        {
          questionOptionId: '12234887-aac5-437b-b700-40e99161dccd',
          textOption: 'Yes',
        },
        {
          questionOptionId: '54863a53-56e3-479e-8ffd-7943de650a23',
          textOption: 'No',
        },
      ],
    },
    {
      questionId: 'b84348e0-c7bf-4c09-82ce-5366c81d764e',
      questionText: 'What features would you like to see in our product?',
      questionType: 'open',
      isRequired: false,
      questionOptions: [],
    },
    {
      questionId: '3c9dccbb-1b19-49c0-b8e0-170e047a336a',
      questionText:
        'On a scale of 1 to 10, how likely are you to recommend our product?',
      questionType: 'scale',
      questionOptions: [],
      isRequired: true,
    },
    {
      questionId: 'ea067a23-3a46-41a6-b6e4-152aa199535a',
      questionText: '¿Cómo describiría nuestro servicio?',
      questionType: 'multiple_choice',
      isRequired: true,
      questionOptions: [
        {
          questionOptionId: '86d7613d-7633-4156-b596-65f218415c40',
          textOption: 'Excelente',
        },
        {
          questionOptionId: '0c11fa72-2e8c-4310-acdb-fc5e2856793c',
          textOption: 'Bueno',
        },
        {
          questionOptionId: 'd467a0a1-14da-4c5e-a7d8-45b13de95715',
          textOption: 'Regular',
        },
        {
          questionOptionId: 'effa5c3d-2e54-434e-b0f7-300429c07c31',
          textOption: 'Malo',
        },
        {
          questionOptionId: '06329a73-b188-4b77-8ab9-5f783a510807',
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

const testAnswer = {
  surveyId: '48aca777-4baa-4365-8ca8-ed7ba4d33681',
  userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
  answers: [
    {
      questionId: 'c96f70e0-c966-4f87-bdd5-184ec7cf0ffa',
      answerText: 'No',
    },
    {
      questionId: 'b84348e0-c7bf-4c09-82ce-5366c81d764e',
      answerText: 'Hola',
    },
    {
      questionId: '3c9dccbb-1b19-49c0-b8e0-170e047a336a',
      scaleValue: 5,
    },
    {
      questionId: 'ea067a23-3a46-41a6-b6e4-152aa199535a',
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
      .to.deep.equalInAnyOrder(testSurveyList)
  })

  it('should return a survey by id', async () => {
    const response = await getSurveyById('beaa7b8d-0531-4f24-9a0a-d08900f1f7db')
    expect(unwrap(response))
      .excludingEvery(attributesToExclude.concat('endDate'))
      .to.deep.equalInAnyOrder(testSurveyById)
  })

  it('should return null if survey does not exist', async () => {
    const response = await getSurveyById('surv-1234-efgh-0001')
    expect(response).to.be.null
  })

  it('should return a pending survey', async () => {
    const response = await getSurveyPending(
      '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8'
    )
    expect(response)
      .excludingEvery(attributesToExclude)
      .to.deep.equalInAnyOrder(testSurveyPending)
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
