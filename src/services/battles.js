var battles = require('../data/battles.json');
var rules = {
    "aspern_essling": require('../data/aspern_essling.json'),
    "friedland": require('../data/friedland.json'),
    "halle": require('../data/halle.json'),
    "leipzig": require('../data/leipzig.json'),
    "neumarkt": require('../data/neumarkt.json'),
    "raszyn": require('../data/raszyn.json'),
    "schoengrabern": require('../data/schoengrabern.json'),
	"austerlitz": require('../data/austerlitz.json')
};


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
    },
    rules(battleid) {
        let battle = this.battle(battleid);
        if (battle && battle.image && rules[battle.image]) {
            return rules[battle.image];
        }
        return {};
    }    
};
