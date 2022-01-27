import Validator from './Validator.js'

export default class NumericValidator extends Validator {
  constructor ({ header, dictionary = [] } = {}) {
    super({ header, dictionary })
  }

  validate (val) {
    if (val.constructor === Number) return true // if its already a number its ok
    if (val.constructor !== String) return false // we only process strings!
    // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    return !isNaN(val) &&
      !isNaN(parseFloat(val)) // ...and ensure strings of whitespace fail
  }
}
