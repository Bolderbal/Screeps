module.exports = function () {
    //this file contains prototypes for spawning "home" creeps and for spawning "travel" creeps
    StructureSpawn.prototype.createCustomCreep2 =
        function (maxEnergy, roleName) {
            var sources = this.room.find(FIND_SOURCES);
            var minerals = this.room.find(FIND_MINERALS);
            var mySource = sources[0].id;
            var myMineral = minerals[0].id;
            var body = [];
            //home is the room where the creep is spawned. 
            var home = this.room.name;

            if (home == 'W1S15'){
                firstRoom = this.room.mapping(home, 'northWest');
                targetRoom = this.room.mapping(firstRoom, 'west');
            } else{
                targetRoom = this.room.mapping(home, 'west');
            }

            //determine the parts
            if (roleName == 'collector' || roleName == 'mineralCollector') {
                var workParts = Math.min(Math.floor(maxEnergy / 100) - 1, 5)
                var carryParts = 0;
                var moveParts = 2;
                let otherSource = _.sum(Game.creeps, (c) => (c.memory.role == 'collector' && c.memory.mySource == sources[0].id));
                if (otherSource == 1 && sources.length > 1) {
                    mySource = sources[1].id;
                }
            } else if (roleName == 'builder' || roleName == 'repairer' || roleName == 'upgrader' || roleName == 'longHarv') {
                var workParts = Math.floor(maxEnergy / 200);
                var carryParts = (Math.floor(maxEnergy / 100) - workParts);
                var moveParts = (Math.floor(maxEnergy / 50) - (2 * workParts) - carryParts);
            }  else if (roleName == 'claimer') {
                var workParts = 0;
                var carryParts = 0;
                var moveParts = 4;
                var claimParts = 1;
            } else {
                var workParts = 0
                var carryParts = Math.min(Math.floor(maxEnergy / 100), 20);
                var moveParts = carryParts;
            }

            //Work cost 100 energy
            for (let i = 0; i < workParts; i++) {
                body.push(WORK);
            }
            //Carry cost 50 energy
            for (let i = 0; i < carryParts; i++) {
                body.push(CARRY);
            }
            //Move cost 50 energy
            for (let i = 0; i < moveParts; i++) {
                body.push(MOVE);
            }

            for (let i = 0; i < claimParts; i++) {
                body.push(CLAIM);
            }
            let creepName = roleName + Game.time;
            //console.log(maxEnergy);
            //I replaces the createCreep method with the spawnCreap method since the docs said createCreep will be removed soon
            //This created a problem in main because spawnCreep doesnt return the creeps name if you call it, it just returns 0
            //also, the syntax for the memory is a bit different
            return this.spawnCreep(body, creepName, {
                memory: {
                    role: roleName,
                    home: home,
                    traget: targetRoom,
                    working: false,
                    mySource: mySource,
                    myMineral: myMineral
                }
            });
        };
};