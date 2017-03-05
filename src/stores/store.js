import { Store } from 'react-native-nub';
import rootReducer from '../reducers';
/*  the "store" will look like so:
    {
        info: {
            version: string,
            releasedate: datetime
        },
        toast: {
            active: bool,
            message: string,
            duration: integer
        },
        current: { 
            ruleset: int,
            battle: int,
            scenario: int,           
            turn: int,
            phase: int,
            player: int,
            victory: {
                "0": int,
                "1": int
            },
			maneuver: {
				cup: [],
				mu: {}
			}            
        }
    }
*/
const store = Store(rootReducer);

export default store;