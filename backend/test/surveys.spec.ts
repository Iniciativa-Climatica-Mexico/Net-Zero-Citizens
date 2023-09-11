import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import { getAllSurveys, getSurveyById } from '../src/services/surveys.service'

chai.use(chaiExclude)

const { expect } = chai
const testData = [
    {
        title: 'Encuesta 1',
        description: 'Esta es una encuesta de prueba',
        startDate: new Date('2021-01-01'),
        endDate: new Date('2021-01-01'),
    },
    {
        title: 'Encuesta 2',
        description: 'Luppi estuvo aqui',
        startDate: new Date('2021-01-01'),
        endDate: new Date('2021-01-01'),
    },
    {
        title: 'Encuesta 3',
        description: 'Richie esta programando',
        startDate: new Date('2021-01-01'),
        endDate: new Date('2021-01-01'),
    },
    {
        title: 'Encuesta 4',
        description: 'Cajas murio',
        startDate: new Date('2021-01-01'),
        endDate: new Date('2021-01-01'),
    },
]

const attributeToExclude = [
    'createdAt', 
    'updatedAt',
    'surveyId'
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

        response.rows.forEach((survey, index) => {
            expect(survey.dataValues)
                .excluding(attributeToExclude)
                .to.deep.equal(testData[index])
        })
    })


    it('should return a survey by id', async () => {
        const response = await getSurveyById(1)

        expect(response?.dataValues)
            .excluding(attributeToExclude)
            .to.deep.equal(testData[0])
    })

    it('should return null if survey does not exist', async () => {
        const response = await getSurveyById(999)

        expect(response).to.be.null
    })
})