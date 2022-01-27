import { expect, describe, test } from '@jest/globals'
import StringValidator from '../StringValidator.js'

const validator = new StringValidator()

describe('Validator Tests', () => {
  test.each([['test', 'string', true], [1, 'integer', false], [{ a: 42 }, 'object', false]])('Test if the StringValidator works, %s %s', (a, b, expected) => {
    expect(validator.validate(a)).toEqual(expected)
  })
})
