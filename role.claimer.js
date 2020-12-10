var test = require('prototype.creep');
module.exports = {
    run: function(creep){
        //bit of code to keep creeps from constantly switching between rooms
        creep.moveInNewRoom();
            //Go to the target room
            if (creep.room.name == creep.memory.traget){
                if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller), {visualizePathStyle: {stroke: '#ffaa00'}}
                    
                }
                //console.log(creep.room.controller)
            }
            //And once you're there, claim the controller
		    else{
		  	  var exit = creep.room.findExitTo(creep.memory.traget);  
			  creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        	    
}
};