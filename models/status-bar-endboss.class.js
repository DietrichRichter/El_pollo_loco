class StatusBarEndboss extends DrawableObject {
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ]
    percentageHealth = 100;


    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.setPercentageHealth(100);
        this.position_x = 4500;
        this.position_y = 0;
        this.width = 200;
        this.height = 60;
        this.otherDirection = true;
    }


    setPercentageHealth(percentageHealth) {
        this.percentageHealth = percentageHealth;
        let path = this.IMAGES_HEALTH[this.resolveImageIndexHealth()];
        this.img = this.imageCache[path];
    }


    resolveImageIndexHealth() {
        if (this.percentageHealth == 100) {
            return 5
        } else if (this.percentageHealth > 80) {
            return 4
        } else if (this.percentageHealth > 60) {
            return 3
        } else if (this.percentageHealth > 40) {
            return 2
        } else if (this.percentageHealth > 20) {
            return 1
        } else {
            return 0
        }
    }
}