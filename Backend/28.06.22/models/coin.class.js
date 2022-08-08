class Coin extends MovableObject {
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];
    width = 150;
    height = 150;
    position_y = 260;


    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.position_x = 200 + Math.random() * 4000;
        this.animate();
    }

    
    /**
    * Mit dieser Funktion wird die Hühnchen animiert. Die einzelnen Bilder werden in einer Endlosschleife angezeigt
    */
    animate() {
        setInterval(() => {
            let i = this.currenImage % this.IMAGES.length;
            let path = this.IMAGES[i];
            this.img = this.imageCache[path];
            this.currenImage++
        }, 200);
    }
}