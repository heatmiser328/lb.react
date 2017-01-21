import { createSelector } from 'reselect';
import Battles from '../services/battles';

const getScenario = (state) => state.current.scenario;

export default createSelector(
    [getScenario],
    (id) => {
        return Battles.scenario(id);
    }    
);
