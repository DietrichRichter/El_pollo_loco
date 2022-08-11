class Level {
    enemies;
    coins;
    bottleGround;
    backgroundObjects;
    cloud;
    endboss;
    level_end_x = 5000;

    constructor(enemies, coins, bottleGround, backgroundObjects, cloud, endboss) {
        this.enemies = enemies;
        this.coins = coins;
        this.bottleGround = bottleGround;
        this.backgroundObjects = backgroundObjects;
        this.cloud = cloud;
        this.endboss = endboss;
    }
}