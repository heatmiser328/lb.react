'use strict';

var battles = require('../stores/battles.json');

module.exports = {
  battles: battles,
  battle: function(battleid) {
    return battles.find((b,i) => {
      return b.id == battleid;
    }) || {scenarios: []};
  },
  scenario: function(scenarioid) {
    var data = {};
    let battle = battles.find((b,i) => {
      data.scenario = b.scenarios.find((s,i) => {
        return s.id === scenarioid;
      });
      return !!data.scenario;
    });
    if (battle) {
      data.id = battle.id;
      data.name = battle.name;
      data.image = battle.image;

      return data;
    }
  }
};
