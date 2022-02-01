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

export default class Validator {
  #synonyms
  #regex
  #header

  constructor ({ header, dictionary, regex, flags = '' } = {}) {
    if (regex) {
      this.#regex = new RegExp(regex, flags)
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
    return !!(val.match(this.#regex))
  }
}
