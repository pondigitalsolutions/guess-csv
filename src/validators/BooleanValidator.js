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

import Validator from './Validator.js'

export default class BooleanValidator extends Validator {
  constructor ({ header, dictionary = [] } = {}) {
    super({ header, dictionary })
  }

  validate (value) {
    if (value.constructor === String) {
      return ['true', 't', 'yes', 'y', 'on', '1', 'x', '0', 'off','n', 'no', 'f', 'false', '-'].includes(
        value.trim().toLowerCase()
      )
    }

    if (value.constructor === Number) {
      return value.valueOf() === 1 || value.valueOf() === 0
    }

    if (value.constructor === Boolean) {
      return value.valueOf() ===  true || value.valueOf() ===  false
    }

    return false
  }
}
