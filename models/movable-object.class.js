class MovableObject extends DrawableObject {
    speed;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    endbossEnergy = 100;
    coinCollect = 0;
    bottleCollect = 0;
    lastHit = 0;
    enbossAttackZone;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }


    /**
     * Mit dieser Funktion wird herausgefunden, ob Objekte miteinander kollidieren
     * @param {*} movableObject gibt die bewegten Objekte wieder
     * @returns gibt die Werte der einzelnen Objekte zurück
     */
    isColliding(movableObject) {
        return this.position_x + this.width - this.offset.right > movableObject.position_x + movableObject.offset.left &&
            this.position_y + this.height - this.offset.bottom > movableObject.position_y + movableObject.offset.top &&
            this.position_x + this.offset.left < movableObject.position_x + movableObject.width - movableObject.offset.right &&
            this.position_y + this.offset.top < movableObject.position_y + movableObject.height - movableObject.offset.bottom;
    }


    /**
     * Mit dieser Funktion fällt ein Objekt auf den Boden
     */
    applyGravitiy() {
        setStoppableInterval(() => {
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
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.position_y < 190;
        }
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
        this.bottleCollect += 21;
        if (this.bottleCollect > 100) {
            this.bottleCollect = 100;
        }
    }


    /**
     * Mit dieser Funktion werden die eingesammelten Bottels aus dem bottleCollect subtrahiert
     */
    thrownCollectBottles() {
        this.bottleCollect -= 19.9;
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

    hitEndboss() {
        this.endbossEnergy -= 5;
        if (this.endbossEnergy < 0) {
            this.endbossEnergy = 0;
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