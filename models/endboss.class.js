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
    width = 230;
    height = 263.5
    position_x = 5000;
    position_y = 175;
    speed = 0.40;
    world;
    walk = true;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.animate();
    }


    /**
    * Mit dieser Funktion wird der Endboss animiert.
    */
    animate() {
        setInterval(() => {
            if (this.positionOfCaracter() > 4500) {
                this.attackEndbossAnimation();
            } else if (this.positionOfEndboss() > 4700) {
                this.moveEndbossAnimate();
            } else {
                this.alertEndbossAnimation();
            }
        }, 250);
        this.moveEndbossPosition();
    }


    /**
     * Mit dieser Funktion wird der Endboss bis zu einem bestimmten Punkt bewegt
     */
     moveEndbossPosition() {
        setInterval(() => {
            if (this.walk) {
                this.position_x -= this.speed;
            }
            if (this.position_x < 4690) {
                this.walk = false;
            }
        }, 1000 / 60);
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
        this.playAnimation(this.IMAGES_ALERT);
    }


    /**
     * Mit dieser Funktion wird die attackanimation vom Endboss ausgeführt
     */
    attackEndbossAnimation() {
        this.playAnimation(this.IMAGES_ATTACK);
    }


    /**
     * Die Position von dem Character wird zurückgegeben
     * @returns position_x
     */
    positionOfCaracter() {
        return this.world.character.position_x
    }


    /**
     * Die Position von dem Endboss wird zurückgegeben
     * @returns position_x
     */
    positionOfEndboss() {
        return this.position_x
    }
}