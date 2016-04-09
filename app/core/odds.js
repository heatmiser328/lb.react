'use strict'

module.exports = (table) => {
    table = table || [];
    return {
        calculate(att, def, shift) {
            shift = shift || 0;
            let attadv = (att >= def);
            let odds = 0;
            if (attadv == true) {
                odds = att / def;
            }
            else {
                odds = def / att;
            }
            /*
            var w = Math.floor(odds);
            var p = odds % 1;
            if (attadv == true) {
                if (p < 0.5) {odds = w;}
                else if (p < 0.75) {odds = w + 0.5;}
                else {odds = w + 1;}
            }
            else {
                if (p > 0 && p <= 0.5) {odds = w + 0.5;}
                else if (p > 0.5) {odds = decimal + 1;}
                else {odds = w;}
            }
            */

            let o = odds * (attadv ? 1 : -1);
            let index = -1;
            for (var i=0; i<table.length; i++) {
                let tableentry = table[i];
                let value = tableentry.value;
                let nextvalue = (i+1 < table.length) ? table[i+1].value : value;

                if ((i+1 == table.length && o >= value) ||
                    (i == 0 && o < value) ||
                    (o >= value && o < nextvalue)) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                index += shift;
                if (index < 0) {
                    index = 0;
                }
                else if (index >= table.length) {
                    index = table.length - 1;
                }
                return table[index];
            }
        }
    };
};
