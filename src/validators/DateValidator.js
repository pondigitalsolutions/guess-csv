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
