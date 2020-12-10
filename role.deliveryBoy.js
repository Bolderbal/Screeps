var test = require('prototype.creep');
module.exports = {
    run: function (creep) {
        //standard working not working code
        creep.setWorkingState();

        //Go home sam!
        if (creep.memory.working == true) {
            if (creep.room.name != creep.memory.home) {
                creep.goHomeSam();
            }
            //Transfer energy to structure
            else {
                
                creep.storeEnergy();
                //console.log(creep.room.name);
            }
        }
        //Pick up energy if not carrying energy
        else {
            creep.pickUpEnergy();

        }
    }

};