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
