import Sustance from "./substance.js";

export default class Door extends Sustance{
    //各个方向的门
    door_position = {
        right: [100, 513],
        bottom: [65, 545],
        left: [62, 513],
        top: [97, 542],
    }

    constructor(options){
        super(options);

        this.name = "door";
        this.direction = options.direction || "right";
        this.is_barrier = true;

        this.is_open = false;
    }

    close_door = ()=>{
        this.is_open = false;
        this.is_barrier = true;

        this.close_door_cb && this.close_door_cb();
    }
    
    open_door = ()=>{
        this.is_open = true;
        this.is_barrier = false;

        this.open_door_cb && this.open_door_cb();
    }

    trigger_door = ()=>{
        if(this.is_open){
            this.close_door();
        }else{
            this.open_door();
        }
    }

    subscribe_cb = (call_name, cb)=>{
        this[call_name] = cb;
    }

    update(game){
        const ctx = game.ctx;
        const {x, y} = this.position;

        const image = game.all_images.dark_bg;

        const [sx, sy] = this.door_position[this.direction];

        if(!this.is_open){
            image && ctx.drawImage(image, sx, sy, this.width, this.height, x, y, this.width, this.height);
        }
    }
}