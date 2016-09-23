'use strict'
var Base6 = require('./base6');

module.exports = {
    check(morale,mod,die1,die2) {
        let moraleDice = Base6.add((die1 * 10) + die2, mod);
        return (moraleDice > morale);
    }
};
