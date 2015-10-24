'use strict';

var battles = require('./battles.json');

module.exports = {
  battles: battles,
  battle: function(battleid) {
    return battles.find((b,i) => {
      return b.id == battleid;
    }) || {scenarios: []};
  },
  scenarios: function(battleid) {
    return this.battle(battleid).scenarios;
  }
};
