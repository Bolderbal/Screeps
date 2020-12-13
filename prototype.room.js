//WxxNxx WxxNx WxNxx WxNx
//WxxSxx WxxSx WxSxx WxSx
//ExxNxx ExxNx ExNxx ExNx
//ExxSxx ExxSx ExSxx ExSx

// 0   1   2

// 3  home 5

// 6   7   8
//--------------------------
// northWest    north   northEast

// west         home    east

// southWest    south   southEast
//--------------------------
// W2S14  W1S14  W0S14

// W2S15  W1S15  W0S15

// W2S16  W1S16  W0S16


//  for (let i = 1; i > -2; i--)
// if ([0]==W && [i]==N){
//      weInt += i
//      nsInt += i
//}
//----------------------------
//input: room.mapping(W1S15, east)
//output: W0S16



Room.prototype.mapping =
    function (room, posi) {
        //This if and for loop disect the input room into letters and numbers and stores them in variables
        if (room[0] == 'W' || room[0] == 'E') {
            if (room[3] == 'N' || room[3] == 'S') {
                var weTen = room[1];
                var weSingle = room[2];
            } else {
                weTen = '';
                weSingle = room[1];
            }

            var weString = weTen + weSingle;
            var weInt = parseInt(weString, 10);
            var y = room[0];

        }
        for (let i = 2; i < 4; i++) {
            if (room[i] == 'S' || room[i] == 'N') {
                var snTen = room[i + 1];
                var snSingle = room[i + 2];
                var snString = snTen + snSingle;
                var snInt = parseInt(snString, 10);
                var x = room[i];
            }
        }
        //Now its time to make the arrays for the surrounding rooms. 
        //Target will hold all 9 rooms in the square. 
        //Result will give the requested room.     
        let target = [];
        let result = [];


        //------------------ n&w--, s&e++

        for (let n = 1; n > -2; n--) {
            for (let w = 1; w > -2; w--) {
                if (y == 'W' && x == 'N') {
                    var newSnInt = snInt + n;
                    var newWeInt = weInt + w;
                } else if (y == 'W' && x == 'S') {
                    var newSnInt = snInt - n;
                    var newWeInt = weInt + w;
                } else if (y == 'E' && x == 'N') {
                    var newSnInt = snInt + n;
                    var newWeInt = weInt - w;
                } else {
                    var newSnInt = snInt - n;
                    var newWeInt = weInt - w;
                }

                if (newSnInt < 0 && x == 'N') {
                    x = 'S';
                    newSnInt = 0;
                } else if (newSnInt < 0 && x == 'S') {
                    x = 'N';
                    newSnInt = 0;
                }
                if (newWeInt < 0 && y == 'W') {
                    y = 'E';
                    newWeInt = 0;
                } else if (newWeInt < 0 && y == 'E') {
                    y = 'W';
                    newWeInt = 0;
                }

                var targetStr = y + newWeInt + x + newSnInt;
                target.push(targetStr);
            }
        }


        let position = ['northWest', 'north', 'northEast', 'west', 'home', 'east', 'southWest', 'south', 'southEast'];
        _.forEach(position, function (orientation) {
            if (posi == orientation) {
                let q = target[position.indexOf(orientation)]
                result.push(q);
            }
        });
        return result[0];
    }
