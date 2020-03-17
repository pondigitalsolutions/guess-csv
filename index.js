const analyze = require('./analyze');
const validators = require('./validators');

doSuggestion('./test.csv', 3);

async function doSuggestion(fileName, linesToAnalyze) {
    let csvData = analyze.getFirstDataLines(fileName, linesToAnalyze);
    let delim = await analyze.detectCsvDelimiter(csvData, [',', ';', '\t'])
        .then(d => d.pop().delimiter);

    console.log('Delimiter Found', delim);

    const domain = {
        vin: {
            data: validators.isVin,
            dictionary: ['chassisnummer', 'vin']
        }, 
        kenteken: {
            dictionary: ['registrationnumber', 'kenteken'],
            data: validators.isLicensePlate
        }, 
        dealer:{ 
            dictionary: ['dealer'],
            data: validators.isDealer
        }
    };

    const mapping = await analyze.fetchMapping(csvData, delim, domain);

    console.log('');
    console.log('Mapping Suggestion', mapping);

    let include = new RegExp('('+Object.keys(mapping).join('|')+')');
    let options = {
        includeColumns: include,
        delimiter: delim
    };

    console.log('Proposed Options', options);
    console.log('')

    analyze.fetchData(fileName, options , mapping)
    .then(d => console.log(d));
};
