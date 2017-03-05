let phases = {
	basic: [

	],
	premier: [
		"Command",
		"Charge a Cheval",
		"Movement",
		"Defensive Fire",
		"Offensive Fire",
		"Assault/Melee",
		"Rally",
		"Rout",
		"Readiness Recovery"
	],
	fifthed: [
		"Command",		
		"Maneuver",
		"Combat",
		"Reorganization"
	]
};

module.exports = {	
	all(ruleset) {
		switch(ruleset)
		{
			case 1:
			return phases.premier;
			case 5:
			return phases.fifthed;
			default:
			break;			
		}
    	return phases.basic;
    },
    count(ruleset) {
		return this.all(ruleset).length;
    },	
    get(ruleset,idx) {
		let a = this.all(ruleset);
    	if (idx > -1 && idx < a.length) {
        	return a[idx];
        }
    }
};
