var Battles = require('./battles.js');
var Phases = require('./phases.js');
var moment = require('moment');
var RNFS = require('react-native-fs');
var FILE = 'lb.app.current';
var PATH = RNFS.DocumentDirectoryPath + '/' + FILE;
var TURN_MINS = 20;

function load() {
	// read the file
	console.log('Load current from ' + PATH);
	return RNFS.readFile(PATH)
	  .then((data) => {
	    if (data) {
				console.log('Current retrieved');
				let current = JSON.parse(data);
				console.log(current);
				return current;
			}
			console.log('No Current battle');
			return null;
	  })
	  .catch((err) => {
	    console.log(err.message);
			return null;
	  });
}

function fetch(current) {
	return new Promise((resolve, reject) => {
		if (current) {
			resolve(current);
		}
		load()
		.then((curr) => {
			resolve(curr);
		})
		.catch((err) => {
			reject(err);
		});
	});
}

function save(current) {
	// write the file
	console.log('Save Current to ' + PATH);
	console.log(current);
	return RNFS.writeFile(PATH, JSON.stringify(current))
	  .then((success) => {
	    console.log('Current saved');
	  })
	  .catch((err) => {
	    console.log(err.message);
	  });
}

function remove() {
	console.log('Remove Current from ' + PATH)
	return RNFS.unlink(PATH)
	  // spread is a method offered by bluebird to allow for more than a
	  // single return value of a promise. If you use `then`, you will receive
	  // the values inside of an array
	  .spread((success, path) => {
	  console.log('FILE DELETED', success, path);
	  })
	  // `unlink` will throw an error, if the item to unlink does not exist
	  .catch((err) => {
	    console.log(err.message);
	  });
}

function reset(data) {
		let current = {};
    current.battle = data.id;
    current.scenario = data.scenario.id;
    current.turn = 1;
    current.phase = 0;
    return save(current)
		.then(() => {
			return current;
		});
}

function maxTurns(current) {
	var gamedata = Battles.scenario(current.scenario);
    var sd = moment({year: gamedata.scenario.start.year, month: gamedata.scenario.start.month-1, day: gamedata.scenario.start.day, hour: gamedata.scenario.start.hour, minute: gamedata.scenario.start.minute});
    var ed = moment({year: gamedata.scenario.end.year, month: gamedata.scenario.end.month-1, day: gamedata.scenario.end.day, hour: gamedata.scenario.end.hour, minute: gamedata.scenario.end.minute});
    var diff = ed.subtract(sd);
    var mins = (diff.hours()*60) + diff.minutes();
    return (mins / TURN_MINS) + 1;
}

module.exports = {
		get: function(data) {
			return load()
			.then((current) => {
				if (!current && data) {
        	current = reset(data);
        }
        return current;
			});
    },
		save: function(current) {
			return save(current);
		},
    reset: function(data) {
			return reset(data)
			.then(() => {
				return load();
			});
    },
		clear: function() {
			return remove();
		},
    phase: function(current) {
			return fetch(current)
			.then((c) => {
				return Phases.get(c.phase);
			})
    },
    prevPhase: function(current) {
			return fetch(current)
			.then((c) => {
				if (--c.phase < 0) {
        	c.phase = Phases.length - 1;
					this.prevTurn(c);
        }
				return save(c)
				.then(() => {
					return this.phase(c);
				});
			});
    },
    nextPhase: function(current) {
			return fetch(current)
			.then((c) => {
				if (++c.phase >= Phases.length) {
        	c.phase = 0;
					this.nextTurn(c);
        }
        return save(c)
				.then(() => {
					return this.phase(c);
				});
			});
    },
    turn: function(current) {
			return fetch(current)
			.then((c) => {
				var gamedata = Battles.findByScenario(c.scenario);
        var d = moment({year: gamedata.scenario.start.year, month: gamedata.scenario.start.month-1, day: gamedata.scenario.start.day, hour: gamedata.scenario.start.hour, minute: gamedata.scenario.start.minute});
        var o = (c.turn - 1) * TURN_MINS;
        d.add(o, 'minutes');
        var str = d.format("MMM DD, YYYY HH:mm A");
				console.log('turn: ' + str);
        return str;
			});
    },
    prevTurn: function(current) {
    	var dosave = !current;
			return fetch(current)
			.then((c) => {
				console.log('prev turn: ' + c.turn);
        if (--c.turn < 1) {
        	c.turn = 1;
        }
        if (dosave) {
        	return save(c)
					.then(() => {
						return c;
					});
        }
				return Promise.resolve(c);
			})
			.then((c) => {
				return this.turn(c);
			});
    },
    nextTurn: function(current) {
    	var dosave = !current;
			return fetch(current)
			.then((c) => {
				console.log('next turn: ' + c.turn);
        var maxturns = maxTurns(c);
				console.log('max turns: ' + maxturns);
        if (++c.turn >= maxturns) {
        	c.turn = maxturns;
        }
				if (dosave) {
        	return save(c)
					.then(() => {
						return c;
					});
        }
				return Promise.resolve(c);
			})
			.then((c) => {
				return this.turn(c);
			});
    }
};
