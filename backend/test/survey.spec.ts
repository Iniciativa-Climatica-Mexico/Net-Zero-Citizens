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

chai.use(chaiExclude)
chai.use(chaiSubset)
chai.use(chaiAsPromised)

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
  userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
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
    const response = await getSurveyById('beaa7b8d-0531-4f24-9a0a-d08900f1f7db')
    expect(unwrap(response))
      .excludingEvery(attributesToExclude.concat('endDate'))
      .to.deep.equal(testSurveyById)
  })

  it('should return null if survey does not exist', async () => {
    const response = await getSurveyById('surv-1234-efgh-0001')
    expect(response).to.be.null
  })

  it('should return a pending survey', async () => {
    const response = await getSurveyPending('8de45630-2e76-4d97-98c2-9ec0d1f3a5b8')
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
