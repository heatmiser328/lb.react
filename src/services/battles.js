var battles = require('../data/battles.json');
var rules = {
    "auerstaedt": require('../data/auerstaedt.json'),
    "eylau": require('../data/eylau.json'),
    "talavera": require('../data/talavera.json'),
    "albuera": require('../data/albuera.json'),

    "ligny": require('../data/ligny.json'),
    "quatrebras": require('../data/quatrebras.json'),
    "ligny-quatrebras": require('../data/ligny-quatrebras.json'),

    "luetzen": require('../data/luetzen.json'),

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
    battlesByPublisher() {
        /* [
            {
                name: string,
                image: string,
                battles: array
            }
        ]        
        */
        return battles.reduce((a, battle) => {            
            if (!a.find((p) => p.name == battle.publisher)) {
                a.push({
                    name: battle.publisher, 
                    image: battle.publisher,
                    battles: battles.filter((b) => b.publisher == battle.publisher)
                });
            }
            return a;
        }, []).sort((l,r) => {
            const pubIndex = (pub) => {
                pub = pub.toLowerCase();
                if (pub == 'marshal enterprises') {
                    return 0;
                } else if (pub == 'clash of arms') {
                    return 1;
                }
                return 2;
            }            
            const diff = pubIndex(l.name) - pubIndex(r.name);
            if (diff < 0) { return -1; }
            if (diff > 0) { return 1; }
            return 0;
        });
    },
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
