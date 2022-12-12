import Sustance from "./substance.js";

export default class Monster extends Sustance{
    first_render = true;

    constructor(options){
        super(options);
        this.name = "monster";
        this.color =  "#d3552f";
        this.is_barrier = true;
        this.health_point = options.health_point || 0;
        this.speed = options.speed || 1;

        if(options.position){
            this.position = options.position;
        }else{
            this.random_position()
        }
    }

    random_position = ()=>{
        this.position.x = Math.ceil(Math.random()*(600-this.width));
        this.position.y = Math.ceil(Math.random()*(600-this.height));
    }


    update = (game)=>{
        const barriers = this.get_collipsion_barriers(game);

        if(barriers.length || this.is_outof_screen(game)){
            this.run(this.speed*-1);
            this.random_setting_direction();

            if(this.first_render){//防止初始化的位置与其他障碍物重叠；
                this.random_position();
                return;
            }
        }else{
            this.first_render  = false;
        }

        this.run(this.speed);

        const {x, y} = this.position;

        game.ctx.fillStyle = this.color;
        game.ctx.fillRect(x, y, this.width, this.height);

        this.show_health_point(game);
    }
}