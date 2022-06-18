import { SchemaDefinition, SchemaOptions } from 'mongoose'

export const assignSchema = (schema: SchemaDefinition) => {
  return Object.assign(schema, {
    createdAt: {
      type: Number,
      default: Date.now
    },
    updatedAt: {
      type: Number,
      default: Date.now
    }
  })
}

export const getTime = () => {
  return Math.floor(Date.now() / 1000)
}

export const setTimestamps = () => {
  const options: SchemaOptions = {
    timestamps: {
      currentTime: () => getTime()
    }
  }
  return options
}
