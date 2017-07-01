import types from '../constants/actionTypes';
import {toast} from './toast';
import Phases from '../services/phases';
import Maneuver from '../services/maneuver';
import getGame from '../selectors/game';

export const reset = (e) => (dispatch,getState) => {
    const game = getGame(getState());
    const {current} = getState();
    e = e || {id: current.battle, scenario: {id: current.scenario}};
    e.ruleset = current.ruleset;

    const makeMoraleLevels = (levels) => {
        let ml = {};
        if (levels) {
            levels.forEach((l) => {
                ml[l.formation] = 0;
            });
        }
        return ml;
    };

    let data = {
        ruleset: e.ruleset,
        battle: e.id,
        scenario: e.scenario.id,
        turn: 1,
        phase: 0,
        subphase: 0,
        player: 0,
        victory: {
            "0": 0,
            "1": 0
        },
        maneuver: {
            cup: [],
            mu: null
        },
        moralelevels: makeMoraleLevels((game.rules.morale||{}).levels)
    };
    
    dispatch({type: types.SET_CURRENT, value: data});
}

export const prevTurn = () => (dispatch) => {    
    dispatch({type: types.PREV_TURN});
}
export const nextTurn = () => (dispatch,getState) => {    
    const game = getGame(getState());
    dispatch({type: types.NEXT_TURN, value: game.maxturns});
}

export const prevPhase = () => (dispatch,getState) => {    
    const {current} = getState();
    dispatch({type: types.PREV_PHASE, value: Phases.count(current.ruleset)});
}
export const nextPhase = () => (dispatch,getState) => {    
    const {current} = getState();
    const game = getGame(getState());
    dispatch({type: types.NEXT_PHASE, value: {maxphases: Phases.count(current.ruleset), maxturns: game.maxturns, changeplayer: (current.ruleset!=5)}});
}

export const prevSubPhase = () => (dispatch,getState) => {    
    const {current} = getState();
    dispatch({type: types.PREV_SUBPHASE, value: Phases.subcount(current.ruleset,current.phase)});
}
export const nextSubPhase = () => (dispatch,getState) => {    
    const {current} = getState();
    const game = getGame(getState());
    dispatch({type: types.NEXT_SUBPHASE, value: {maxphases: Phases.subcount(current.ruleset,current.phase), maxturns: game.maxturns}});
}

export const nextPlayer = () => (dispatch) => {    
    dispatch({type: types.NEXT_PLAYER});
}

export const setVictory = (side, vp) => (dispatch) => {    
    dispatch({type: types.SET_VICTORY, value: {side: side, value: vp}});
}

export const setRuleSet = (ruleset) => (dispatch) => {    
    dispatch({type: types.SET_RULESET, value: ruleset});
}

export const resetMUCup = () => (dispatch) => {        
    dispatch({type: types.SET_MUCUP, value: Maneuver.reset()});
    dispatch({type: types.SET_MU, value: null});
}

export const addMUToCup = (item) => (dispatch,getState) => {        
    const {current} = getState();
    dispatch({type: types.SET_MUCUP, value: Maneuver.add(item,current.maneuver.cup)});
}

export const removeMUFromCup = (item) => (dispatch,getState) => {        
    const {current} = getState();
    dispatch({type: types.SET_MUCUP, value: Maneuver.remove(item,current.maneuver.cup)});
}

export const drawMUFromCup = (all) => (dispatch,getState) => {        
    const {current} = getState();
    let draw = Maneuver.draw(current.maneuver.cup, all);
    dispatch({type: types.SET_MUCUP, value: draw.cup});
    dispatch({type: types.SET_MU, value: draw.mu});
}

export const setMUCup = (cup) => (dispatch) => {    
    dispatch({type: types.SET_MUCUP, value: cup});
}

export const setMU = (mu) => (dispatch) => {    
    dispatch({type: types.SET_MU, value: mu});
}

export const setMoraleLevel = (formation, level) => (dispatch) => {    
    dispatch({type: types.SET_MORALELEVEL, value: {formation: formation, level: level}});
}
