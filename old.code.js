   // else if (claimers < minClaimers) {
            //     name = spawn.spawnCreep([CLAIM, MOVE, MOVE], 'claimer' + Game.time, {
            //         memory: {
            //             role: 'claimer',
            //             home: 'W1S15',
            //             target: 'W1S14'
            //         }
            //     });
            // }


            // let totalCreepsInRoom = _.sum(Game.creeps, (c) => (c.memory.home == spawn.room.name));




                //Which roles do you want?

                
    //OK so I made it so that this works for all your rooms, with the help of Atanner Gaming's youtube video (part 3 in his series)
    //what this does is it goes trough all the games rooms, and returns a room object

    //Or so I thought.. since rooms doesnt have a spawn object I couldn't get this to work
    //instead of going throug all the rooms with the for each, i go through all the spawns
    //since spawns does have an object for rooms. If that makes any sence


    // var terminal = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    //     filter: (s) => (s.structureType == STRUCTURE_TERMINAL)
    //         && s.store.getUsedCapacity() > 0
    // });
    // //console.log(terminal);

    
        
    //     //if one of those exists
    //     if (terminal != undefined) {
    //         for (const resourceType in terminal.store) {
    //         //store energy in it (and move towards it if its not in range)
    //         //console.log('test');
    //         if (creep.withdraw(terminal, resourceType) == ERR_NOT_IN_RANGE) {

    //             return creep.moveTo(terminal);
    //         }
    //     }