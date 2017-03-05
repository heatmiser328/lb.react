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
    e = e || {id: current.battle, scenario: {id: current.scenario}, ruleset: current.ruleset};
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

export const prevPhase = () => (dispatch) => {    
    dispatch({type: types.PREV_PHASE, value: Phases.count});
}
export const nextPhase = () => (dispatch,getState) => {    
    const game = getGame(getState());
    dispatch({type: types.NEXT_PHASE, value: {maxphases: Phases.count, maxturns: game.maxturns}});
}

export const nextPlayer = () => (dispatch) => {    
    dispatch({type: types.NEXT_PLAYER});
}

export const setVictory = (side, vp) => (dispatch) => {    
    dispatch({type: types.SET_VICTORY, value: {side: side, value: vp}});
}

export const setRuleSet = (v) => (dispatch) => {    
    dispatch({type: types.SET_RULESET, value: v});
}


export const resetMUCup = (v) => (dispatch) => {        
    dispatch({type: types.SET_MUCUP, value: Maneuver.reset()});
    dispatch({type: types.SET_MU, value: null});
}

export const addMUToCup = (v) => (dispatch,getState) => {        
    const {current} = getState();
    dispatch({type: types.SET_MUCUP, value: Maneuver.add(v,current.maneuver.cup)});
}

export const removeMUFromCup = (v) => (dispatch,getState) => {        
    const {current} = getState();
    dispatch({type: types.SET_MUCUP, value: Maneuver.remove(v,current.maneuver.cup)});
}

export const drawMUFromCup = (v) => (dispatch,getState) => {        
    const {current} = getState();
    let draw = Maneuver.draw(current.maneuver.cup);        
    dispatch({type: types.SET_MUCUP, value: draw.cup});
    dispatch({type: types.SET_MU, value: draw.mu});
}

export const setMUCup = (v) => (dispatch) => {    
    dispatch({type: types.SET_MUCUP, value: v});
}

export const setMU = (v) => (dispatch) => {    
    dispatch({type: types.SET_MU, value: v});
}
