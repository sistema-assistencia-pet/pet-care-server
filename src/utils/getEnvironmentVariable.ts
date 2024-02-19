import { EnvironmentVariableError } from '../errors'

export const getEnvironmentVariable = (name: string): string => {
  const value = process.env[name]

  if (value === undefined || value === '') {
    throw new EnvironmentVariableError(name)
  }

  return value
}
