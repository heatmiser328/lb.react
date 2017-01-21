import { createSelector } from 'reselect';
import moment from 'moment';
import getGame from './game';
import TURN_MINS from '../constants/turn';

const getTurn = (state) => state.current.turn;

export default createSelector(
    [getTurn, getGame],
    (turn, game) => {
        if (!game || !game.start) {
            return '';
        }
		let d = moment(new Date(game.start.year, game.start.month-1, game.start.day, game.start.hour, game.start.minute));
		let o = (turn - 1) * TURN_MINS;
		d.add(o, 'minutes');
        return d.format("MMM DD, YYYY HH:mm");
    }    
);
