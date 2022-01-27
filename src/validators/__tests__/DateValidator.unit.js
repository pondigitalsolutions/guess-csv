import { expect, describe, test } from '@jest/globals'
import DateValidator from '../DateValidator.js'

const validator = new DateValidator()

describe('Validator Tests', () => {
  test.each([
    ['test', 'string', false],
    [1, 'integer', false],
    [{ a: 42 }, 'object', false],
    ['2022-12-05', 'date', true],
    ['2022-12-05T20:00:00.000Z', 'date', true],
    ['05-12-2022', 'date', true]

  ])('Test if the DateValidator works, %s %s', (a, b, expected) => {
    expect(validator.validate(a)).toEqual(expected)
  })
})
