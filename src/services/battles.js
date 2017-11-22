var battles = require('../data/battles.json');
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
    }    
};
