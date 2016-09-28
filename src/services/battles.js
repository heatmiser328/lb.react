'use strict';

var battles = require('../stores/battles.json');
var rules = {
    "aspern_essling": require('../stores/aspern_essling.json'),
    "friedland": require('../stores/friedland.json'),
    "halle": require('../stores/halle.json'),
    "leipzig": require('../stores/leipzig.json'),
    "neumarkt": require('../stores/neumarkt.json'),
    "raszyn": require('../stores/raszyn.json'),
    "schoengrabern": require('../stores/schoengrabern.json')
};


module.exports = {
    battles: battles,
    battle(battleid) {
        let battle = battles.find((b,i) => b.id == battleid);
        if (battle && battle.image && rules[battle.image]) {
            return rules[battle.image];
        }
        return {};
    },
    scenario(scenarioid) {
        var data = {};
        let battle = battles.find((b,i) => {
            data.scenario = b.scenarios.find((s,i) => s.id === scenarioid);
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
