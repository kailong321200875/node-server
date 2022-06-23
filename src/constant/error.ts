import { EErrorMessage } from '@/enum'

export const userRegisterValidatorError = (message?: string) => {
  return {
    code: '1001',
    message: message || `${EErrorMessage.USER_REGISTER_VALIDATOR_ERROR}`
  }
}

export const userRegisterError = () => {
  return {
    code: '1002',
    message: EErrorMessage.USER_REGISTER_ERROR
  }
}
