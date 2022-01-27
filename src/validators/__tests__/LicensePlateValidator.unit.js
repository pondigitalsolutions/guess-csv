import { expect, describe, test } from '@jest/globals'
import LicensePlateValidator from '../LicensePlateValidator.js'

const validator = new LicensePlateValidator()

describe('Validator Tests', () => {
  test.each([
    ['AA-01', 'string', true],
    [1, 'integer', false],
    [{ a: 42 }, 'object', false],
    ['5-ABC-42', 'string', true],
    ['AA-01-AA', 'string', true],
    ['42-AAA-4', 'string', true],
    ['test', 'string', false],
    ['-', 'string', false],
    ['1-2-3-4', 'string', false]
  ])('Test if the LicensePlateValidator works, %s %s', (a, b, expected) => {
    expect(validator.validate(a)).toEqual(expected)
  })
})
