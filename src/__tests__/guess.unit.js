import { expect, describe, test } from '@jest/globals'
import { educatedGuess } from '../guess.js'
import { Validator, VinValidator, LicensePlateValidator } from '../validators/index.js'

const logger = {
  info: (txt) => { },
  debug: (txt) => { },
  trace: (txt) => { }
}

describe('Get an educated guess for a cars csv', () => {
  test('If it throws an error when a delimiter cannot be found', () => {
    const fileNameCar = './src/__fixtures__/cars.csv'
    const suggestionCar = educatedGuess({
      fileName: fileNameCar,
      logger,
      delimiters: ['|'],
      linesToAnalyze: 3
    })
    expect(suggestionCar).rejects.toThrow('Delimiter cannot be found')
  })

  test('If it works', async () => {
    const domainCar = [
      new VinValidator({ header: 'vin' }),
      new LicensePlateValidator({ header: 'kenteken' }),
      new Validator({
        header: 'dealer',
        dictionary: ['dealer'],
        regex: '^\\d{6}$'
      })
    ]
    const fileNameCar = './src/__fixtures__/cars.csv'

    const suggestionCar = await educatedGuess({
      fileName: fileNameCar,
      domain: domainCar,
      logger
    })

    expect(suggestionCar).toEqual({
      mapping: {
        CHASSISNUMMER: 'vin',
        DEALERNUMMER: 'dealer',
        KENTEKEN: 'kenteken'
      },
      options: {
        delimiter: ';',
        includeColumns: /(CHASSISNUMMER|KENTEKEN|DEALERNUMMER)/
      },
      fileName: fileNameCar
    })
  })
})
