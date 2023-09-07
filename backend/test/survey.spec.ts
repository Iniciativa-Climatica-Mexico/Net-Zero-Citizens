import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import Survey from '../src/models/survey.model'

chai.use(chaiExclude)

const { expect } = chai

beforeEach(async () => {
  await initDB()
})

afterEach(async () => {
  await db.drop()
})

describe('Survey model', () => {
  it('should return a survey', async () => {
    const survey = await Survey.findOne({
      where: { title: 'Encuesta de satisfacción' },
      include: ['questions'],
    })

    expect(unwrap(survey))
      .excludingEvery([
        'createdAt',
        'updatedAt',
        'startDate',
        'endDate',
        'questionId',
        'surveyId',
      ])
      .to.deep.equal({
        title: 'Encuesta de satisfacción',
        description: 'Encuesta para medir la satisfacción de los clientes',
        questions: [
          {
            questionText: '¿Qué tan satisfecho está con el servicio?',
            questionType: 'scale',
          },
        ],
      })
  })
})
const unwrap = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}
