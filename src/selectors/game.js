import { createSelector } from 'reselect';
import Battles from '../services/battles';
import TURN_MINS from '../constants/turn';
import moment from 'moment';

const getBattle = (state) => state.current.battle;
const getScenario = (state) => state.current.scenario;

const maxTurns = (start,end) => {	
    if (!start || !end) {
        return 1;
    }
	let sd = new Date(start.year, start.month-1, start.day, start.hour, start.minute);
	let ed = new Date(end.year, end.month-1, end.day, end.hour, end.minute);
	let diff = moment.duration(ed.getTime() - sd.getTime());
	let mins = (diff.hours()*60) + diff.minutes();
	return (mins / TURN_MINS) + 1;
}

export default createSelector(
    [getBattle,getScenario],
    (battleid,scenarioid) => {
        let battle = Battles.battle(battleid) || {scenarios:[], sides: []};
        let scenario = battle.scenarios.find((s) => s.id === scenarioid) || {};
        return {
            title: battle.name,
            subtitle: scenario.name,
            image: battle.image,
            players: battle.sides,
            start: scenario.start,
            maxturns: maxTurns(scenario.start,scenario.end),
            victory: scenario.victory,                        
            rules: Battles.rules(battleid)
        };
    }    
);