declare type ISchemaModel<T = any> = {
  // _id?: string
  createdAt?: number
  updatedAt?: number
  [key: string]: any
} & T

// declare interface ISchemaModel<T = any> extends T {
//   _id?: string
//   createdAt?: number
//   updatedAt?: number
//   [key: string]: any
// }
