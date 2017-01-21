import { createSelector } from 'reselect';

const getVictoryLevels = (state) => state.game.victory;
const getSide1VP = (state) => state.current.victory['0'];
const getSide2VP = (state) => state.current.victory['1'];

export default createSelector(
    [getVictoryLevels,getSide1VP,getSide2VP],
    (levels,vp1,vp2) => {
		let vp = vp1 - vp2;		
		let v = levels.find((v) => vp >= v.low && vp <= v.high) || {level:''};		
		return v.level;        
    }    
);
