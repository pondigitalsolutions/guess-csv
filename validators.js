const vinval = require('vindec-validator');

/**
 * Validators functions that return true or false for a value
 */

let self = {
    isVin: function(val) {
        return vinval.valid(val);
    },

    isDealer: function(val) {
        return val.match(/^\d{6}$/);
    },
    
    isLicensePlate: function(val) {
        const stripped = val.toUpperCase().replace(/-/g, '');
        let matches = stripped.match(/\d+|\D+/g);
        if (!matches) {
            return false;
        }
        return val.length <= 6 && matches.length<=3 && matches.length > 1; 
    }
};

module.exports = self;
