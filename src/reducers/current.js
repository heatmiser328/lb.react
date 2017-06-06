import {REHYDRATE} from 'react-native-nub';
import types from '../constants/actionTypes';

const defaultState = {
    ruleset: 1,
    battle: -1,
    current: -1,
    turn: 1,
    phase: 0,
    player: 0,
    victory: {
        "0": 0,
        "1": 0
    },
    maneuver: {
        mu: null,
        cup: []
    }
};

const prevTurn = (t) => {    
    if (--t < 1) { t = 1; }
    return t;    
}
const nextTurn = (t,m) => {    
    if (++t > m) { t = m; }
    return t;    
}

module.exports = (state = defaultState, action) => {
    switch (action.type) {
    case REHYDRATE:
        if (action.payload.current) {
            let s = {
                ...state,
                ...action.payload.current
            };        	
			s.player = s.player || 0;
			if (s.player == 'imperial') { s.player = 0;}
			else if (s.player == 'coalition') { s.player = 1;}
			s.victory = s.victory || {"0": 0, "1": 0};
			s.ruleset = s.ruleset || 1;
			s.maneuver = s.maneuver || {cup: [],mu: null};
                        
            return s;
        }
        return state;

    case types.SET_CURRENT:
        return {
            ...action.value
        };

    case types.SET_RULESET:    
        return {
            ...state,
            ruleset: action.value            
        };

    case types.SET_MUCUP:    
        return {
            ...state,
            maneuver: {
                ...state.maneuver,
                cup: action.value
            }            
        };

    case types.SET_MU:
        return {
            ...state,
            maneuver: {
                ...state.maneuver,
                mu: action.value
            }            
        };

    case types.PREV_TURN:        
        return {
            ...state,
            turn: prevTurn(state.turn)
        };

    case types.NEXT_TURN:
        return {
            ...state,
            turn: nextTurn(state.turn, action.value)
        };
    
    case types.PREV_PHASE:
        let phase = state.phase - 1;
        let player = state.player;
        let turn = state.turn;
		if (phase < 0) {
			phase = action.value - 1;
            if (action.value.changeplayer) {
                if (player == 0) {
                    turn = prevTurn(state.turn);
                    player = 1;
                } else {
                    player = 0;
                }
            } else {
                turn = prevTurn(state.turn);
            }
		}
        return {
            ...state,
            turn: turn,
            phase: phase,
            player: player
        };           

    case types.NEXT_PHASE:
        phase = state.phase + 1;
        player = state.player;
        turn = state.turn;
		if (phase >= action.value.maxphases) {
			phase =  0;
            if (action.value.changeplayer) {            
                if (player == 1) {
                    turn = nextTurn(state.turn,action.value.maxturns);
                    player = 0;
                } else {
                    player = 1;
                }
            } else {
                turn = nextTurn(state.turn,action.value.maxturns);
            }
		}
        return {
            ...state,
            turn: turn,
            phase: phase,
            player: player
        };
        
    case types.NEXT_PLAYER:
        return {
            ...state,
            player: state.player == 0 ? 1 : 0
        };
    
    case types.SET_VICTORY:    
        return {
            ...state,
            victory: {
                ...state.victory,
                [action.value.side]: action.value.value
            }
        };

    default:
        return state;
    }
}
