import * as DummyService from '../services/dummy.service'
import { NoRecord, Paginator, PaginationParams } from '../utils/RequestResponse'
import { RequestHandler } from 'express'
import Dummy from '../models/dummy.model'
// export const getGreeting = async (
//   req: TypedRequest<{ name: string }, NoBody>,
//   res: TypedResponse<{ greeting: string }>
// ) => {
//   const { name } = req.body
//   const greeting = await DummyService.getGreeting(name)
//   res.json({ greeting })
// }

export const getGreeting: RequestHandler<
  { name: string }, // UrlParams "path/to/:param" => { param: string }
  { greeting: string }, // Response "application/json" => { greeting: string }
  NoRecord, // Body "application/json" => { name: string }
  NoRecord // QueryParams "path/to?param=value" => { param: string }
  // Si un campo no se usa, poner como NoRecord
> = async (req, res) => {
  const { name } = req.params
  const greeting = await DummyService.getGreeting(name)
  res.json({ greeting })
}

export const getAllDummys: RequestHandler<
  NoRecord,
  Paginator<Dummy>,
  NoRecord,
  PaginationParams<{ name?: string }>
> = async (req, res) => {
  const params = {
    start: req.query.start || 0,
    pageSize: req.query.pageSize || 1000,
    name: req.query.name || '',
  }
  const dummys = await DummyService.getAllDummys(params)
  res.json({
    rows: dummys.rows,
    start: params.start,
    pageSize: params.pageSize,
    total: dummys.count,
  })
}
