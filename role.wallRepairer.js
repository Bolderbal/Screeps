
module.exports = {
    run: function (creep) {
        //console.log(creep.pos);
        creep.moveInNewRoom();
        creep.setWorkingState();

        //If creep is full of energy
        if (creep.memory.working == true) {
            //if creep is not in the home room
            if (creep.room.name != creep.memory.home) {
                //move to the exit towards the home room
                creep.goHomeSam();
            }
            //else find walls with less than 1million hitpoints
            else {
                var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.hits < 1000000 && s.structureType == STRUCTURE_WALL
                });
                //if such a wall exists, pump energy into it (and move towards it if its not in range)
                if (structure != undefined) {
                    if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure)
                    }
                }
                //if all walls have 1 million hitpoints or there are no walls, become a builder
                else {
                    roleBuilder.run(creep);
                }
            }
        }
        //if creep is not carrying any energy, find containers or structures containing energy
        else {
            creep.collectEnergy();
        }
    }
};