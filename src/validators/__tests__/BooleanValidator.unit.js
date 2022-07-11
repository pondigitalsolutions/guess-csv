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

import { expect, describe, test } from '@jest/globals'
import BooleanValidator from '../BooleanValidator.js'

const validator = new BooleanValidator()

describe('Validator Tests', () => {
  test.each([
    { a: 'test', expected: false },
    { a: 1, expected: true },
    { a: 0, expected: true },
    { a: '1', expected: true },
    { a: { a: 42 }, expected: false },
    { a: 'yes', expected: true },
    { a: 'true', expected: true },
    { a: 'false', expected: true },
    { a: 'y', expected: true },
    { a: 'x', expected: true },
    { a: true, expected: true },
    { a: false, expected: true },
    { a: '-', expected: true },
    { a: 'n', expected: true },
    { a: 'off', expected: true },
    { a: '0', expected: true }

  ])('Test if the DateValidator works, $a', ({ a, expected }) => {
    expect(validator.validate(a)).toEqual(expected)
  })
})
