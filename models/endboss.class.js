class Endboss extends MovableObject {
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ]
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ]
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ]
    width = 230;
    height = 263.5
    position_x = 5000;
    position_y = 175;
    speed = 22.20;
    world;
    test = false;
    walk = true;
    endbossEnergy = 100;
    lastHitEndboss = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }


    /**
    * Mit dieser Funktion wird der Endboss animiert.
    */
    animate() {
        setStoppableInterval(() => {
            if (this.position_x > 4500) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            }
            if (this.position_x < 4500) {
                this.playAnimation(this.IMAGES_ALERT);
            }
            if (this.isHurtEndboss) {
                this.playAnimation(this.IMAGES_HURT);
            }
            if (this.endbossEnergy < 1) {
                this.playAnimation(this.IMAGES_DEAD);
            }
            if (this.world.character.position_x > 4000) {
                this.attackEndbossAnimation();
            }
        }, 250);
    }


    /**
     * Mit dieser Funktion wird der Endboss bis zu einem bestimmten Punkt bewegt
     */
    moveEndbossPosition() {
        if (this.walk) {
            this.moveLeft();
        }
        if (this.position_x < 4490) {
            this.walk = false;
        }
    }


    /**
     * Mit dieser Funktion wird die bewegunsanimation vom Endboss ausgeführt
     */
    moveEndbossAnimate() {
        this.playAnimation(this.IMAGES_WALKING);
    }


    /**
     * Mit dieser Funktion wird die alertanimation vom Endboss ausgeführt
     */
    alertEndbossAnimation() {
        let i = this.currenImage % this.IMAGES_ALERT.length;
        let path = this.IMAGES_ALERT[i];
        this.img = this.imageCache[path];
        this.currenImage++
    }


    /**
     * Mit dieser Funktion wird die attackanimation vom Endboss ausgeführt
     */
    attackEndbossAnimation() {
        let i = this.currenImage % this.IMAGES_ATTACK.length;
        let path = this.IMAGES_ATTACK[i];
        this.img = this.imageCache[path];
        this.currenImage++
    }


    /**
     * Die Position von dem Endboss wird zurückgegeben
     * @returns position_x
     */
    positionOfEndboss() {
        this.position_x
    }

    hitEndboss() {
        this.endbossEnergy -= 19.9;
        if (this.endbossEnergy < 0) {
            this.endbossEnergy = 0;
        } else {
            this.lastHitEndboss = new Date().getTime();
        }
    }

    isHurtEndboss() {
        let timepassed = new Date().getTime() - this.lastHitEndboss;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }
}