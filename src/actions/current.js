import types from '../constants/actionTypes';
import {toast} from './toast';
import Phases from '../services/phases';
import getGame from '../selectors/game';


export const reset = (e) => (dispatch,getState) => {
    const {current} = getState();
    e = e || {id: current.battle, scenario: {id: current.scenario}};

    let data = {
        battle: e.id,
        scenario: e.scenario.id,
        turn: 1,
        phase: 0,
        player: 0
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