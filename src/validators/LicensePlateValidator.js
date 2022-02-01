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