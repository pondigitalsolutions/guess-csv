import { expect, describe, test } from '@jest/globals'
import NumericValidator from '../NumericValidator.js'

const validator = new NumericValidator()

describe('Validator Tests', () => {
  test.each([
    ['test', 'string', false],
    ['1', 'string', true],
    ['1.42', 'string', true],
    ['1e42', 'string', true],
    [1, 'integer', true],
    [{ a: 42 }, 'object', false]
  ])('Test if the NumericValidator works, %s %s', (a, b, expected) => {
    expect(validator.validate(a)).toEqual(expected)
  })
})
