declare interface IResponse<T = any> {
  code?: string
  message?: string
  result?: IResult<T> | IPageResult<T> | string
  error?: Error
}

declare interface IResult<T = any> {
  data: T
}

declare interface IPageResult<T> extends IResult<T> {
  pageNumber: number
  pageSize: number
  total: number
}
