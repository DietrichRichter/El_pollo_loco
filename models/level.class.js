class Level {
    enemies;
    coins;
    bottleGround;
    backgroundObjects;
    cloud;
    level_end_x = 5000;

    constructor(enemies, coins, bottleGround, backgroundObjects, cloud) {
        this.enemies = enemies;
        this.coins = coins;
        this.bottleGround = bottleGround;
        this.backgroundObjects = backgroundObjects;
        this.cloud = cloud;
    }
}