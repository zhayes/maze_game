import Sustance from "./substance.js";

export default class Wall extends Sustance{
    constructor(options){
        super(options);

        this.name = "path";
        this.is_barrier = false;
    }

    update(game){
        const ctx = game.ctx;
        const {x, y} = this.position;

        const image = game.all_images.grass;

        image && ctx.drawImage(image, 10, 40, this.width, this.height, x, y, this.width, this.height);
    }
}