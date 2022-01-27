import { expect, describe, test } from '@jest/globals'
import VinValidator from '../VinValidator.js'

const validator = new VinValidator()

describe('Validator Tests', () => {
  test.each([
    ['1G1JC6SH4E4163616', 'string', true],
    [1, 'integer', false],
    [{ a: 42 }, 'object', false],
    ['test', 'object', false]
  ])('Test if the VinValidator works, %s %s', (a, b, expected) => {
    expect(validator.validate(a)).toEqual(expected)
  })
})
