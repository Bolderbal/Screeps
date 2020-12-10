module.exports = {
    run: function (creep) {
        //standard working not working code
        creep.setWorkingState();
        //Transfer energy to structure
        if (creep.memory.working == true) {
            if (creep.room.name != creep.memory.home) {
                creep.goHomeSam();
            }
            //Transfer energy to structure
            else {
                creep.transferEnergy();
            }
        }
        //Harvest energy
        else {
            creep.collectEnergy();
        }
    }
};