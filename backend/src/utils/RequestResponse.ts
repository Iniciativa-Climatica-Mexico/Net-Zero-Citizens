export type NoRecord = Record<string, never>

export class Paginator<T> {
  constructor(
    public rows: T[],
    public start: number,
    public pageSize: number,
    public total: number
  ) {}
}

export type PaginationParams<T = never> = {
  start?: number
  pageSize?: number
  filters?: T
}

export type PaginatedQuery<T> = {
  rows: T[]
  count: number
}
