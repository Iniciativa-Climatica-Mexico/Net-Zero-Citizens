import { Surveys } from "../models/surveys.model";
import * as SurveysService from "../services/surveys.service";
import { RequestHandler } from "express";
import { NoRecord, Paginator, PaginationParams } from "../utils/RequestResponse";

export const getAllSurveys: RequestHandler<
    NoRecord,
    Paginator<Surveys>,
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

