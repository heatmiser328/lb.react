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
		"Turn Adjustment"
	],
	fifthedsub: {
		"Command": [
			"Command Points",
			"Command Tracing",
			"Maneuver Unit Creation",
			"Light Cav Initiative"		
		],
		"Maneuver": [
			"Charge a Cheval",
			"Melee a Cheval",
			"Movement",
			"Defensive Fire",
			"Offensive Fire",
			"Assault/Melee",
			"Rally",
			"Rout Movement",
			"Readiness Recovery"
		]
	}
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
    suball(ruleset,phaseidx) {		
		let a = [];
		let phase = this.get(ruleset, phaseidx);
		console.log('suball', ruleset, phaseidx, phase);
		switch(phase) 
		{
			case "Command":
			a = phases.fifthedsub.Command;
			break;
			case "Maneuver":
			a = phases.fifthedsub.Maneuver;
			break;
			default:
			break;
		}
		console.log('suball', ruleset, phaseidx, phase, a);
		return a;
    },	
    count(ruleset) {
		return this.all(ruleset).length;
    },	
    subcount(ruleset,phaseidx) {
		return this.suball(ruleset,phaseidx).length;
    },		
    get(ruleset,idx) {
		let a = this.all(ruleset);
    	if (idx > -1 && idx < a.length) {
        	return a[idx];
        }
    },
    subget(ruleset,phaseidx,subphaseidx) {		
		let a = this.suball(ruleset,phaseidx);
    	if (subphaseidx > -1 && subphaseidx < a.length) {
        	return a[subphaseidx];
        }
    }	
};
