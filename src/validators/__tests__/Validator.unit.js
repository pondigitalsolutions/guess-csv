import { expect, describe, test } from '@jest/globals'
import Validator from '../Validator.js'

describe('Validator Tests', () => {
  test('Test if the Validator works', () => {
    const validator = new Validator()
    expect(validator.dictionary).toEqual([])
  })

  test('Test if the Validator works with a header', () => {
    const validator = new Validator({ header: 'test' })
    expect(validator.dictionary).toEqual(['test'])
    expect(validator.header).toEqual('test')
  })

  test('Test if the Validator works with a header and dict', () => {
    const validator = new Validator({ header: 'test', dictionary: ['test', '42'] })
    expect(validator.dictionary).toEqual(['test', '42'])
  })

  test('Test if the Validator works with a regex', () => {
    const validator = new Validator({ regex: '^\\d+$', dictionary: ['test', '42'] })
    expect(validator.dictionary).toEqual(['test', '42'])
    expect(validator.validate('1234')).toEqual(true)
    expect(validator.validate('123test')).toEqual(false)
    expect(validator.validate('test')).toEqual(false)
  })
})
