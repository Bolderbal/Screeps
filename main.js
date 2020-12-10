var structTower = require('struct.tower');
var spawnsProto = require('prototype.spawn');
var roomProto = require('prototype.room');

global.ROLES =
    ['deliveryBoy',
        'collector',
        'harvester',
        'upgrader',
        'builder',
        'repairer',
        'longHarv',
        'longUpgr',
        'wallRepairer',
        'claimer',
        'mineralCollector'];

module.exports.loop = function () {
    for (let name in Memory.creeps) {
        let creep = Game.creeps[name];
        
        //clear memory of dead creeps
        if (!creep) {
            delete Memory.creeps[name];
        } else {
            //determine which script to run based on role stored in memory of creep           
            _.forEach(ROLES, function (getJob) {
                global.GIVEROLES = {
                    job: require('role.' + getJob)
                }
                if (getJob == creep.memory.role) {
                    GIVEROLES.job.run(creep);
                }
            });
            creep.suicideCode();
            //creep.sayhi();

        }
    }

    var name = undefined;
    //backup var, used for testing
    var energy = 400
    //For each spawn that I own
    _.forEach(Game.spawns, function (spawn) {
        //I don't think I need this if statement but w/e
        if (spawn) {
            var hostileStructures = spawn.room.find(FIND_HOSTILE_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_EXTENSION
                    || s.structureType == STRUCTURE_TOWER
                    || s.structureType == STRUCTURE_LAB
                    || s.structureType == STRUCTURE_FACTORY
                    || s.structureType == STRUCTURE_SPAWN
                )
            });
            if (hostileStructures) {
                _.forEach(hostileStructures, function (struct) {
                    struct.destroy();
                });
            }
            //console.log(spawn.room.controller.ticksToDowngrade, spawn.name);
            //All available energy in the room
            var enrgyAvailable = spawn.room.energyAvailable;
            //maxEnergy=max energy available in room
            var maxEnergyInRoom = spawn.room.energyCapacityAvailable;
            var maxEnergy = Math.min(maxEnergyInRoom, 3300);
            var creepsInRoom = spawn.room.find(FIND_MY_CREEPS);
            
                _.forEach(ROLES, function (getJob) {
                    //console.log(getJob);
                    var minJobs = _.get(spawn.room.memory, ['roleName', getJob], 0);
                    var currentJobs = _.sum(Game.creeps, (c) => (c.memory.role == getJob && c.memory.home == spawn.room.name));
                    if (getJob == 'builder') {
                        //console.log(spawn.name, minJobs, currentJobs, maxEnergy, enrgyAvailable);
                    }
                    if ((getJob == 'collector' || getJob == 'deliveryBoy' || getJob == 'harvester') && currentJobs == 0) {
                        //console.log(spawn.name);
                        name = spawn.createCustomCreep2(Math.max(enrgyAvailable, 300), getJob);
                        //console.log(getJob);
                    } else if (currentJobs < minJobs) {
                        name = spawn.createCustomCreep2(maxEnergy, getJob);
                        //console.log(spawn.name, name);
                    }
                    if (name == 0) {
                        console.log(currentJobs + ' ' + getJob + ' in room ' + spawn.room.name);
                    }
                });
            
            //document which creep is spawning
            if (spawn.spawning) {
                var spawningCreep = Game.creeps[spawn.spawning.name];
                spawn.room.visual.text(
                    spawningCreep.memory.role + " in " + spawn.spawning.remainingTime,
                    spawn.pos.x + 1,
                    spawn.pos.y,
                    { align: 'left', opacity: 0.8 });
                //Print name of the new creep in console
                if (spawn.spawning.remainingTime == 2) {
                    console.log("I am spawning a " + spawningCreep.memory.role + " at " + spawn.name);
                }
            }
            // spawn.room.find(FIND_TOMBSTONES).forEach(tombstone => {
            //     if(tombstone.creep.my && tombstone.ticksToDecay == 1) {
            //         console.log(`${tombstone.creep.name} just died :(`);   
            //     }    
            // });
        }
    })
    //If a tower exists, run the tower code
    _.forEach(Game.structures, function (structure) {
        if (structure && structure.my && structure.structureType == STRUCTURE_TOWER) {
            structTower.run(structure);
        }
    })
}