'use strict'

var Odds = require('./odds.js');
var Base6 = require('./base6.js');

var table = [
    {desc:'1:2',value:-2},
    {desc:'1:1',value:1},
    {desc:'1.5:1',value:1.5},
    {desc:'2:1',value:2},
    {desc:'2.5:1',value:2.5},
    {desc:'3:1',value:3},
    {desc:'3.5:1',value:3.5},
    {desc:'4:1',value:4},
    {desc:'4.5:1',value:4.5},
    {desc:'5:1',value:5}
];
var odds = Odds(table);

function calculate(attack, defend) {
    var o = odds.calculate(attack, defend);
    return (o || table[1]).desc;
}

function resolve(o, dice) {
    let idx = table.findIndex((v) => {return v.desc == o;});
    let result = "NE";
    //console.log(o);
    //console.log(idx);
    switch (idx)
    {
        case 0: //1-2
            if (dice <= 14) {
                result = "AR";
            }
            else if (dice <= 34) {
                result = "AD";
            }
            else if (dice == 52) {
                result = "0*/0";
            }
            else if (dice == 53) {
                result = "1/1";
            }
            else if (dice == 54) {
                result = "1/2*";
            }
            else if (dice == 55) {
                result = "0/1";
            }
            else if (dice == 56) {
                result = "1*/0";
            }

            else if (dice == 61) {
                result = "0/2";
            }
            else if (dice == 62) {
                result = "2/1*";
            }
            else if (dice == 63) {
                result = "0/0";
            }
            else if (dice == 64) {
                result = "2/2";
            }

            else if (dice >= 65) {
                result = "DD";
            }
            break;

        case 1:		//1-1
            if 		(dice <= 15) {
                result = "AD";
            }

            else if (dice == 42) {
                result = "2*/1";
            }
            else if (dice == 43) {
                result = "2/1*";
            }
            else if (dice == 44) {
                result = "2/1";
            }
            else if (dice == 45) {
                result = "1*/1";
            }
            else if (dice == 46) {
                result = "1/2";
            }

            else if (dice == 51) {
                result = "1/1";
            }
            else if (dice == 52) {
                result = "0/0*";
            }
            else if (dice == 53) {
                result = "2/1";
            }
            else if (dice == 54) {
                result = "1*/2";
            }
            else if (dice == 55) {
                result = "2/2";
            }
            else if (dice == 56) {
                result = "0/0";
            }

            else if (dice == 61) {
                result = "1/0*";
            }

            else if (dice >= 62) {
                result = "DD";
            }
            break;

        case 2:		//1.5-1
            if 		(dice <= 12) {
                result = "AD";
            }

            else if (dice == 33) {
                result = "1/2";
            }
            else if (dice == 34) {
                result = "0/0";
            }
            else if (dice == 35) {
                result = "1/1";
            }
            else if (dice == 36) {
                result = "2*/0";
            }

            else if (dice == 41) {
                result = "0/1*";
            }
            else if (dice == 42) {
                result = "1/1";
            }
            else if (dice == 43) {
                result = "2/2*";
            }
            else if (dice == 44) {
                result = "3/1";
            }
            else if (dice == 45) {
                result = "0/2";
            }
            else if (dice == 46) {
                result = "2/1";
            }

            else if (dice == 51) {
                result = "1/1*";
            }
            else if (dice == 52) {
                result = "2*/1";
            }

            else if (dice >= 53) {
                result = "DD";
            }
            break;

        case 3:		//2-1
            if 		(dice <= 11) {
                result = "AD";
            }

            else if (dice == 25) {
                result = "0/3";
            }
            else if (dice == 26) {
                result = "1/2";
            }
            else if (dice == 31) {
                result = "2*/1";
            }
            else if (dice == 32) {
                result = "0/0";
            }
            else if (dice == 33) {
                result = "0/1*";
            }
            else if (dice == 34) {
                result = "1/0";
            }
            else if (dice == 35) {
                result = "3/2*";
            }
            else if (dice == 36) {
                result = "1/1";
            }
            else if (dice == 41) {
                result = "2/2*";
            }
            else if (dice == 42) {
                result = "1*/2";
            }
            else if (dice == 43) {
                result = "1*/1";
            }
            else if (dice == 44) {
                result = "0/2*";
            }

            else if (dice >= 45) {
                result = "DD";
            }
            break;

        case 4:		//2.5-1
            if 		(dice == 23) {
                result = "1/4";
            }
            else if (dice == 24) {
                result = "2/3";
            }
            else if (dice == 25) {
                result = "0*/0";
            }
            else if (dice == 26) {
                result = "1/1*";
            }
            else if (dice == 31) {
                result = "2/3*";
            }
            else if (dice == 32) {
                result = "3/3";
            }
            else if (dice == 33) {
                result = "0/1";
            }
            else if (dice == 34) {
                result = "1/0";
            }
            else if (dice == 35) {
                result = "2/2*";
            }

            else if (dice >= 36) {
                result = "DD";
            }
            break;

        case 5:		//3-1
            if 		(dice == 16) {
                result = "0/0*";
            }
            else if (dice == 21) {
                result = "2/3";
            }
            else if (dice == 22) {
                result = "0/2";
            }
            else if (dice == 23) {
                result = "2*/0";
            }
            else if (dice == 24) {
                result = "1/2";
            }
            else if (dice == 25) {
                result = "0/1";
            }
            else if (dice == 26) {
                result = "2*/3";
            }
            else if (dice == 31) {
                result = "1/2*";
            }

            else if (dice >= 65) {
                result = "DR";
            }

            else if (dice >= 32) {
                result = "DD";
            }
            break;

        case 6:		//3.5-1
            if 		(dice == 12) {
                result = "0/0";
            }
            else if (dice == 13) {
                result = "2*/2";
            }
            else if (dice == 14) {
                result = "3/3";
            }
            else if (dice == 15) {
                result = "2/4";
            }
            else if (dice == 16) {
                result = "3/1";
            }
            else if (dice == 21) {
                result = "0/1*";
            }

            else if (dice >= 62) {
                result = "DR";
            }

            else if (dice >= 22) {
                result = "DD";
            }
            break;

        case 7:		//4-1
            if 		(dice == 11) {
                result = "2*/1";
            }
            else if (dice == 12) {
                result = "1/2";
            }
            else if (dice == 13) {
                result = "0/2";
            }
            else if (dice == 14) {
                result = "0/1*";
            }
            else if (dice == 15) {
                result = "1/1*";
            }

            else if (dice >= 56) {
                result = "DR";
            }

            else if (dice >= 16) {
                result = "DD";
            }
            break;

        case 8:		//4.5-1
            if 		(dice == 11) {
                result = "3/2";
            }

            else if (dice >= 66) {
                result = "DS";
            }

            else if (dice >= 42) {
                result = "DR";
            }

            else if (dice >= 12) {
                result = "DD";
            }
            break;

        case 9:		//5-1
            if (dice >= 62) {
                result = "DS";
            }

            else if (dice >= 33) {
                result = "DR";
            }

            else if (dice >= 11) {
                result = "DD";
            }
            break;

        default:
            result = "Blank";
            break;
    }

    return result;
}

module.exports = {
    odds: table.map((o) => {return o.desc;}),
    defaultOdds: table[1].desc,
    calculate: calculate,
    resolve: resolve,
    resolvePossible(dice) {
        let results = [];
        table.map((t) => t.desc).forEach((o) => {
            let result = resolve(o,dice);
            if (result != "NE") {
                results.push({odds: o, result: result});
            }
        });
        return results;
    }
    
};
