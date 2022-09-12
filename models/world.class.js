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
    youLose = new YouLose();
    gameOver = new GameOver();
    lastCollision = [];
    lastBottleWithBossCollision = [];


    constructor(canvas, keyboard, intervallIds) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.intervallIds = intervallIds;
        this.draw();
        this.setWorld();
        this.checkThrowObjects();
        this.checkCollision();
    }


    /**
     * Mit dieser funktion wird die Flasche erst dann geworfen, wenn man eine bestimmte Taste drückt
     */
    checkThrowObjects() {
        setStoppableInterval(() => {
            if (this.keyboard.D && this.character.bottleCollect > 1) {
                let bottle = new ThrowableObject(this.character.position_x + 20, this.character.position_y + 100);
                this.throwableObjects.push(bottle);
                this.character.thrownCollectBottles();
                this.statusBarBottle.setPercentageBottle(this.character.bottleCollect);
            }
        }, 100);
    }


    /**
     * Mit dieser Funktion wird überprüft, ob Objekte mit einander Kollidieren
     */
    checkCollision() {
        setStoppableInterval(() => {
            this.collisionWithEnemies();
            this.collisionWithEndboss();
        }, 100);
        setStoppableInterval(() => {
            this.collisionWithCoin();
            this.collisionWithBottle();
        }, 10);
    }


    /**
     * Mit dieser Funktion wird überprüft, ob der Charakter mit den Hähnchen Koolidiert
     */
    collisionWithEnemies() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                    this.deleteEnemies(index);
                } else {
                    this.character.hit(this.energy);
                    this.statusBarHealth.setPercentageHealth(this.character.energy);
                }
            }
            this.throwableObjects.forEach((to, indexTo) => {
                if (enemy.isColliding(to)) {
                    this.deleteThrowableObject(indexTo);
                    this.deleteEnemies(index);
                }
            })
        })
    }


    /**
     * Mit dieser Funktion wird überprüft, ob der Charakter mit den Coiins Koolidiert
     */
    collisionWithCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoins();
                this.statusBarCoin.setPercentageCoin(this.character.coinCollect);
                this.deleteTheCoin(index);
            }
        })
    }


    /**
     * Mit dieser Funktion wird überprüft, ob der Charakter mit den Flaschen Koolidiert
     */
    collisionWithBottle() {
        this.level.bottleGround.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottles();
                this.statusBarBottle.setPercentageBottle(this.character.bottleCollect);
                this.deleteTheBottle(index);
            }
        })
    }


    /**
     * Mit dieser Funktion wird überprüft, ob der Charakter mit dem Endboss Koolidiert
     */
    collisionWithEndboss() {
        this.level.endboss.forEach((boss) => {
            if (this.character.isColliding(boss)) {
                this.character.hit(this.energy);
                this.statusBarHealth.setPercentageHealth(this.character.energy);
            }
            this.throwableObjects.forEach((to) => {
                if (boss.isColliding(to)) {
                    this.deleteThrowableObject(to);
                    this.level.endboss[0].hitEndboss();
                    this.StatusBarEndboss.setPercentageHealthEndboss(this.level.endboss[0].endbossEnergy);
                }
            })
        })
    }


    /**
     * Mit dieser Funktion wird die geworfene Flasche aus dem Array entfernt
     * @param {*} indexTo gibt den Wert der geworfenen Flasche zurück
     */
    deleteThrowableObject(indexTo) {
        this.throwableObjects.splice(indexTo, 1);
    }


    /**
     * Mit dieser Funktion wird ein Coin aus dem Array gelöscht
     * @param {*} coin Das ist der Coin, der vom Charakter berührt wird
     */
    deleteTheCoin(index) {
        this.level.coins.splice(index, 1);
    }


    /**
     * Mit dieser Funktion wird ein bottle aus dem Array gelöscht
     * @param {*} index Das ist die Flasche die vom Character berührt wird
     */
    deleteTheBottle(index) {
        this.level.bottleGround.splice(index, 1);
    }


    /**
     * Mit dieser Funktion wird ein Chicken aus dem Array gelöscht
     * @param {*} index gibt den Wert von einen chicken zurück
     */
    deleteEnemies(index) {
        this.level.enemies.splice(index, 1);
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
        this.addObjectsToMap(this.level.cloud);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottleGround);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.showYouLoseScreen();
        this.showGameOverScreen();
        this.showBossEnergy();
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);

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
     * Diese Funktion wird ausgeführt, wenn der Character stirbt
     */
    showYouLoseScreen() {
        if (this.character.energy == 0) {
            this.lastCollision.push(1);
        }
        if (this.lastCollision.length >= 100) {
            this.addToMap(this.youLose);
            document.getElementById('replay-button-container').classList.remove('d-none');
            stopGame();
        }
    }


    showGameOverScreen() {
        if (this.level.endboss[0].endbossEnergy < 1) {
            this.lastBottleWithBossCollision.push(1);
        }
        if (this.lastBottleWithBossCollision.length >= 100) {
            this.addToMap(this.gameOver);
            document.getElementById('replay-button-container').classList.remove('d-none');
            stopGame();
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
        //------show frame objects--------
        //movableObject.drawFrameObjects(this.ctx);
        //movableObject.drawFrameNormalChicken(this.ctx);
        //movableObject.drawFrameSmallChicken(this.ctx);
        //movableObject.drawFrameEndboss(this.ctx);
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