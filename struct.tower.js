module.exports = {
    run: function (tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        const range = tower.pos.getRangeTo(closestHostile);
        if (closestHostile && range <= 100) {
            tower.attack(closestHostile);
        }
    }
};