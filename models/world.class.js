class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    endboss = new Endboss();


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollision();
    }


    /**
     * Mit dieser Funktion wird überprüft, ob Objekte mit einander Kollidieren
     */
    checkCollision() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isCollidingWithCharacter(enemy)) {
                    console.log (enemy);
                }
            })
            this.level.coins.forEach((coin) => {
                if (this.character.isCollidingWithCoins(coin)) {
                    console.log(coin);
                }
            })
            this.level.bottleGround.forEach((bottle) => {
                if (this.character.isCollidingWithBottles(bottle)) {
                    console.log(bottle);
                }
            })
        }, 200);
    }


    /**
    * Mit dieser Funktion wird der Charakter durch das this mit der Welt verbunden
    */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }


    /**
     * Mit dieser Funktion werden die Objekte auf das Canvas eingefügt
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.enemies);
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