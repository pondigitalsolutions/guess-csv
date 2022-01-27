export default class Validator {
  #synonyms
  #re
  #header

  constructor ({ header, dictionary, regex, flags = '' } = {}) {
    if (regex) {
      this.#re = new RegExp(regex, flags)
    }
    this.#synonyms = (Array.isArray(dictionary)) ? dictionary : []
    if (header) {
      this.#header = header
      this.#synonyms = [...new Set([...this.#synonyms, this.#header])]
    }
  }

  get header () {
    return this.#header
  }

  get dictionary () {
    return this.#synonyms
  }

  validate (val) {
    return !!(val.match(this.#re))
  }
}
