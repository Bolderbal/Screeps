var roleUpgrader = require('role.upgrader');
/**
 * With prototypes you can add functions or parameters to existing
 * objects. So in this file I added a bunch of functions to the
 * Creep object. I also add descriptions in the index file, so if
 * you hover over the function name, you can see what it does
 * and what it should return
 */
Creep.prototype.buildStructures =
    function () {
        var constructionSite = this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)
        if (constructionSite != undefined) {
            if (this.build(constructionSite) == ERR_NOT_IN_RANGE) {
                return this.moveTo(constructionSite);
            }

        } else {
            return roleUpgrader.run(this);
        }
    };
Creep.prototype.collectEnergy =
    function () {
        var container = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                || s.structureType == STRUCTURE_STORAGE
                || s.structureType == STRUCTURE_TERMINAL)
                && s.store[RESOURCE_ENERGY] > 0
        });
        //if one of those exists
        if (container != undefined) {
            //withdraw energy from it (and move towards it if its not in range)
            if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                return this.moveTo(container);
            }

        }
    };

Creep.prototype.defineStructures =
    function () {
        var container = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                || s.structureType == STRUCTURE_STORAGE)
                && s.store[RESOURCE_ENERGY] > 0
        });
        return container;
    }

//Move that creep!
Creep.prototype.goHomeSam =
    function () {
        var exit = this.room.findExitTo(this.memory.home);
        return this.moveTo(this.pos.findClosestByRange(exit));
    };

//get energy
Creep.prototype.harvestEnergy =
    function () {
        if (arguments.length > 0) {
            var source = Game.getObjectById(arguments[0]);
        } else {
            var source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        }
        if (this.harvest(source) == ERR_NOT_IN_RANGE) {
            return this.moveTo(source);
        }
    };

//get minerals
Creep.prototype.harvestMinerals =
    function () {
        var mineral = Game.getObjectById(arguments[0]);

        if (this.harvest(mineral) == ERR_NOT_IN_RANGE) {
            return this.moveTo(mineral);
        }
    };

Creep.prototype.moveInNewRoom =
    function () {
        if (this.pos.x == 0) {
            return this.move(RIGHT);
        } else if (this.pos.x == 49) {
            return this.move(LEFT);
        } else if (this.pos.y == 0) {
            return this.move(BOTTOM)
        } else if (this.pos.y == 49) {
            return this.move(TOP);
        } else {
            return null
        }
    }
Creep.prototype.pickUpEnergy =
    function () {
        var source = this.room.find(FIND_DROPPED_RESOURCES);
        var amount = [];

        for (let power of source) {
            amount.push(power.amount)
        }
        function indexOfMax(arr) {
            if (arr.length === 0) {
                return -1;
            }

            var max = arr[0];
            var maxIndex = 0;

            for (var i = 1; i < arr.length; i++) {
                if (arr[i] > max) {
                    maxIndex = i;
                    max = arr[i];
                }
            }

            return maxIndex;
        }
        var index = indexOfMax(amount);

        if (this.pickup(source[index]) == ERR_NOT_IN_RANGE) {

            return this.moveTo(source[index]);
        } else {
            var container = this.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_CONTAINER)
                    && s.store.getUsedCapacity() > 0
            });
            //if one of those exists
            for (const resourceType in this.store) {
                if (container != undefined) {
                    //withdraw energy from it (and move towards it if its not in range)
                    if (this.withdraw(container, resourceType) == ERR_NOT_IN_RANGE) {
                        return this.moveTo(container);
                    }

                }
            }
        }
    };
Creep.prototype.sayhi =
    function () {
        let homies = this.pos.findInRange(FIND_MY_CREEPS, 1, {
            //I need this filter so it doesn't find itself... 
            //It took me way too long to figure this out
            //Everyone kept saying yo alle the time -.-
            filter: (c) => (c.name != this.name)
        });

        for (let index = 0; index < homies.length; index++) {
            if (this.pos.isNearTo(homies[index]))
                this.say('yo');
        }
    };

Creep.prototype.setWorkingState =
    function () {
        if (this.memory.working == true && this.store.getUsedCapacity() == 0) {
            return this.memory.working = false;
        } else if (this.memory.working == false && this.store.getFreeCapacity() == 0) {
            return this.memory.working = true;
        }
    };
//store energy     
Creep.prototype.storeEnergy =
    function () {
        for (const resourceType in this.store) {
            var container = this.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_STORAGE)
                    && s.store.getFreeCapacity() > 0
            });
            //if one of those exists
            if (container != undefined) {
                //store energy in it (and move towards it if its not in range)

                if (this.transfer(container, resourceType) == ERR_NOT_IN_RANGE) {

                    return this.moveTo(container, { maxRooms: 1 });
                }


            } else {
                //console.log(this.room.name, this.transfer(container, resourceType));
                return this.transferEnergy();
            }
        }
    };
Creep.prototype.suicideCode =
    function () {
        if (this.ticksToLive == 2) {
            this.say("Aaaarg");
        }
        if (this.ticksToLive < 20
            && this.ticksToLive > 2) {
            //I subtracted 1 because there is a delay
            this.say(this.ticksToLive - 1);
            //I added this bit so that the creep selfdestructs if its not full of energy
            //you dont want the creep to harvest energy when it's about to die, this energy will be lost
            if (this.memory.working == false) {
                this.say('Goodbye')
                console.log(this.name + " has just comitted suicide :(");
                this.suicide();
            }
        }
    };
Creep.prototype.transferEnergy =
    function () {
        var structure = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_SPAWN
                || s.structureType == STRUCTURE_EXTENSION
                || s.structureType == STRUCTURE_TOWER)
                && s.store[RESOURCE_ENERGY] < s.store.getCapacity(RESOURCE_ENERGY)
        });
        //if one of those exists
        if (structure != undefined) {
            if (this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                return this.moveTo(structure);
            }

        }
    };