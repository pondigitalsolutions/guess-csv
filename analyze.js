const csv = require('csvtojson');
const levenshtein = require('fast-levenshtein');
const fs = require('fs')

let self = {
    getFirstDataLines: function(file, maxLineCount) {
        return new Promise((resolve, reject) => {
            // Read only maxLineCount lines
            let stream = fs.createReadStream(file, { 
                    flags: 'r', encoding: 'utf-8', bufferSize: 64 * 1024 });
            let lineCounter = 0;
            let data = '';
            stream.on("data", (moreData) => {
                data += moreData;
                lineCounter += data.split("\n").length - 1;
                if (lineCounter > maxLineCount + 1) {
                    stream.destroy();
                    // Remove invalid last line
                    resolve(data.split('\n').slice(0, maxLineCount));
                }
            });
            stream.on("error", (err) => reject(err));
            stream.on("end", () => resolve(data.split("\n")));
        }).then(lines => lines.join("\n"));
    },
    fetchData: function(fileName, options, mapping) {
        return csv(options)
            .fromFile(fileName)
            .then(obj => obj.map(o => self.rename(o, mapping)));
    },
    rename: function(obj, newKeys) {
        const keyValues = Object.keys(obj).map(key => {
          const newKey = newKeys[key] || key;
          return { [newKey]: obj[key] };
        });
        return Object.assign({}, ...keyValues);
    },
    fetchMapping: function(data, delimiter, obj) {
        return data.then(csvData => {
            return csv({delimiter: delimiter})
                .fromString(csvData)
                .then(json => json.reduce((acc, cur) => {
                        let keys = Object.keys(cur);
                        for(let i = keys.length-1; i>=0; i--) {
                            if(!acc[keys[i]]) acc[keys[i]] = [];
                            acc[keys[i]].push(cur[keys[i]]);
                        }
                        return acc;
                    },{}))
                .then(data => Object.keys(obj).reduce((acc, cur) => {
                        acc[self.calculateBestMatch(cur, obj[cur], data)] = cur;
                        return acc;
                    },{}));
        });
    },
    detectCsvDelimiter: function (data, delimiters = [',', ';', '\t']) {
        return data.then(csvData => {
            return Promise.all(delimiters.map(d => self.delimiterFilter(csvData, d)))
                .then(vals => vals.filter(obj => obj.value == true));
        });  
    },
    delimiterFilter: async function(csvData, delimiter) {
        let rows = await csv({delimiter: delimiter}).fromString(csvData);
        return {delimiter: delimiter, value: rows.some(row => Object.keys(row).length > 1)};
    },
    calculateBestMatch: function(key, obj, data) {
        let result = {};
        if(obj.dictionary) {
            result.distance = self.calculateDistance(key, obj.dictionary, Object.keys(data));
            result.best_result = result.distance.best_result;
        }
        if(obj.data) {
            result.data = self.calculateDataMatches(key, obj.data, data);
            result.best_result = result.distance.best_result;
        }
        if(result.data && result.distance) {
            result.best_result = result.distance.results.map(item => {
                item.percentage = (item.percentage * result.data.results.filter(i => i.key == item.str1)[0].percentage) / 100;
                return item;
            }).sort(self.sort)[0].str1;
        }
        return result.best_result;
    },
    sort: function(a, b) {
        if( a.percentage > b.percentage ) return -1;
        if( a.percentage < b.percentage ) return 1;
        return 0;
    },
    calculateDataMatches: function(key, func, data) {
        let res = {
            results: []
        };
        res.results = Object.keys(data).reduce((acc, cur) => {
            let test = data[cur].map(func);
            acc.push({
                key: cur,
                length: test.length,
                ok: test.filter(d => d).length,
                percentage: (test.filter(d => d).length / test.length) * 100
            });
            return acc;
        }, []);
        res.results.sort(self.sort);
        res.best_result = res.results[0].key;
        return res;
    },
    calculateDistance: function(key, strarr, list) {
        let res = {
            word: key,
            results: []
        };
        strarr = strarr.map(s => s.toLowerCase());

        for(let j = strarr.length - 1; j >= 0; j--) {
            for(let i = list.length - 1; i >= 0; i--) {
                let distance = levenshtein.get(strarr[j], list[i].toLowerCase());
                res.results.push({
                    str0: strarr[j],
                    str1: list[i], 
                    distance: distance, 
                    percentage: (100 - 100 * distance / (strarr[j].length + list[i].length))
                });
            }
        }
        res.results.sort(self.sort);

        res.best_result = res.results[0].str1;

        return res;
    }
};

module.exports = self;