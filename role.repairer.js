var roleBuilder = require('role.builder');
var creepCode = require('prototype.creep');

module.exports = {
    run: function (creep) {
        creep.setWorkingState();

        if (creep.memory.working == true) {
            if (creep.room.name != creep.memory.home) {
                creep.goHomeSam();
            }
            else {
                var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
                });
                if (structure != undefined) {
                    if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure)
                    }
                }
                else {
                    roleBuilder.run(creep);
                }
            }
        }
        else {
            creep.harvestEnergy();

        }
    }
};