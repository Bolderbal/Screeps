# Screeps
My screeps code

NOTE: I am a complete noob, both in screeps as well as programming/JavaScript.
I do everything by trail and error and there are probably many ways my code can be improved.

I'm pretty proud of my room.mapping() function. It takes a room name and a wind direction as arguments and returns the room name located at the wind direction relative to the input room.
So if you call room.mapping('W10N4', 'northWest') it returns 'W11N4'
It sould work on all room name formats (//WxxNxx WxxNx WxNxx WxNx and all those with S and E as well) This was a small challenge because if you go west on W10N4, the first number increases (W11N4) but if you go west on E10N4, the frist number decreases (E9N4)
Also, this code doesnt work if your input is has a zero value (for example W11N0) since it will return W11N-1, instead of switching to W11S0 
    I should probably fix that some time

Here's some things that I learned along the way:

- Do not worry if all your creeps die, even if you only find out after a few days. You'll probably be fine, most players don't even have attack code (I think ;))
- console.log('why is this not working?'); is your friend
- With prototypes you can add functions and variables to existing objects.
    I used this to add functions to creeps, rooms and spawns
- I suck at math
- I've added autocomplete files that I found on here. Im not really sure how that works exactly but it's amazing
    I think it created an index.d.ts file on my laptop where I can add descriptions to the functions I added with the prototype method.
    Or maybe this index file already existed? No idea. Pretty handy though!
    // Type definitions for Screeps 3.2
    // Project: https://github.com/screeps/screeps
    // Definitions by: Marko Sulamägi <https://github.com/MarkoSulamagi>
    //                 Nhan Ho <https://github.com/NhanHo>
    //                 Bryan <https://github.com/bryanbecker>
    //                 Resi Respati <https://github.com/resir014>
    //                 Adam Laycock <https://github.com/Arcath>
    //                 Dominic Marcuse <https://github.com/dmarcuse>
    //                 Skyler Kehren <https://github.com/pyrodogg>
    //                 Kieran Carnegie <https://github.com/kotarou>
    // Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
    // TypeScript Version: 2.8

    // Please contribute types to https://github.com/screepers/typed-screeps
