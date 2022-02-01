import csv from 'csvtojson'
import levenshtein from 'fast-levenshtein'
import * as fs from 'fs'

function getFirstDataLines (file, maxLineCount) {
  return new Promise((resolve, reject) => {
    // Read only maxLineCount lines
    const stream = fs.createReadStream(file, {
      flags: 'r', encoding: 'utf-8', bufferSize: 64 * 1024
    })
    let lineCounter = 0
    let data = ''
    stream.on('data', (moreData) => {
      data += moreData
      lineCounter += data.split('\n').length - 1
      if (lineCounter > maxLineCount + 1) {
        stream.destroy()
        // Remove invalid last line
        resolve(data.split('\n').slice(0, maxLineCount))
      }
    })
    stream.on('error', (err) => reject(err))
    stream.on('end', () => resolve(data.split('\n')))
  }).then(lines => lines.join('\n'))
}

function fetchDatafromCsv ({ fileName, options, mapping }) {
  return csv(options)
    .fromFile(fileName)
    .then(obj => obj.map(o => rename(o, mapping)))
}

function rename (obj, newKeys) {
  const keyValues = Object.keys(obj).map(key => {
    const newKey = newKeys[key] || key
    return { [newKey]: obj[key] }
  })
  return Object.assign({}, ...keyValues)
}

function fetchMapping (inputData, delimiter, obj) {
  return inputData.then(csvData => csv({ delimiter: delimiter })
    .fromString(csvData)
    .then(json => json.reduce((acc, cur) => {
      const keys = Object.keys(cur)
      for (let i = keys.length - 1; i >= 0; i--) {
        if (!acc[keys[i]]) acc[keys[i]] = []
        acc[keys[i]].push(cur[keys[i]])
      }
      return acc
    }, {}))
    .then(data => obj.reduce((acc, validator) => {
      acc[calculateBestMatch(validator, data)] = validator.header
      return acc
    }, {})))
}

function calculateDelimiters (delimiters, csvData) {
  const delimiterTest = delimiters.map(d => delimiterFilter(csvData, d))
  return Promise.all(delimiterTest)
    .then(vals => vals.filter(obj => obj.value === true))
}

function detectCsvDelimiter (inputData, delimiters) {
  return inputData
    .then(csvData => calculateDelimiters(delimiters, csvData))
    .then(d => {
      if (d.length === 0) throw new Error('Delimiter cannot be found')
      return d.pop().delimiter
    })
}

async function delimiterFilter (csvData, delimiter) {
  const rows = await csv({ delimiter: delimiter }).fromString(csvData)
  return { delimiter: delimiter, value: rows.some(row => Object.keys(row).length > 1) }
}

function calculateBestMatch (validator, data) {
  const result = {}
  if (validator.dictionary) {
    result.distance = calculateDistance(validator, Object.keys(data))
    result.best_result = result.distance.best_result
  }
  if (validator.validate) {
    result.data = calculateDataMatches(validator, data)
    result.best_result = result.distance.best_result
  }
  if (result.data && result.distance) {
    result.best_result = result.distance.results.map(item => {
      const percentage = (item.percentage * result.data.results.filter(i => i.key === item.str1)[0].percentage) / 100
      return { ...item, percentage }
    }).sort(sortByPercentage)[0].str1
  }
  return result.best_result
}

function sortByPercentage (a, b) {
  if (a.percentage > b.percentage) return -1
  if (a.percentage < b.percentage) return 1
  return 0
}

function calculateDataMatches (validator, data) {
  const res = {
    results: []
  }
  res.results = Object.keys(data).reduce((acc, cur) => {
    const test = data[cur].map(val => validator.validate(val))
    acc.push({
      key: cur,
      length: test.length,
      ok: test.filter(d => d).length,
      percentage: (test.filter(d => d).length / test.length) * 100
    })
    return acc
  }, [])
  res.results.sort(sortByPercentage)
  res.best_result = res.results[0].key
  return res
}

function calculateDistance (validator, list) {
  const inputArray = validator.dictionary
  const res = {
    word: validator.header,
    synonyms: [...new Set(inputArray.map(s => s.toLowerCase()))],
    results: []
  }

  for (let j = res.synonyms.length - 1; j >= 0; j--) {
    for (let i = list.length - 1; i >= 0; i--) {
      const distance = levenshtein.get(res.synonyms[j], list[i].toLowerCase())
      res.results.push({
        str0: res.synonyms[j],
        str1: list[i],
        distance: distance,
        percentage: (100 - 100 * distance / (res.synonyms[j].length + list[i].length))
      })
    }
  }
  res.results.sort(sortByPercentage)
  res.best_result = res.results[0].str1
  return res
}

export default getFirstDataLines
export {
  getFirstDataLines,
  fetchDatafromCsv,
  fetchMapping,
  detectCsvDelimiter,
  calculateBestMatch,
  rename
}

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