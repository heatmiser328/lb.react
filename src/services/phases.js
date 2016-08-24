var phases = [
	"Command",
	"Charge a Cheval",
	"Movement",
	"Defensive Fire",
	"Offensive Fire",
	"Melee Assault",
	"Rally",
	"Rout",
	"Readiness Recovery"
];

module.exports = {
	count: phases.length,
	all: function() {
    	return phases;
    },
    get: function(idx) {
    	if (idx > -1 && idx < phases.length) {
        	return phases[idx];
        }
    }
};
