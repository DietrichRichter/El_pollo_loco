class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    showDrawFrame = false;
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
    AUDIO_BOTTLE_BREAK = new Audio('audio/bottle-breaking.mp3');
    AUDIO_BOTTLE_COLLECT = new Audio('audio/bottle-collect.mp3');
    AUDIO_COIN_COLLECT = new Audio('audio/coin-collect.mp3');
    AUDIO_HIT = new Audio('audio/hit.mp3');
    AUDIO_LOSE = new Audio('audio/lose.mp3');
    AUDIO_SOUNDTRACK = new Audio('audio/soundtrack.mp3');
    AUDIO_WIN = new Audio('audio/win.mp3');
    soundOn = false;


    constructor(canvas, keyboard, intervallIds) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.intervallIds = intervallIds;
        this.draw();
        this.setWorld();
        this.checkThrowObjects();
        this.checkCollision();
        this.playSoundTrack();
        this.AUDIO_SOUNDTRACK.volume = 0.05;
        this.AUDIO_HIT.volume = 0.2;
        this.AUDIO_WIN.volume = 0.2;
        this.AUDIO_LOSE.volume = 0.2;
    }


    /**
     * Mit dieser Funktion wird der Soundtrack abgespielt
     */
    playSoundTrack() {
        setStoppableInterval(() => {
            this.playAudio(this.AUDIO_SOUNDTRACK);
            this.stopAudio(this.AUDIO_SOUNDTRACK);
        }, 100);
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
     * Mit dieser Funktion wird ein Sound abgespielt
     * @param {*} sound gibt den Sound zurück
     */
    playAudio(sound) {
        if (this.soundOn) {
            sound.play();
        }
    }


    /**
     * Mit dieser Funktion wird ein Sound pausiert
     * @param {*} sound gibt den Sound zurück
     */
    stopAudio(sound) {
        if (this.soundOn == false) {
            sound.pause();
        }
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
                    this.playAudio(this.AUDIO_HIT);
                    this.theCharacterGetsHurt();
                }
            }
            this.throwableObjects.forEach((to, indexTo) => {
                if (enemy.isColliding(to)) {
                    this.playAudio(this.AUDIO_BOTTLE_BREAK);
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
                this.playAudio(this.AUDIO_COIN_COLLECT);
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
                this.playAudio(this.AUDIO_BOTTLE_COLLECT);
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
                this.theCharacterGetsHurt();
            }
            this.throwableObjects.forEach((to) => {
                if (boss.isColliding(to)) {
                    this.CollidionThrowableObjectWithEndboss(to);
                }
            })
        })
    }


    /**
     * Mit dieser Funktion wird dem Character schaden hinzugefügt und die energie nimmt ab
     */
    theCharacterGetsHurt() {
        this.character.hit(this.energy);
        this.statusBarHealth.setPercentageHealth(this.character.energy);
    }


    /**
     * Diese Funktion überprüft, ob eine geworfene Flasche mit dem Endboss kolidiert
     * @param {*} to gibt die geworfene Flasche zurück
     */
    CollidionThrowableObjectWithEndboss(to) {
        this.playAudio(this.AUDIO_BOTTLE_BREAK);
        this.deleteThrowableObject(to);
        this.level.endboss[0].hitEndboss();
        this.StatusBarEndboss.setPercentageHealthEndboss(this.level.endboss[0].endbossEnergy);
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
        this.addElementsToMap();
        this.addStatusBarToMap();
        this.showYouLoseScreen();
        this.showGameOverScreen();
        this.showBossEnergy();
        this.addCharacterAndThrowToMap();
        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * Mit dieser funktion werden die Objekte zu der Map hinzugefügt
     */
    addStatusBarToMap() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
    }


    /**
     * Mit dieser Funktion wird der Charakter und die geworfene Flasche der Map hinzugefügt
     */
    addCharacterAndThrowToMap() {
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * Mit dieser Funktion werden die einzelnen Objekte der Map hinzugefügt
     */
    addElementsToMap() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.cloud);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottleGround);
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * Mit dieser Funktion wird die Statusbar erst ab einer bestimmten x Koordinaten angezeigt
     */
    showBossEnergy() {
        if (this.isCharacterInTheAttackZone()) {
            this.addToMap(this.StatusBarEndboss);
        }
    }


    /**
     * Mit dieser Funktion wird überprüft, ob die Statusbar vom Endboss angezeigt werden kann
     * @returns die Position vom Character und isEndbossinAttackZone werden zurückgegeben
     */
    isCharacterInTheAttackZone() {
        return this.character.position_x > 4000 || this.level.endboss[0].isEndbossinAttackZone;
    }


    /**
     * Diese Funktion wird ausgeführt, wenn der Character stirbt
     */
    showYouLoseScreen() {
        if (this.character.energy == 0) {
            this.lastCollision.push(1);
        }
        if (this.lastCollision.length >= 100) {
            this.stopAudio(this.AUDIO_SOUNDTRACK);
            this.playAudio(this.AUDIO_LOSE);
            this.addToMap(this.youLose);
            this.showReplayButton();
            this.hiddenIcons();
            stopGame();
        }
    }


    /**
     * Diese Funktion wir ausgeführt, wenn der Endboss besiegt wurde
     */
    showGameOverScreen() {
        if (this.level.endboss[0].endbossEnergy < 1) {
            this.lastBottleWithBossCollision.push(1);
        }
        if (this.lastBottleWithBossCollision.length >= 100) {
            this.stopAudio(this.AUDIO_SOUNDTRACK);
            this.playAudio(this.AUDIO_WIN);
            this.addToMap(this.gameOver);
            this.showReplayButton();
            this.hiddenIcons();
            stopGame();
        }
    }


    /**
     * Mit dieser Funktion wird der Replay button angezeigt
     */
    showReplayButton() {
        document.getElementById('replay-button-container').classList.remove('d-none');
    }


    /**
     * Mit dieser Funktion werden beim anzeigen vom Endscreen die Icons entfernt
     */
    hiddenIcons() {
        document.getElementById('play-button').classList.add('d-none');
        document.getElementById('sound-off').classList.add('d-none');
        document.getElementById('sound-on').classList.add('d-none');
        document.getElementById('controller-on').classList.add('d-none');
        document.getElementById('controller-off').classList.add('d-none');
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
        this.showDrawFrameObjects(movableObject);
        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
    }


    /**
     * Mit dieser funktion werden die umrandungen von allen Objekten angezeigt
     * @param {*} movableObject gibt die bewegten Objekte zurück
     */
    showDrawFrameObjects(movableObject) {
        if (this.showDrawFrame) {
            movableObject.drawFrameObjects(this.ctx);
            movableObject.drawFrameNormalChicken(this.ctx);
            movableObject.drawFrameSmallChicken(this.ctx);
            movableObject.drawFrameEndboss(this.ctx);
            movableObject.drawFrameCharacter(this.ctx);
            movableObject.drawFrameCoin(this.ctx);
            movableObject.drawFrameBottleGround(this.ctx);
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