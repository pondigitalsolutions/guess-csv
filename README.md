# @apiest-pon/guess-csv

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
 } from '@apiest-pon/guess-csv'

const logger = {
  info: (txt) => { console.log(txt) },
  debug: (txt) => { console.log(txt) },
  trace: (txt) => {  }
}
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
