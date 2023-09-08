import chai from 'chai'
import chaiExclude from 'chai-exclude'
import chaiSubset from 'chai-subset'
import { db, initDB } from '../src/configs/database.config'
import { getSurveyReport } from '../src/services/report.service'

chai.use(chaiExclude)
chai.use(chaiSubset)

const { expect } = chai
const testData = {
  surveyId: 'surv-1234-efgh-0000',
  title: 'Encuesta de satisfacción',
  description: 'Encuesta para medir la satisfacción de los clientes',
  questions: [
    {
      questionId: 'ques-1234-efgh-0000',
      questionText: '¿Qué tan satisfecho está con el servicio?',
      questionType: 'scale',
      answers: [
        {
          answerId: 'answ-1234-efgh-0000',
          userId: 'abcd-1234-efgh-5678',
          scaleValue: 5,
        },
        {
          answerId: 'answ-1234-efgh-0001',
          userId: 'abcd-1234-efgh-5679',
          scaleValue: 4,
        },
      ],
    },
    {
      questionId: 'ques-1234-efgh-0001',
      questionText: '¿Cómo describiria nuestro servicio?',
      questionType: 'multiple_choice',
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
      answers: [
        {
          answerId: 'answ-1234-efgh-0002',
          userId: 'abcd-1234-efgh-5678',
          answerText: 'Excelente',
        },
        {
          answerId: 'answ-1234-efgh-0003',
          userId: 'abcd-1234-efgh-5679',
          answerText: 'Bueno',
        },
      ],
    },
  ],
}

beforeEach(async () => {
  await db.drop()
  await initDB()
})

describe('Report Service', () => {
  it('should return a report of a survey with its questions, options and answers', async () => {
    const survey = await getSurveyReport('surv-1234-efgh-0000')
    expect(survey).containSubset(testData)
  })
})
