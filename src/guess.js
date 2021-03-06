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

import { getFirstDataLines, detectCsvDelimiter, fetchMapping, fetchDatafromCsv } from './analyze.js'
import {
  Validator,
  VinValidator,
  LicensePlateValidator,
  DateValidator,
  NumericValidator,
  BooleanValidator,
  StringValidator
} from './validators/index.js'

const educatedGuess = async ({ fileName, linesToAnalyze = 4, domain = [], logger, delimiters = [',', ';', '\t'], csvOptions = { flatKeys: true } }) => {
  const csvData = getFirstDataLines(fileName, linesToAnalyze)
  const delimiter = await detectCsvDelimiter(csvData, delimiters, csvOptions)

  logger.debug(`Delimiter Found: ${delimiter}`)

  const mapping = await fetchMapping(csvData, delimiter, domain, csvOptions)

  logger.debug(`Mapping Suggestion ${JSON.stringify(mapping)}`)

  const includeColumns = new RegExp(`(${Object.keys(mapping).map(k => `^${k}$`).join('|')})`)
  const options = {
    ...csvOptions,
    includeColumns,
    delimiter
  }
  logger.trace('Proposed Options:')
  logger.trace(options)
  return { options, mapping, fileName }
}

export default educatedGuess
export {
  educatedGuess,
  getFirstDataLines,
  detectCsvDelimiter,
  fetchMapping,
  fetchDatafromCsv,
  Validator,
  VinValidator,
  LicensePlateValidator,
  BooleanValidator,
  DateValidator,
  NumericValidator,
  StringValidator
}
