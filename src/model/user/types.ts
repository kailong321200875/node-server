export interface IUserModel extends ISchemaModel {
  user_name: string
  password: string
  check_password?: string
  is_admin: number
  code?: string | number
  uuid?: string
}
