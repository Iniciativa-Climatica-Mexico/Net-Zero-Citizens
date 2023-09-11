import { SurveysModel, Survey } from '../models/surveys.model'
import { PaginatedQuery, PaginationParams } from '../utils/RequestResponse'

/**
 * @brief 
 * Función del servicio que devuelve todas las encuestas de la base de datos
 * @param params Los parámetros de paginación
 * @returns Una promesa con las encuestas y la información de paginación
 */
export const getAllSurveys = async <T>(
    params: PaginationParams<T>
): Promise<PaginatedQuery<Survey>> => {
    return await SurveysModel.findAndCountAll({
        limit: params.pageSize,
        offset: params.start,
    })
}

/**
 * @brief
 * Función del servicio que devuelve una encuesta por su id
 * @param surveyId El id de la encuesta
 * @returns Promise<Surveys | null>
 */
export const getSurveyById = async (surveyId: number): Promise<Survey | null> => {
    return await SurveysModel.findOne({ where: { surveyId: surveyId } })
}

export const createSurvey = async (survey: Survey): Promise<Survey> => {
    return await SurveysModel.create(survey)
}