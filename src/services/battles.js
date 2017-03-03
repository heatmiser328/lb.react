var battles = require('../data/battles.json');
var rules = {
    "auerstaedt": require('../data/auerstaedt.json'),
    "eylau": require('../data/eylau.json'),
    "talavera": require('../data/talavera.json'),
    "albuera": require('../data/albuera.json'),

    "vauchamps": require('../data/vauchamps.json'),

    "halle": require('../data/halle.json'),
    "raszyn": require('../data/raszyn.json'),    
    "leipzig": require('../data/leipzig.json'),
    "friedland": require('../data/friedland.json'),
    "neumarkt": require('../data/neumarkt.json'),
    "aspern_essling": require('../data/aspern_essling.json'),
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
