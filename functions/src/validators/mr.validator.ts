import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ async: false, name: 'mrValidator' })
export class mrValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    if (typeof value === 'string') {
      let valueSplit = value.split(',')

      if (valueSplit.length !== 15) return false // Check if the length of the split string is 15
      if (valueSplit.slice(-1)[0] !== '') return false // Make sure the last element in the list is ''

      // Check if there is a non integer string value in the array
      valueSplit = valueSplit.slice(0, 14)
      return valueSplit.find(split => {
        try {
          parseInt(split)
        } catch (_) {
          return true
        }
      }) === undefined
        ? true
        : false
    }
  }
}
