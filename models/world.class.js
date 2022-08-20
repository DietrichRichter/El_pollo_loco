class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    StatusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkThrowObjects();
        this.checkCollision();
    }


    /**
     * Mit dieser funktion wird die Flasche erst dann geworfen, wenn man eine bestimmte Taste drückt
     */
    checkThrowObjects() {
        setInterval(() => {
            if (this.keyboard.D && this.character.bottleCollect > 1) {
                let bottle = new ThrowableObject(this.character.position_x + 20, this.character.position_y + 100);
                this.throwableObjects.push(bottle);
                this.character.thrownCollectBottles();
                this.statusBarBottle.setPercentageBottle(this.character.bottleCollect);
            }
        }, 90);
    }


    /**
     * Mit dieser Funktion wird überprüft, ob Objekte mit einander Kollidieren
     */
    checkCollision() {
        setInterval(() => {
            this.collisionWithEnemies();
            this.collisionWithCoin();
            this.collisionWithBottle();
            this.collisionWithEndboss();
        }, 10);
    }


    /**
     * Mit dieser Funktion wird überprüft, ob der Charakter mit den Hähnchen Koolidiert
     */
    collisionWithEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingWithCharacter(enemy)) {
                this.character.hit();
                this.statusBarHealth.setPercentageHealth(this.character.energy);
            }
        })
    }


    /**
     * Mit dieser Funktion wird überprüft, ob der Charakter mit den Coiins Koolidiert
     */
    collisionWithCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isCollidingWithCoins(coin)) {
                this.character.collectCoins();
                this.statusBarCoin.setPercentageCoin(this.character.coinCollect);
                this.deleteTheCoin(coin);
            }
        })
    }


    /**
     * Mit dieser Funktion wird überprüft, ob der Charakter mit den Flaschen Koolidiert
     */
    collisionWithBottle() {
        this.level.bottleGround.forEach((bottle) => {
            if (this.character.isCollidingWithBottles(bottle)) {
                this.character.collectBottles();
                this.statusBarBottle.setPercentageBottle(this.character.bottleCollect);
                this.deleteTheBottle(bottle);
            }
        })
    }


    /**
     * Mit dieser Funktion wird überprüft, ob der Charakter mit dem Endboss Koolidiert
     */
    collisionWithEndboss() {
        this.level.endboss.forEach((boss) => {
            if (this.character.isCollidingWithEndboss(boss)) {
                this.character.hit();
                this.statusBarHealth.setPercentageHealth(this.character.energy);
            }
        })
    }


    /**
     * Mit dieser Funktion wird ein Coin aus dem Array gelöscht
     * @param {*} coin Das ist der Coin, der vom Charakter berührt wird
     */
    deleteTheCoin(coin) {
        let index = this.level.coins.indexOf(coin);
        if (index < 1) {
            this.level.coins.splice(0, 1);
        }
    }


    /**
     * Mit dieser Funktion wird ein bottle aus dem Array gelöscht
     * @param {*} bottle Das ist die Flasche die vom Character berührt wird
     */
    deleteTheBottle(bottle) {
        let index = this.level.bottleGround.indexOf(bottle);
        if (index < 1) {
            this.level.bottleGround.splice(0, 1);
        }
    }


    /**
    * Mit dieser Funktion wird der Charakter durch das this mit der Welt verbunden
    */
    setWorld() {
        this.character.world = this;
    }


    /**
     * Mit dieser Funktion werden die Objekte auf das Canvas eingefügt
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.showBossEnergy();
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottleGround);
        this.addObjectsToMap(this.level.cloud);

        this.ctx.translate(-this.camera_x, 0);

        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * Mit dieser Funktion wird die Statusbar erst ab einer bestimmten x Koordinaten angezeigt
     */
    showBossEnergy() {
        if (this.character.position_x > 4000) {
            this.addToMap(this.StatusBarEndboss);
        }
    }


    /**
     * Mit dieser Funktion wird jedes Bild in einem Array nacheinander angesprochen
     * @param {*} objects Die Parameter aus der Funktion draw() werden an diese Funktion addToMap() weitergegeben
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    /**
     * Mit dieser Funktion werden die Einzelnen Bilder gezeichnet
     * @param {*} movableObject Die Parameter aus der Funktion addObjectsToMap werden an drawImage weitergegeben
     */
    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }

        movableObject.draw(this.ctx);
        //movableObject.drawFrameObjects(this.ctx);
        //movableObject.drawFrameCharacter(this.ctx);
        //movableObject.drawFrameCoin(this.ctx);
        //movableObject.drawFrameBottleGround(this.ctx);

        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
    }


    /**
     * Mit dieser Funktion wird das Objekt gedreht
     * @param {*} movableObject gibt es an die Funktion addToMap weiter
     */
    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.position_x = movableObject.position_x * -1;
    }


    /**
     * Mit dieser Funktion wird das Objekt zurück gedreht
     * @param {*} movableObject gibt es an die Funktion addToMap weiter
     */
    flipImageBack(movableObject) {
        movableObject.position_x = movableObject.position_x * -1;
        this.ctx.restore();
    }
}