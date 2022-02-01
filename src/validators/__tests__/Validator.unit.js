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

// Copyright 2021 Pon Holding

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
