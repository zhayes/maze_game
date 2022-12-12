import Sustance from "./substance.js";

export default class Wall extends Sustance{
    constructor(options){
        super(options);

        this.name = "path";
    }

    update(game){
        const ctx = game.ctx;
        const {x, y} = this.position;

        const image = game.all_images.dark_bg;

        image && ctx.drawImage(image, 0, 450, this.width, this.height, x, y, this.width, this.height);
    }
}