import {map_obstacles_collision_detection, dynamic_roles_collision_detection} from "../utils/index.js";


export default class Sustance{
    global_game = null;

    constructor(otptions){
        const {name, health_point, speed, position, width, height, direction, is_running, is_useless, color, is_barrier} = otptions;

        this.name = name;//物体名称
        this.health_point = health_point || Infinity;//该物体的生命值
        this.speed = speed;//运动速度
        this.position = position || {};//位置;
        this.width = width || 30;//宽
        this.height = height || 30;//高
        this.direction = direction || "left";//默认方向
        this.is_running = is_running || true;//是否运动中
        this.is_useless = is_useless || false;//该字段用来标识垃圾回收。
        this.color = color;
        this.is_barrier = is_barrier || true;//是否为障碍物
    }

    is_outof_screen=(game)=>{
        return this.position.x<0 || this.position.y<0 || this.position.x+this.width>game.screen_width || this.position.y+this.height>game.screen_height
    }

    is_my_name = (name)=>{
        return name.toUpperCase()===this.name.toUpperCase();
    }

    run(speed){
        if(!this.is_running) return;
        const direction = this.direction;

        if(direction==='top'){
            this.position.y -= speed;
        }

        if(direction==='bottom'){
            this.position.y += speed;
        }

        if(direction==='left'){
            this.position.x -= speed;
        }

        if(direction==='right'){
            this.position.x += speed;
        }
    }

    reverse_direction = ()=>{
        if(this.direction==="left"){
            this.set_direction("right")
        }

        if(this.direction==="top"){
            this.set_direction("bottom")
        }

        if(this.direction==="bottom"){
            this.set_direction("top")
        }

        if(this.direction==="right"){
            this.set_direction("left")
        }

        this.speed = this.speed*-1;
    }

    set_direction(direaction_str){
        this.direction = direaction_str;
    }

    get_collipsion_barriers = (game)=>{
        const barriers = map_obstacles_collision_detection(this, game);
        const collision_dynamic_item = dynamic_roles_collision_detection(this, game);
        if(collision_dynamic_item){
            barriers.push(collision_dynamic_item);
        }

        return barriers;

    }

    random_setting_direction = ()=>{
        const directions = ["top", "bottom", "left", "right"];
        const index = Math.floor(Math.random()*4);
        this.direction = directions[index];
    }

    show_health_point = (game)=>{
        if(!this.health_point) return;

        const {x, y} = this.position;

        game.ctx.fillStyle = "#000";
        game.ctx.font = `20px Verdana`;
        game.ctx.textAlign = "center";
        game.ctx.fillText(this.health_point, x+(this.width/2), y+(this.height/2)+7);
    }
}