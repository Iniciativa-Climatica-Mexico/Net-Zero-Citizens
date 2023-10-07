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

/**
 * @brief generic that makes all the properties of an object visible, 
 *        no functional use but helps readability of generic types
 */
export type Prettify<T> = {
  [K in keyof T]: T[K]
}
