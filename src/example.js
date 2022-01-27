import { fetchDatafromCsv } from './analyze.js'
import { educatedGuess } from './guess.js'
import { Validator, VinValidator, LicensePlateValidator, NumericValidator, DateValidator, StringValidator } from './validators/index.js'

const logger = console

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
const carData = await fetchDatafromCsv(suggestionCar)
logger.info(carData)

const fileNameBike = './src/__fixtures__/bikes.csv'

const domainBike = [
  new Validator({ header: 'sku', regex: '^[A-Z][0-9]{4}$', dictionary: ['sku', 'model'] }),
  new NumericValidator({ header: 'qty', dictionary: ['quantities', 'quantity', 'qty', 'aantal'] }),
  new NumericValidator({ header: 'battery', dictionary: ['accu', 'battery'] }),
  new DateValidator({ header: 'date' }),
  new StringValidator({ header: 'note' })
]

const suggestionBike = await educatedGuess({
  fileName: fileNameBike,
  domain: domainBike,
  logger
})
const bikeData = await fetchDatafromCsv(suggestionBike)
logger.info(bikeData)
