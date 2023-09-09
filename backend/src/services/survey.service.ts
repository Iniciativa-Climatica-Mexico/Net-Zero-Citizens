import { unwrap } from '../../test/utils'
import Survey from "../models/survey.model";
import { PaginationParams, PaginatedQuery } from "../utils/RequestResponse";

export const getAllSurveys = async <T>(
    params: PaginationParams<T>
): Promise<PaginatedQuery<Survey>> => {
    return await Survey.findAndCountAll({
        limit: params.pageSize,
        offset: params.start,
    })
}

// export const getOpenSurveys = async <T>(
//     params: PaginationParams<T>
// ): Promise<PaginatedQuery<Survey>> => {
//     return await Survey.findAndCountAll({
//         limit: params.pageSize,
//         offset: params.start,
//         where: {
//             isOpen: true
//         }
//     })
// }

export const getSurveyById = async (surveyId: string): Promise<Survey | null> => {
    const s = await Survey.findByPk(surveyId, {
        plain: true,
    })
    return s ? unwrap(s) : null
}

// export const createSurvey = async (survey: Survey): Promise<Survey> => {
//     return await Survey.create(survey)
// }

// export const closeSurvey = async (surveyId: string): Promise<Survey | null> => {
//     const s = await Survey.findByPk(surveyId, {
//         plain: true,
//     })
//     if (s) {
//         s.isOpen = false
//         await s.save()
//     }
//     return s ? unwrap(s) : null
// }

