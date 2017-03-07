import types from '../constants/actionTypes';
import {toast} from './toast';
import Current from '../services/current';
import Battles from '../services/battles';
import Phases from '../services/phases';
import Maneuver from '../services/maneuver';
import getGame from '../selectors/game';

export const load = () => (dispatch) => {
    return Current.load()
    .then((data) => {
        dispatch({type: types.SET_CURRENT, value: data});
        return Battles.scenario(data.scenario);
    })
    .catch((err) => {
        console.error(err);
        toast(err.message || err)(dispatch);
    });
}

export const save = () => (dispatch,getState) => {
    const {current} = getState();
    return Current.save(current)
    //.then(() => {
    //    dispatch({type: types.SET_CURRENT, value: current});
    //})
    .catch((err) => {
        console.error(err);
        toast(err.message || err)(dispatch);
    });
}

export const remove = () => (dispatch) => {
    return Current.remove()
    .then(() => {
        dispatch({type: types.SET_CURRENT, value: {}});
    })
    .catch((err) => {
        console.error(err);
        toast(err.message || err)(dispatch);
    });
}

export const reset = (e) => (dispatch,getState) => {
    const {current} = getState();
    e = e || {id: current.battle, scenario: {id: current.scenario}};
    e.ruleset = current.ruleset;
    return Current.reset(e)
    .then((data) => {
        dispatch({type: types.SET_CURRENT, value: data});
    })
    .catch((err) => {
        console.error(err);
        toast(err.message || err)(dispatch);
    });
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
    dispatch({type: types.NEXT_PHASE, value: {maxphases: Phases.count(current.ruleset), maxturns: game.maxturns}});
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
