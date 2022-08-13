class MovableObject extends DrawableObject {
    speed;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    coinCollect = 0;
    bottleCollect = 0;
    lastHit = 0;


    /**
     * Mit dieser Funktion werden von dem Charakter die Eckpunkte angegeben
     * @param {*} movableObject gibt es in die MovableObject klasse weiter
     * @returns gibt die Eckpunkte von dem Objekt zurück
     */
    isCollidingWithCharacter(movableObject) {
        return this.position_x + 35 + this.width - 70 > movableObject.position_x &&
            this.position_y + 50 + this.height - 50 > movableObject.position_y &&
            this.position_x < movableObject.position_x + 35 &&
            this.position_y + 50 < movableObject.position_y + movableObject.height;
    }


    /**
     * Mit dieser Funktion werden von den Coins die Eckpunkte angegeben
     * @param {*} movableObject gibt es in die MovableObject klasse weiter
     * @returns gibt die Eckpunkte von dem Objekt zurück
     */
    isCollidingWithCoins(movableObject) {
        return this.position_x - 7 + this.width - 70 > movableObject.position_x &&
            this.position_y + 50 + this.height > movableObject.position_y &&
            this.position_x - 70 < movableObject.position_x &&
            this.position_y + 50 < movableObject.position_y + movableObject.height - 110;
    }


    /**
     * Mit dieser Funktion werden von den Bottles die Eckpunkte angegeben
     * @param {*} movableObject gibt es in die MovableObject klasse weiter
     * @returns gibt die Eckpunkte von dem Objekt zurück
     */
    isCollidingWithBottles(movableObject) {
        return this.position_x + 35 + this.width - 80 > movableObject.position_x &&
            this.position_y + 50 + this.height - 50 > movableObject.position_y &&
            this.position_x < movableObject.position_x + 20 &&
            this.position_y + 50 < movableObject.position_y + movableObject.height;
    }


    /**
     * Mit dieser Funktion werden von dem Endboss die Eckpunkte angegeben
     * @param {*} movableObject gibt es in die MovableObject klasse weiter
     * @returns gibt die Eckpunkte von dem Objekt zurück
     */
    isCollidingWithEndboss(movableObject) {
        return this.position_x + 35 + this.width - 70 > movableObject.position_x &&
            this.position_y + 50 + this.height - 50 > movableObject.position_y &&
            this.position_x < movableObject.position_x + 200 &&
            this.position_y + 50 < movableObject.position_y + movableObject.height;
    }


    /**
     * Mit dieser Funktion fällt ein Objekt auf den Boden
     */
    applyGravitiy() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.position_y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     * Diese Funktion gibt die Y Koordinaten zurück 
     * @returns Y Koordinaten
     */
    isAboveGround() {
        return this.position_y < 190;
    }


    /**
     * Mit dieser Funktion bewegt sich ein Objekt nach rechts
     */
    moveRight() {
        this.position_x += this.speed;
    }


    /**
     * Mit dieser Funktion bewegt sich ein Objekt nach links
     */
    moveLeft() {
        this.position_x -= this.speed;
    }


    /**
     * Mit dieser Funktion wird ein sprung ausgeführt
     */
    jump() {
        this.speedY = 28;
    }


    /**
     * Mit dieser Funktion wird ein Array mit den Bildern durchiteriert
     * @param {*} images wird an eine weitere Funktion weitergegeben
     */
    playAnimation(images) {
        let i = this.currenImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currenImage++
    }


    /**
     * Mit dieser Funktion werden Coins eingesammelt
     */
    collectCoins() {
        this.coinCollect += 4.17;
        if (this.coinCollect > 100) {
            this.coinCollect = 100;
        }
    }

    /**
     * Mit dieser Funktion werden Bottles eingesammelt
     */
    collectBottles() {
        this.bottleCollect += 5;
        if (this.bottleCollect > 100) {
            this.bottleCollect = 100;
        }
    }


    /**
     * Mit dieser Funktion wird einem Objekt schaden hinzugefügt
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Wird ausgeführt wenn das Objekt stirbt
     * @returns gibt den Wert 0 zurück
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * Wird ausgeführt wenn das Objekt an schaden erleidet
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }
}