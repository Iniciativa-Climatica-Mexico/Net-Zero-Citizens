import { Query, Send } from 'express-serve-static-core'

export type NoQueryParams = Record<string, never>

export type NoBody = Record<string, never>

export interface TypedRequest<T extends Query, U> extends Express.Request {
  body: U
  query: T
}

export interface TypedResponse<ResBody> extends Express.Response {
  json: Send<ResBody, this>
}
