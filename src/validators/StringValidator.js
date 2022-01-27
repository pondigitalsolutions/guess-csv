import Validator from './Validator.js'

export default class StringValidator extends Validator {
  constructor ({ header, dictionary = [] } = {}) {
    super({ header, dictionary })
  }

  validate (val) {
    return (val.constructor === String)
  }
}
