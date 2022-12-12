import Sustance from "./substance.js";

export default class Bullet extends Sustance{
    constructor(options){
        super(options);
        this.position = options.position;
    }

    update=(game)=>{
        const {x, y} = this.position;

        game.ctx.fillStyle = this.color;

        game.ctx.fillRect(x, y, this.width, this.height);

        this.run(this.speed);

        if(this.is_outof_screen(game)){
            game.remove_role(this);
        }

        this.current_collision_items = this.get_collipsion_barriers(game);
        
        this.current_collision_items.forEach((item)=>{
            item.health_point--;

            if(item.health_point<=0){
                game.remove_role(item);
            };
            
            game.remove_role(this);
        })
    }
}