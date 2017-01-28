'use strict'

module.exports = {
    resolve(dice, lossdie, durationdie1, durationdie2, melee) {
    	var loss = melee ? (dice <= 12 || dice >= 64) : (dice >= 64);
        var result = {result: ''};

        if (loss) {
            result = {
                leader: melee && dice <= 12 ? 'A' : 'D',
                result: '',
                duration: '',
                mortal: false
            };
            if (lossdie == 1) {
            	result.result = 'Head';
                result.mortal = true;
            }
            else if (lossdie == 2) {
            	result.result = 'Chest';
                result.mortal = true;
            }
            else if (lossdie == 3) {
            	var duration = durationdie1 + durationdie2;
            	result.result = 'Leg';
                result.duration = duration + ' hours out';
            }
            else if (lossdie == 4) {
            	var duration = durationdie1;
            	result.result = 'Arm'
                result.duration = duration + ' hours out';
            }
            else if (lossdie == 5) {
            	result.result = 'Capture';
            }
            else {//if (lossdie == 6) {
            	result.result = 'Flesh Wound';
            }
        }
        return result;
	}
};
