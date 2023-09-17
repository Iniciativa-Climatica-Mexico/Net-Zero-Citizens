export type NoRecord = Record<string, never>

export type Paginator<T> = {
  rows: T[]
  start: number
  pageSize: number
  total: number
}

export type PaginationParams<T = never> = {
  start?: number
  pageSize?: number
} & T

export type PaginatedQuery<T> = {
  rows: T[]
  count: number
}

export type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>