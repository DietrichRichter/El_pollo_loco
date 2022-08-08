class Level {
    enemies;
    coins;
    bottle;
    bottleGround;
    backgroundObjects;
    cloud;
    level_end_x = 5000;

    constructor(enemies, coins, bottle, bottleGround, backgroundObjects, cloud) {
        this.enemies = enemies;
        this.coins = coins;
        this.bottle = bottle;
        this.bottleGround = bottleGround;
        this.backgroundObjects = backgroundObjects;
        this.cloud = cloud;
    }
}