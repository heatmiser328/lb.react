import { createSelector } from 'reselect';
import Phases from '../services/phases';

const getRuleSet = (state) => state.current.ruleset;
const getPhase = (state) => state.current.phase;
const getSubPhase = (state) => state.current.subphase;

export default createSelector(
    [getRuleSet,getPhase,getSubPhase],
    (ruleset,phase,subphase) => {
        return Phases.subget(ruleset,phase,subphase);
    }    
);
