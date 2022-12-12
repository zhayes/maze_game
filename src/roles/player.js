import Sustance from "./substance.js";
import Bullet from "./bullet.js";
import {set_keydown_control, set_keyup_control, map_obstacles_collision_detection, dynamic_roles_collision_detection} from "../utils/index.js";

export default class Player extends Sustance{
    is_running = false;
    global_game = null;

    init_fire_rate = 5;

    fire_speed = 6;

    fire_rate = this.init_fire_rate;

    current_collision_items = [];

    constructor(options){
        super(options);

        this.color = options.color;
        this.speed = options.speed || 1;
        this.is_barrier = true;

        this.set_keyboard();
    }


    update=(game)=>{
        this.global_game = game;

        this.is_running && this.run(this.speed);
        
        if(this.is_outof_screen(game)){
            this.run(this.speed*-1);
        }

        this.current_collision_items = this.get_collipsion_barriers(game);
        if(this.current_collision_items.length){
            
            this.run(this.speed*-1);
            this.current_collision_items.forEach((item)=>{
                if(item.is_my_name("monster")){
                    this.health_point--;
                    if(this.health_point<=0){//生命值耗尽，游戏结束
                        //game.remove_role(this);
                        game.over();
                    }
                }
            })
        }
        
        const {x, y} = this.position;

        game.ctx.fillStyle = this.color;
        game.ctx.fillRect(x, y, this.width, this.height);

        this.show_health_point(game);

        if(this.is_fire){
            this.fire();
        }
    }

    turn_left=()=>{
        this.set_direction("left");
        this.is_running = true;
    }

    trun_right=()=>{
        this.set_direction("right");
        this.is_running = true;
    }

    turn_top=()=>{
        this.set_direction("top");
        this.is_running = true;
    }

    turn_bottom=()=>{
        this.set_direction("bottom");
        this.is_running = true;
    }

    stop = ()=>{
        this.is_running = false;
    }

    set_keyboard=()=>{
        set_keydown_control(["w", "ARROWUP"], this.turn_top);
        set_keydown_control(["s", "ARROWDOWN"], this.turn_bottom);
        set_keydown_control(["a", "ARROWLEFT"], this.turn_left);
        set_keydown_control(["d", "ARROWRIGHT"], this.trun_right);

        set_keyup_control([
            "w", 
            "s", 
            "a", 
            "d", 
            "ARROWUP", 
            "ARROWDOWN", 
            "ARROWLEFT", 
            "ARROWRIGHT"
        ], this.stop)

        set_keydown_control(["BACKSPACE"], this.open_door);

        set_keydown_control(["j"], ()=>(this.set_fire_status(true)));
        set_keyup_control(["j"], ()=>(this.set_fire_status(false)));
    }

    set_fire_status = (val)=>{
        if(val){
            this.is_fire = true;
        }else{
            this.is_fire = false;
            this.fire_rate = this.init_fire_rate;
        }
    }

    open_door=()=>{
        if(this.current_collision_items.length){
            this.current_collision_items.forEach((obj)=>{
               if(obj.is_my_name("door")){
                obj.open_door();
               }
            })            
        }
    }

    set_bullet_position = (direction)=>{
        const position =  {
            x: this.position.x+(this.width/2) - 2,
            y: this.position.y+(this.height/2) - 2
        }

        if(direction==="top"){
            position.y -=this.height/2;
        }

        if(direction==="right"){
            position.x += this.width/2;
        }

        if(direction==="bottom"){
            position.y += this.width/2;
        }

        if(direction==="left"){
            position.x -= this.width/2;
        }

        return position;
    }

    fire=()=>{
        if(!this.global_game) return;

        if(this.fire_rate===this.init_fire_rate){
            const bullet = new Bullet({
                name: "bullet",
                width: 4,
                height: 4,
                color: "#fff",
                speed: this.fire_speed,
                direction: this.direction,
                position: this.set_bullet_position(this.direction)
            })
    
            this.global_game.add_dynamic_role(bullet);
    
        }

        this.fire_rate--;

        if(this.fire_rate<=0){
            this.fire_rate = this.init_fire_rate;
        }
    }
}