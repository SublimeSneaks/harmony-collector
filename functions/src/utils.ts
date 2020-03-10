import { classToPlain } from 'class-transformer'

export function serializeType<T>(object: T) {
  return function() {
    return object
  }
}

export function transformType<T>(object: T) {
  return function() {
    classToPlain(object)
  }
}
