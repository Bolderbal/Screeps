var test = require('prototype.creep');
module.exports = {
	run: function (creep) {
		//if a creep is not carrying any energy, set the working property in its memory to false
		creep.setWorkingState();
		//If creep is full of energy
		if (creep.memory.working == true) {
			//if creep is not in the home room
			if (creep.room.name != creep.memory.home) {
				//move to the exit that leads to the home room
				creep.goHomeSam();
			}
			//find construction sites. If they exist, move towards them, if not, be an upgrader
			else {
				creep.buildStructures();
			}
		}
		//if not carrying energy, find a source and harvest it, or move to it if out of range. 
		else {
			creep.collectEnergy();
		}
	}

};