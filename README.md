[![Node CI][npm-image]][npm-url] [![Bugs][bugs-image]][bugs-url] [![Code Smells][code-smells-image]][code-smells-url] [![Duplicated Lines (%)][duplicate-lines-image]][duplicate-lines-url] [![Maintainability Rating][maintainability-rate-image]][maintainability-rate-url] [![Reliability Rating][reliability-rate-image]][reliability-rate-url] [![Security Rating][security-rate-image]][security-rate-url] [![Technical Debt][technical-debt-image]][technical-debt-url] [![Vulnerabilities][vulnerabilitiest-image]][vulnerabilitiest-url] [![Quality Gate Status][quality-gate-image]][quality-gate-url] [![Coverage][coverage-image]][coverage-url]

# @pondigitalsolutions/guess-csv

With this package you can make an educated guess for the mapping of a csv file. Without knowing about the headers or data. It will make an educated guess based on the header and the data of the first x lines.

This will help with user uploaded csv's, because you cannot trust the headers (typos, renaming) or the placement of the columns.

## Educated guess
cars.csv
```csv
#; DEALERNUMMER; DEALERNAAM; MERK; CHASSISNUMMER; KENTEKEN; DATUM_IN; DATUM_UIT; REDEN_UIT; OBJECT_STATUS
1;123456;Car Rental;V;1FBHE21H6MHA60929;AB123C;23-1-2018;19-2-2020;scrap;BEEINDIGD
2;456789;Super Rental;A;1G1JC6SH4E4163616;EF456G;19-2-2020;;;Accident
```
usage:
```javascript
import {
  educatedGuess, 
  fetchDatafromCsv,
  VinValidator,
  LicensePlateValidator,
  Validator
 } from '@pondigitalsolutions/guess-csv'

const logger = console
const domain = [
  new VinValidator({ header: 'vin' }),
  new LicensePlateValidator({ header: 'kenteken' }),
  new Validator({
    header: 'dealer',
    dictionary: ['dealer'],
    regex: '^\\d{6}$'
  })
]

const fileName = 'cars.csv'

const suggestion = await educatedGuess({
  fileName,
  domain,
  logger
})
const data = await fetchDatafromCsv(suggestion)
logger.info(data)
```
Running the above code will result in:
```javascript
Delimiter Found: ;
Mapping Suggestion: {"CHASSISNUMMER":"vin","KENTEKEN":"kenteken","DEALERNUMMER":"dealer"}
[
  { dealer: '123456', vin: '1FBHE21H6MHA60929', kenteken: 'AB123C' },
  { dealer: '456789', vin: '1G1JC6SH4E4163616', kenteken: 'EF456G' }
]
```
The domain array is build up from validators. The validators try to find the most likely column which will fit. Based on a dictionary of synonyms, and a data check.

The algorithm will for each header score the strings in the dictionary based on the Levenshtein distance. The data in the column will receive a percentage based on if the validator will succeed on the data. These results will be combined into a score and the best guess will win.

# Validators
Currently their are a few Validators available:
* DateValidator - Checks if the data is date/datetime
* LicensePlateValidator - Checks if the data is a (Dutch) licenseplate
* NumericValidator - Checks if the data is numeric
* StringValidator - Checks if the data is of type string
* VinValidator - Checks for vin numbers (chassisnumbers)
* Validator - The Base validator works with a regex

[npm-url]: https://github.com/pondigitalsolutions/guess-csv/actions/workflows/nodejs.yml
[npm-image]: https://github.com/pondigitalsolutions/guess-csv/actions/workflows/nodejs.yml/badge.svg

[bugs-url]: https://sonarcloud.io/project/issues?id=pondigitalsolutions_guess-csv&resolved=false&types=BUG
[bugs-image]: https://sonarcloud.io/api/project_badges/measure?project=pondigitalsolutions_guess-csv&metric=bugs

[code-smells-url]: https://sonarcloud.io/project/issues?id=pondigitalsolutions_guess-csv&resolved=false&types=CODE_SMELL
[code-smells-image]: https://sonarcloud.io/api/project_badges/measure?project=pondigitalsolutions_guess-csv&metric=code_smells

[duplicate-lines-url]: https://sonarcloud.io/component_measures?id=pondigitalsolutions_guess-csv&metric=duplicated_lines_density&view=list
[duplicate-lines-image]: https://sonarcloud.io/api/project_badges/measure?project=pondigitalsolutions_guess-csv&metric=duplicated_lines_density

[maintainability-rate-url]: https://sonarcloud.io/project/issues?id=pondigitalsolutions_guess-csv&resolved=false&types=CODE_SMELL
[maintainability-rate-image]: https://sonarcloud.io/api/project_badges/measure?project=pondigitalsolutions_guess-csv&metric=sqale_rating

[reliability-rate-url]: https://sonarcloud.io/component_measures?id=pondigitalsolutions_guess-csv&metric=Reliability
[reliability-rate-image]: https://sonarcloud.io/api/project_badges/measure?project=pondigitalsolutions_guess-csv&metric=reliability_rating

[security-rate-url]: https://sonarcloud.io/project/security_hotspots?id=pondigitalsolutions_guess-csv
[security-rate-image]: https://sonarcloud.io/api/project_badges/measure?project=pondigitalsolutions_guess-csv&metric=security_rating

[technical-debt-url]: https://sonarcloud.io/component_measures?id=pondigitalsolutions_guess-csv
[technical-debt-image]: https://sonarcloud.io/api/project_badges/measure?project=pondigitalsolutions_guess-csv&metric=sqale_index

[vulnerabilitiest-url]: https://sonarcloud.io/project/issues?id=pondigitalsolutions_guess-csv&resolved=false&types=VULNERABILITY
[vulnerabilitiest-image]: https://sonarcloud.io/api/project_badges/measure?project=pondigitalsolutions_guess-csv&metric=vulnerabilities

[quality-gate-url]: https://sonarcloud.io/summary/new_code?id=pondigitalsolutions_guess-csv
[quality-gate-image]: https://sonarcloud.io/api/project_badges/measure?project=pondigitalsolutions_guess-csv&metric=alert_status

[coverage-url]: https://sonarcloud.io/component_measures?id=pondigitalsolutions_guess-csv&metric=coverage&view=list
[coverage-image]: https://sonarcloud.io/api/project_badges/measure?project=pondigitalsolutions_guess-csv&metric=coverage
