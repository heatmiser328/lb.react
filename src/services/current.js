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
			battle: data.id,
			scenario: data.scenario.id,
			turn: 1,
			phase: 0,
			player: 0,
			victory: {
				"0": 0,
				"1": 0
			}
		};
		
		return store.save(current)
		.then(() => {			
			return current;
		});
	}
};
