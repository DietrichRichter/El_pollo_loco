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
        setInterval(() => {
            this.position_x += this.speed;
        }, 1000 / 60);
    }

    
    /**
     * Mit dieser Funktion bewegt sich ein Objekt nach links
     */
    moveLeft() {
        setInterval(() => {
            this.position_x -= this.speed;
        }, 1000 / 60);
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
}