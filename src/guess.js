import { getFirstDataLines, detectCsvDelimiter, fetchMapping, fetchDatafromCsv } from './analyze.js'
import {
  Validator,
  VinValidator,
  LicensePlateValidator,
  DateValidator,
  NumericValidator,
  StringValidator
} from './validators/index.js'

const educatedGuess = async ({ fileName, linesToAnalyze = 4, domain = [], logger, delimiters = [',', ';', '\t'] }) => {
  const csvData = getFirstDataLines(fileName, linesToAnalyze)
  const delimiter = await detectCsvDelimiter(csvData, delimiters)

  logger.debug(`Delimiter Found: ${delimiter}`)

  const mapping = await fetchMapping(csvData, delimiter, domain)

  logger.debug(`Mapping Suggestion ${JSON.stringify(mapping)}`)

  const includeColumns = new RegExp(`(${Object.keys(mapping).join('|')})`)
  const options = {
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
  DateValidator,
  NumericValidator,
  StringValidator
}
