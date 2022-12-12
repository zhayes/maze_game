import Sustance from "./substance.js";

export default class Wall extends Sustance{
    constructor(options){
        super(options);

        this.name = "wall";
        
        this.is_barrier = true;

        this.is_light = false;

        //this.health_point = 2;
    }

    update(game){
        const ctx = game.ctx;
        const {x, y} = this.position;

        const image = this.is_light ? game.all_images.light_bg : game.all_images.dark_bg;

        image && ctx.drawImage(image, 100, 200, this.width, this.height, x, y, this.width, this.height);
    }
}