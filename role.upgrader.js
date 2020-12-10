module.exports = {
    run: function (creep) {
        creep.setWorkingState();
        //Go home if not home
       
        if (creep.memory.working == true) {
            
            if (creep.room.name != creep.memory.home) {
                creep.goHomeSam();
                
            }
            //upgrade controller or move in range
            else {
                //console.log(creep.upgradeController(creep.room.controller));
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
                //console.log(creep.upgradeController(creep.room.controller));
            }
        }
        //Collect energy
        else {
            
            creep.collectEnergy();
            ;
        }
    }

};