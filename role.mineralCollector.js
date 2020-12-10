var prototype = require('prototype.spawn')();
module.exports = {
    run: function(creep){
        //Go home sam!
        if (creep.room.name != creep.memory.home){
	        creep.goHomeSam();
        }
        //Go to specific source and harvest it (this creep shouldn't have any carry parts so it just drops the energy on the floor
        //for the delivery boys to come and pick up)
		else{
            creep.harvestMinerals(creep.memory.myMineral);
        }
    }
};