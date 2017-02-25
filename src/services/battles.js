var battles = require('../data/battles.json');
module.exports = {
    battles: battles,
    battle(battleid) {
        return battles.find((b,i) => b.id == battleid) || {scenarios:[]};
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
            data.sides = battle.sides || ['imperial','coalition'];

            return data;
        }
    }    
};
