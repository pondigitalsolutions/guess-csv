import Validator from './Validator.js'

export default class LicensePlateValidator extends Validator {
  constructor ({ header, dictionary = ['registrationnumber', 'kenteken'] } = {}) {
    super({ header, dictionary })
  }

  validate (val) {
    if (val.constructor !== String) return false
    const stripped = val.toUpperCase().replace(/-/g, '')
    const matches = stripped.match(/\d+|\D+/g)

    if (!matches) {
      return false
    }
    return stripped.length <= 6 && matches.length <= 3 && matches.length > 1
  }
}
