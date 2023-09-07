import { SurveysModel, Surveys } from '../models/surveys.model'
import { PaginatedQuery, PaginationParams } from '../utils/RequestResponse'

/**
 * @brief 
 * Función del servicio que devuelve todas las encuestas de la base de datos
 * @param params Los parámetros de paginación
 * @returns Una promesa con las encuestas y la información de paginación
 */
export const getAllSurveys = async <T>(
    params: PaginationParams<T>
): Promise<PaginatedQuery<Surveys>> => {
    return await SurveysModel.findAndCountAll({
        limit: params.pageSize,
        offset: params.start,
    })
}


