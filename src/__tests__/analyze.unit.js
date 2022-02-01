import { expect, describe, test } from '@jest/globals'
import { getFirstDataLines, fetchDatafromCsv, fetchMapping, detectCsvDelimiter, calculateBestMatch, rename } from '../analyze.js'
import { StringValidator } from '../validators/index.js'

const fileName = 'src/__fixtures__/test.csv'

describe('Test the rename function', () => {
  test('Test the rename function with valid objects', () => {
    const result = rename({ 1: 'data' }, { 1: 'One' })
    expect(result).toEqual({ One: 'data' })
  })
  test('Test the rename function with no valid renaming options', () => {
    const result = rename({ 1: 'data' }, {})
    expect(result).toEqual({ 1: 'data' })
  })
})

describe('Calculate the best match', () => {
  const validator = { dictionary: null, validate: null }
  test('', () => {
    const data = { one: ['42', 'universe'] }
    const result = calculateBestMatch(validator, data)
    expect(result).toEqual(undefined)
  })
})

describe('Get first lines tests', () => {
  test.each([2, 3, 4, 5])('Test if the getFirstDataLines works %d', async (a) => {
    const data = await getFirstDataLines(fileName, a)
    expect(data.split('\n').length).toBe(a)
  })
})

describe('Test the Flow', () => {
  test('Test if the mapping is ok', async () => {
    const domain = [
      new StringValidator({
        header: 'Three',
        dictionary: ['3']
      }),
      new StringValidator({
        header: 'Two',
        dictionary: ['2']
      })
    ]
    const data = getFirstDataLines(fileName, 5)
    const delimiter = await detectCsvDelimiter(data, [',', ';', '\t'])
    expect(delimiter).toBe(',')

    const mapping = await fetchMapping(data, delimiter, domain)
    expect(mapping).toEqual({ 2: 'Two', 3: 'Three' })

    const includeColumns = new RegExp(`(${Object.keys(mapping).join('|')})`)
    const options = {
      includeColumns,
      delimiter
    }
    const processedData = await fetchDatafromCsv({ options, mapping, fileName })
    expect(processedData.constructor).toBe(Array)
    expect(processedData.length).toBe(21)
    expect(Object.keys(processedData[0])).toEqual(['Two', 'Three'])
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