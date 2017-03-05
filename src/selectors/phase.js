import { createSelector } from 'reselect';
import Phases from '../services/phases';

const getRuleSet = (state) => state.current.ruleset;
const getPhase = (state) => state.current.phase;

export default createSelector(
    [getRuleSet,getPhase],
    (ruleset,phase) => {
        return Phases.get(ruleset,phase);
    }    
);
