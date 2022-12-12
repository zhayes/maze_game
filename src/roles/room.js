import Sustance from "./substance.js";
import roles_map from '../map/material.js';
import Monster from "./monster.js";

export default class Room extends Sustance{
    item_list = [];

    constructor(options){
        super(options);
        this.name = "room";

        const { data } = options;

        this.data = data || [];

        this.init_items(this.data);

        this.is_first_render = true;
    }

    update = (game)=>{
        if(!this.is_first_render){
            if(!this.item_list.filter(item=>!item.is_useless).length){
                game.remove_role(this);
            }
        }else{
            this.is_first_render = false;
            this.render_wall(game);
        };
        
        
    }

    init_items = (dataObj=[])=>{
        Object.keys(dataObj).forEach((key)=>{
            const [x, y] = key.split("_");

            
            const type = dataObj[key];

            const barrier = roles_map[type]({
                position:{
                    x: x*30,
                    y: y*30
                }
            })

            this.item_list.push(barrier)
        })
    }

    get_room_size_index = ()=>{
        const keys = Object.keys(this.data);
        let min_x = -1;
        let max_x = -1;
        let min_y = -1;
        let max_y = -1;

        keys.forEach((str)=>{
            const [x_index, y_index] = str.split("_");
            const x = Number(x_index);
            const y = Number(y_index);

            if(min_x===-1&&min_y===-1){
                min_x = x;
                min_y = y;
            }
            
            if(min_x>x){
                min_x = x;
            }

            if(min_y>y){
                min_y = y;
            }

            if(max_x<x){
                max_x = x;
            }

            if(max_y<y){
                max_y = y;
            }
        })

        return [[min_x, min_y], [max_x, max_y]]
    }

    random_position = ()=>{
        const [[min_x, min_y], [max_x, max_y]] = this.get_room_size_index();

        const x = Math.ceil(Math.random()*(max_x - min_x -1)) +  min_x;
        const y = Math.ceil(Math.random()*(max_y - min_y -1)) +  min_y;
    
        return {x: x*30 , y: y*30}
    }

    create_monster = ()=>{
        const size = Math.floor(Math.random()*20)+10;
        const monster = new Monster({
            height: size,
            width: size,
            position: this.random_position(),
            speed: Math.floor(Math.random()*10)+1,
            health_point: size<20 ? 0 : Math.ceil(Math.random()*10)+20
        })
        return monster;
    }

    render_wall = (game)=>{
        const data = this.item_list.map(element => {
            if(element.is_my_name("door")){
                element.subscribe_cb("open_door_cb", ()=>{
                    this.set_light(true);
                    game.add_dynamic_role(this.create_monster())
                })

                element.subscribe_cb("close_door_cb", ()=>{
                    this.set_light(false)
                })
            }

            return element;
        });
        
        game.renderMap({item_list: data});
    }

    set_light= (is_light)=>{
        this.item_list.forEach(item => {
            if(item && item.is_my_name("wall")){
                item.is_light = is_light;
            }
        });
    }
}