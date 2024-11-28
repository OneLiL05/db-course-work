interface Pagination {
  pageSize: number
}

interface HttpError {
  status: number
  message: string
}

interface ResponceMany<T> {
  data: T[]
  meta: Pagination
}

export type { ResponceMany, HttpError }
