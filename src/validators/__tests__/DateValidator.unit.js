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
