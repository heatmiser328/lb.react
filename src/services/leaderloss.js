const leadercasualty = {
    "premier": [
		{"result": "Head", "die": 1, "mortal": true, duration:-1},
		{"result": "Chest", "die": 2, "mortal": true, duration:-1},
		{"result": "Leg", "die": 3, "mortal": false, "duration": 2, "unit": "hours"},
		{"result": "Arm", "die": 4, "mortal": false, "duration": 1, "unit": "hours"},
		{"result": "Capture", "die": 5, "mortal": false, duration:-1},
		{"result": "Flesh", "die": 6, "mortal": false, duration:-1}

    ],
    "fifthed": [
		{"result": "Head", "die": 1, "mortal": true, duration:-1},
		{"result": "Torso", "die": 2, "mortal": true, duration:-1},
		{"result": "Leg", "die": 3, "mortal": false, "duration": 2, "unit": "hours"},
		{"result": "Arm", "die": 4, "mortal": false, "duration": 1, "unit": "hours"},
		{"result": "Stun", "die": 5, "mortal": false, "duration": 1, "unit": "turns"},
		{"result": "Flesh", "die": 6, "mortal": false, "duration": 0}
	]    
};

const get = (ruleset) => {
    switch(ruleset)
    {
        case 1:
        return leadercasualty.premier;
        case 5:
        return leadercasualty.fifthed;
        default:
        break;			
    }
    return [];
}

const duration = (d, d1, d2, u) => {
    if (d <= 0) {
        return '';
    }
    return (d1 + (d > 1 ? d2 : 0)).toString() + ' ' + u + ' out';    
}

module.exports = {
    resolve(ruleset,dice, lossdie, durationdie1, durationdie2, melee) {
    	var loss = melee ? (dice <= 12 || dice >= 64) : (dice >= 64);
        var result = {result: ''};

        if (loss) {
            const casualty = get(ruleset).find((lc) => lc.die == lossdie) || {};
            result = {
                leader: melee && dice <= 12 ? 'A' : 'D',
                result: casualty.result,
                duration: duration(casualty.duration, durationdie1, durationdie2, casualty.unit),
                mortal: casualty.mortal
            };
        }
        return result;
	}
};
