'use strict'

var RNFS = require('react-native-fs');
var FILE = 'lb.app.current';
var PATH = RNFS.DocumentDirectoryPath + '/' + FILE;
var log = require('../services/log.js');

function reset(data) {
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
	load() {
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
			log.warn(err.message);
			return null;
		});
	},
	save(current) {
		// write the file
		log.debug('Save Current to ' + PATH);
		log.debug(current);
		return RNFS.writeFile(PATH, JSON.stringify(current))
		.then((success) => {
			log.debug('Current saved');
		})
		.catch((err) => {
			log.warn(err.message);
		});
	},
	remove() {
		log.debug('Remove Current from ' + PATH)
		return RNFS.unlink(PATH)
		.then((result) => {
	    	let success = result[0], path = result[1];
			log.debug('FILE DELETED', success, path);
		})
		// `unlink` will throw an error, if the item to unlink does not exist
		.catch((err) => {
			log.warn(err.message);
		});
	},
	reset(data) {
		let current = {};
		current.battle = data.id;
		current.scenario = data.scenario.id;
		current.turn = 1;
		current.phase = 0;
		current.player = 'imperial';
		return this.save(current)
		.then(() => {
			return current;
		});
	}
};
