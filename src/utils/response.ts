import { EResponseCode } from '@/enum'

interface Options<T> {
  message?: string
  error?: any
  result?: IResult<T>
}

export const getResponse = <T = any>(
  key: 'fail' | 'success' | 'error' | 'auth',
  options: Options<T>
): IResponse<T> | null | Error => {
  switch (key) {
    case 'fail':
      return {
        code: EResponseCode.FAIL,
        message: options.message,
        result: ''
      }
    case 'auth':
      return {
        code: EResponseCode.AUTH,
        message: options.message,
        result: ''
      }
    case 'success':
      return {
        code: EResponseCode.SUCCESS,
        message: options.message,
        result: options.result || ''
      }
    case 'error':
      return options.error
    default:
      return null
  }
}
