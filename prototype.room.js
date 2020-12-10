//WxxNxx WxxNx WxNxx WxNx
//WxxSxx
//ExxNxx
//ExxSxx

// 0   1   2

// 3  home 5

// 6   7   8
//--------------------------
// W2S14  W1S14  W0S14

// W2S15  W1S15  W0S15

// W2S16  W1S16  W0S16




Room.prototype.mapping =
    function (room, posi) {
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
        let target = [];
        let result = [];
        if (room[0] == 'E') {
            for (let i = 1; i > -2; i--) {
                if (x == 'N') {
                    for (let j = 1; j > -2; j--) {
                        var targetStr = y + (weInt + j) + x + (snInt + i);
                        target.push(targetStr);
                    }
                } else {
                    for (let j = -1; j < 2; j++) {
                        var targetStr = y + (weInt + j) + x + (snInt + i);
                        target.push(targetStr);
                    }
                }
            }
        } else {
            for (let i = -1; i < 2; i++) {
                if (x == 'S') {
                    for (let j = 1; j > -2; j--) {
                        var targetStr = y + (weInt + j) + x + (snInt + i);
                        target.push(targetStr);
                    }
                } else {
                    for (let j = -1; j < 2; j++) {
                        var targetStr = y + (weInt + j) + x + (snInt + i);
                        target.push(targetStr);
                    }
                }
            }
        }
        let position = ['northWest', 'north', 'northEast', 'west', 'east', 'southWest', 'south', 'southEast'];
        _.forEach(position, function (orientation) {
            if (posi == orientation) {
                let q = target[position.indexOf(orientation)]
                result.push(q);
            }
        });
        return result[0];
    }
