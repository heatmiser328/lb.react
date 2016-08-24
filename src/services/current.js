'use strict'

var Store = require('../stores/current');
var Battles = require('./battles.');
var Phases = require('./phases');
var log = require('./log.js');
var moment = require('moment');
var TURN_MINS = 20;

var _current = {};

let maxTurns = () => {
	var gamedata = Battles.scenario(_current.scenario);
	var sd = moment({year: gamedata.scenario.start.year, month: gamedata.scenario.start.month-1, day: gamedata.scenario.start.day, hour: gamedata.scenario.start.hour, minute: gamedata.scenario.start.minute});
	var ed = moment({year: gamedata.scenario.end.year, month: gamedata.scenario.end.month-1, day: gamedata.scenario.end.day, hour: gamedata.scenario.end.hour, minute: gamedata.scenario.end.minute});
	var diff = ed.subtract(sd);
	var mins = (diff.hours()*60) + diff.minutes();
	return (mins / TURN_MINS) + 1;
}

module.exports = {
	load() {
		return Store.load()
		.then((current) => {
        	_current = current || {};
			_current.player = _current.player || 'imperial';
            return _current;
		});
	},
	save() {
		return Store.save(_current);
	},
	remove() {
		return Store.remove()
		.then(() => {
			_current = null;
		});
	},
	reset(data) {
		return Store.reset(data)
		.then((current) => {
			_current = current;
			return _current;
		});
	},
	turn() {
		var gamedata = Battles.scenario(_current.scenario);
		var d = moment({year: gamedata.scenario.start.year, month: gamedata.scenario.start.month-1, day: gamedata.scenario.start.day, hour: gamedata.scenario.start.hour, minute: gamedata.scenario.start.minute});
		var o = (_current.turn - 1) * TURN_MINS;
		d.add(o, 'minutes');
		let str = d.format("MMM DD, YYYY HH:mm");
		log.debug('turn: ' + str);
		return str;
	},
	prevTurn(dosave) {
		log.debug('prev turn: ' + _current.turn);
		if (--_current.turn < 1) {
			_current.turn = 1;
		}
        let turn = this.turn();
		if (dosave) {
        	return this.save()
            .then(() => {
            	return turn;
			});
		}
        return new Promise((resolve, reject) => {
        	resolve(turn);
        });
	},
	nextTurn(dosave) {
		log.debug('next turn: ' + _current.turn);
		var maxturns = maxTurns();
		log.debug('max turns: ' + maxturns);
		if (++_current.turn >= maxturns) {
			_current.turn = maxturns;
		}
        let turn = this.turn();
		if (dosave) {
        	return this.save()
            .then(() => {
            	return turn;
			});
		}
        return new Promise((resolve, reject) => {
        	resolve(turn);
        });
	},
	phase() {
		let phase = Phases.get(_current.phase);
		log.debug('phase: ' + phase);
		return phase;
	},
	prevPhase() {
		if (--_current.phase < 0) {
			_current.phase = Phases.count - 1;
			if (_current.player == 'imperial') {
				this.prevTurn(false);
				_current.player = 'coalition';
			} else {
				_current.player = 'imperial';
			}
		}
    	return this.save()
        .then(() => {
        	return this.phase();
		});
	},
	nextPhase() {
		if (++_current.phase >= Phases.count) {
			_current.phase = 0;
			if (_current.player == 'coalition') {
				this.nextTurn(false);
				_current.player = 'imperial';
			} else {
				_current.player = 'coalition';
			}
		}
    	return this.save()
        .then(() => {
        	return this.phase();
		});
	},
	nextPlayer() {
		if (_current.player == 'coalition') {
			_current.player = 'imperial';
		} else {
			_current.player = 'coalition';
		}
		return this.save()
        .then(() => {
        	return this.player();
		});
	},
	player() {
		return _current.player;
	}
};
