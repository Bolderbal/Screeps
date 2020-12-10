module.exports = {
    run: function(creep){
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        } else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        //Go home if not home
        if (creep.memory.working == true) {
			if (creep.room.name != creep.memory.home){
			  var exit = creep.room.findExitTo(creep.memory.home);
			  creep.moveTo(creep.pos.findClosestByRange(exit));
		  }
		  //upgrade controller or move in range
		  else{
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
		  }
        }
        //Harvest energy if not carrying energy
        else {
            var source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                if (creep.pickup(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }

        }
    }

};