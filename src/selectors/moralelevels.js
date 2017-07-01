import { createSelector } from 'reselect';
import getGame from './game';
const getCurrentLevels = (state) => state.current.moralelevels || {};

export default createSelector(
    [getGame,getCurrentLevels],
    (game,currentlevels) => {
      const rules = game.rules||{};
      const morale = rules.morale||{};
      const levels = morale.levels || [];
      return levels.map((l) => {
        let cl = l.levels.find((lvl) => lvl.level == currentlevels[l.formation])||{};
        return {
          name: l.name,
          level: currentlevels[l.formation],
          desc: cl.desc,
          mod: cl.mod
        };
      });
		
    }    
);
