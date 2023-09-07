import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import { getAllSurveys } from '../src/services/surveys.service'

chai.use(chaiExclude)

const { expect } = chai
const testData = [
    {
        surveyId: 1,
        title: 'Encuesta 1',
        description: 'Encuesta 1',
        startDate: '2021-01-01',
        endDate: '2021-01-01',
    },
    {
        surveyId: 2,
        title: 'Encuesta 2',
        description: 'Encuesta 2',
        startDate: '2021-01-01',
        endDate: '2021-01-01',
    },
    {
        surveyId: 3,
        title: 'Encuesta 3',
        description: 'Encuesta 3',
        startDate: '2021-01-01',
        endDate: '2021-01-01',
    },
    {
        surveyId: 4,
        title: 'Encuesta 4',
        description: 'Encuesta 4',
        startDate: '2021-01-01',
        endDate: '2021-01-01',
    },
]

const attributeToExclude = [
    'createdAt', 
    'updatedAt'
]

beforeEach(async () => {
    await initDB()
})

afterEach(async () => {
    await db.drop()
})

describe('Surveys Service', () => {
    it('should return all surveys', async () => {
        const response = await getAllSurveys({ start: 0, pageSize: 10 })

        response.rows.forEach((row, i) => {
            expect(row.dataValues).excluding(attributeToExclude).to.deep.equal(testData[i])
        })
    })
})