interface Pagination {
  pageSize: number
}

interface ResponceMany<T> {
  data: T[]
  meta: Pagination
}

export type { ResponceMany }
