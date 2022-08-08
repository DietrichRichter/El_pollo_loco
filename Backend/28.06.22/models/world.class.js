class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
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
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottle);
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
            this.ctx.save();
            this.ctx.translate(movableObject.width, 0);
            this.ctx.scale(-1, 1);
            movableObject.position_x = movableObject.position_x * -1;
        }
        this.ctx.drawImage(movableObject.img, movableObject.position_x, movableObject.position_y, movableObject.width, movableObject.height);
        if (movableObject.otherDirection) {
            movableObject.position_x = movableObject.position_x * -1;
            this.ctx.restore();
        }
    }
}