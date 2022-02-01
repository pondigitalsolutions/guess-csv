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