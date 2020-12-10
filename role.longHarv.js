module.exports = {
	run: function (creep) {
		creep.moveInNewRoom();
		creep.setWorkingState();
		
		//Transfer energy to structure
		if (creep.memory.working == true) {
			if (creep.room.name == creep.memory.home) {
				creep.storeEnergy();
			}
			else {
				creep.goHomeSam();
			}
		}


		//Harvest energy
		else {
			if (creep.room.name == creep.memory.traget) {
				var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
				if (creep.harvest(source) == ERR_NOT_IN_RANGE || ERR_INVALID_TARGET) {
					creep.moveTo(source,{maxRooms: 1});
				}
				
			}
			else {
				var exit = creep.room.findExitTo(creep.memory.traget);
				creep.moveTo(creep.pos.findClosestByRange(exit), { visualizePathStyle: { stroke: '#ffaa00' } });
				//console.log(creep.room.traget);
			};
		}

	}
};