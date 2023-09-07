import { Survey } from "../models/surveys.model";
import * as SurveysService from "../services/surveys.service";
import { RequestHandler } from "express";
import { NoRecord, Paginator, PaginationParams } from "../utils/RequestResponse";

export const getAllSurveys: RequestHandler<
    NoRecord,
    Paginator<Survey>,
    NoRecord,
    PaginationParams<{ name?: string }>
> = async (req, res) => {
    const params = {
        start: req.query.start || 0,
        pageSize: req.query.pageSize || 10,
        name: req.query.name || '',
    }

    const surveys = await SurveysService.getAllSurveys(params)
    res.json({
        rows: surveys.rows,
        start: params.start,
        pageSize: params.pageSize,
        total: surveys.count,
    })
}

/**
 * @brief
 * Función del controlador que devuelve una encuesta por su id
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con las encuestas y la información de paginación
 */
export const getSurveyById: RequestHandler<
    NoRecord,
    Survey | { message: string },
    NoRecord,
    { surveyId: number }
> = async (req, res) => {
    try {
        const survey = await SurveysService.getSurveyById(req.params.surveyId)
        console.log(survey)
        if (!survey) {
            res.status(404).json({ message: 'Encuesta no se encuentra' })
        } else {
            res.json(survey)
        }
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' })
    }
}
