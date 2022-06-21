import { EErrorMessage } from '@/enum'

export const userRegisterValidatorError = (err: any, message?: string) => {
  return {
    code: '1001',
    message: message || `${EErrorMessage.USER_REGISTER_VALIDATOR_ERROR}`,
    result: err || ''
  }
}
