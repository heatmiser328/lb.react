import {Repository} from 'react-native-nub';
let store = Repository('lb.app.current');

module.exports = {
	load() {
		return store.load()
		.then((current) => {
        	current = current || {};
			current.player = current.player || 0;
			if (current.player == 'imperial') { current.player = 0;}
			else if (current.player == 'coalition') { current.player = 1;}
			current.victory = current.victory || {"0": 0, "1": 0};
			current.ruleset = current.ruleset || 1;
			current.maneuver = current.maneuver || {cup: [],mu: null};

            return current;
		});
	},
	save(current) {
		return store.save(current);
	},
	remove() {
		return store.remove();
	},
	reset(data) {
		let current = {
			ruleset: data.ruleset,
			battle: data.id,
			scenario: data.scenario.id,
			turn: 1,
			phase: 0,
			player: 0,
			victory: {
				"0": 0,
				"1": 0
			},
			maneuver: {
				cup: [],
				mu: null
			}
		};
		
		return store.save(current)
		.then(() => {			
			return current;
		});
	}
};
