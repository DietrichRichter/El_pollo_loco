class MovableObject {
    position_x = 120;
    position_y;
    height = 240;
    width = 122;
    speed;
    img;
    imageCache = {};
    currenImage = 0;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;


    /**
     * Mit dieser Funktion wird ein Objekt gezeichnet
     * @param {*} ctx gibt den canvas an
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.position_x, this.position_y, this.width, this.height);
    }


    /**
     * Mit dieser Funktion wird ein Rand um jedes Objekt gelegt
     * @param {*} ctx gibt den canvas an
     */
    drawFrame(ctx) {
        if (this.instanceOfObjects()) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.position_x, this.position_y, this.width, this.height);
        ctx.stroke();
        }
    }


    /**
     * Diese Funktion gibt alle Objekte zuück, die umrandet werden sollen
     * @returns Objekte
     */
    instanceOfObjects () {
        return this instanceof Character || this instanceof BottleGround || this instanceof Coin || this instanceof Endboss || this instanceof NormalChicken || this instanceof SmallChicken
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
     * Mit dieser Funktion werden die einzelnen Bilder geladen
     * @param {Pfad} path der Pfad der einzelnen Bilder wird an path weitergegeben
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Mit dieser Funktion werden alle Bilder in das ImageCache JSON geladen
     * @param {array} array Das gibt die einzelnen Quellen der Bilder weiter
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
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
     * Mit dieser Funktion wird ein Array mit den Bildern durchiteriert
     * @param {*} images wird an eine weitere Funktion weitergegeben
     */
    playAnimation(images) {
        let i = this.currenImage % this.IMAGES_WALKING.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currenImage++
    }


    jump() {
        this.speedY = 28;
    }
}