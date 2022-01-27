import dayjs from 'dayjs'
import Validator from './Validator.js'

export default class DateValidator extends Validator {
  constructor ({ header, dictionary = ['date', 'datum'] } = {}) {
    super({ header, dictionary })
  }

  validate (val) {
    if (val.constructor === Number) return false // do not accept timestamps
    const date = dayjs(val)
    return date.isValid()
  }
}
