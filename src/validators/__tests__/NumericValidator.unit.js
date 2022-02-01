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