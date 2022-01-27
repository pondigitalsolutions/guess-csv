import vinval from 'vindec-validator'
import Validator from './Validator.js'

export default class VinValidator extends Validator {
  constructor ({ header, dictionary = ['chassisnummer', 'vin'] } = {}) {
    super({ header, dictionary })
  }

  validate (val) {
    if (val.constructor !== String) return false
    return vinval.valid(val)
  }
}
