class Coin extends MovableObject {
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];
    width = 150;
    height = 150;
    offset = {
        top: 70,
        left: 70,
        right: 70,
        bottom: 70,
    }


    constructor(position_x, position_y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.position_x = position_x
        this.position_y = position_y;
        this.animate();
    }

    
    /**
    * Mit dieser Funktion wird die Hühnchen animiert. Die einzelnen Bilder werden in einer Endlosschleife angezeigt
    */
    animate() {
        setStoppableInterval(() => {
            let i = this.currenImage % this.IMAGES.length;
            let path = this.IMAGES[i];
            this.img = this.imageCache[path];
            this.currenImage++
        }, 200);
    }
}