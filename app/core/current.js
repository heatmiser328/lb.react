'use strict'

var Battles = require('./battles.js');
var Phases = require('./phases.js');
var log = require('./log.js');
var moment = require('moment');
var RNFS = require('react-native-fs');
var FILE = 'lb.app.current';
var PATH = RNFS.DocumentDirectoryPath + '/' + FILE;
var TURN_MINS = 20;

var _current = null;

function read() {
	// read the file
	log.debug('Load current from ' + PATH);
	return RNFS.readFile(PATH)
	.then((data) => {
		if (data) {
			log.debug('Current retrieved');
			let current = JSON.parse(data);
			log.debug(current);
			return current;
		}
		log.debug('No Current battle');
		return null;
	})
	.catch((err) => {
		log.error(err.message);
		return null;
	});
}

function write() {
	// write the file
	log.debug('Save Current to ' + PATH);
	log.debug(_current);
	return RNFS.writeFile(PATH, JSON.stringify(_current))
	.then((success) => {
		log.debug('Current saved');
	})
	.catch((err) => {
		log.error(err.message);
	});
}

function remove() {
	log.debug('Remove Current from ' + PATH)
	return RNFS.unlink(PATH)
	.then((result) => {
    	_current = null;
    	let success = result[0], path = result[1];
		log.debug('FILE DELETED', success, path);
	})
	// `unlink` will throw an error, if the item to unlink does not exist
	.catch((err) => {
		log.error(err.message);
	});
}

function reset(data) {
	_current = {};
	_current.battle = data.id;
	_current.scenario = data.scenario.id;
	_current.turn = 1;
	_current.phase = 0;
	_current.player = 'imperial';
	return write(_current);
}

function maxTurns() {
	var gamedata = Battles.scenario(_current.scenario);
	var sd = moment({year: gamedata.scenario.start.year, month: gamedata.scenario.start.month-1, day: gamedata.scenario.start.day, hour: gamedata.scenario.start.hour, minute: gamedata.scenario.start.minute});
	var ed = moment({year: gamedata.scenario.end.year, month: gamedata.scenario.end.month-1, day: gamedata.scenario.end.day, hour: gamedata.scenario.end.hour, minute: gamedata.scenario.end.minute});
	var diff = ed.subtract(sd);
	var mins = (diff.hours()*60) + diff.minutes();
	return (mins / TURN_MINS) + 1;
}

module.exports = {
	load: function() {
		return read()
		.then((current) => {
        	_current = current;
			_current.player = _current.player || 'imperial';
            return _current;
		});
	},
	save: function() {
		return write();
	},
	remove: function() {
		return remove();
	},
	reset: function(data) {
		return reset(data);
	},
	turn: function() {
		var gamedata = Battles.scenario(_current.scenario);
		var d = moment({year: gamedata.scenario.start.year, month: gamedata.scenario.start.month-1, day: gamedata.scenario.start.day, hour: gamedata.scenario.start.hour, minute: gamedata.scenario.start.minute});
		var o = (_current.turn - 1) * TURN_MINS;
		d.add(o, 'minutes');
		let str = d.format("MMM DD, YYYY HH:mm");
		log.debug('turn: ' + str);
		return str;
	},
	prevTurn: function(dosave) {
		log.debug('prev turn: ' + _current.turn);
		if (--_current.turn < 1) {
			_current.turn = 1;
		}
        let turn = this.turn();
		if (dosave) {
        	return write()
            .then(() => {
            	return turn;
			});
		}
        return new Promise((resolve, reject) => {
        	resolve(turn);
        });
	},
	nextTurn: function(dosave) {
		log.debug('next turn: ' + _current.turn);
		var maxturns = maxTurns();
		log.debug('max turns: ' + maxturns);
		if (++_current.turn >= maxturns) {
			_current.turn = maxturns;
		}
        let turn = this.turn();
		if (dosave) {
        	return write()
            .then(() => {
            	return turn;
			});
		}
        return new Promise((resolve, reject) => {
        	resolve(turn);
        });
	},
	phase: function() {
		let phase = Phases.get(_current.phase);
		log.debug('phase: ' + phase);
		return phase;
	},
	prevPhase: function() {
		if (--_current.phase < 0) {
			_current.phase = Phases.count - 1;
			if (_current.player == 'imperial') {
				this.prevTurn(false);
				_current.player = 'coalition';
			} else {
				_current.player = 'imperial';
			}
		}
    	return write()
        .then(() => {
        	return this.phase();
		});
	},
	nextPhase: function() {
		if (++_current.phase >= Phases.count) {
			_current.phase = 0;
			if (_current.player == 'coalition') {
				this.nextTurn(false);
				_current.player = 'imperial';
			} else {
				_current.player = 'coalition';
			}
		}
    	return write()
        .then(() => {
        	return this.phase();
		});
	},
	player: function() {
		return _current.player;
	}
};
