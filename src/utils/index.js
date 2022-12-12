export const set_keydown_control = (key_code_strs=[], cb)=>{
    if(Array.isArray(key_code_strs)){
        key_code_strs.forEach((key_cod)=>{
            window.addEventListener("keydown", (e)=>{
                const key = e.key.toUpperCase();
        
                const upper_key = key_cod.toUpperCase();
        
                if(key===upper_key){
                    cb && cb(e);
                }
            })
        })
    }
    
}

export const set_keyup_control = (key_code_strs=[], cb)=>{
    if(Array.isArray(key_code_strs)){
        key_code_strs.forEach((key_cod)=>{
            window.addEventListener("keyup", (e)=>{
                const key = e.key.toUpperCase();
        
                const upper_key = key_cod.toUpperCase();
        
                if(key===upper_key){
                    cb && cb(e);
                }
            })
        })
    }
}


export const collision_detection = (target_1, target_2)=>{
    if(!target_1 || !target_2 || target_1===target_2) return false;

    const x_1 = target_1.position.x;
    const y_1 = target_1.position.y;

    const x_2 = target_2.position.x;
    const y_2 = target_2.position.y;

    const x_crossing = Math.abs((x_1+(target_1.width/2)) - (x_2+(target_2.width/2))) < (target_1.width/2)+(target_2.width/2);
    const y_crossing = Math.abs((y_1+(target_1.height/2)) - (y_2+(target_2.height/2))) < (target_1.height/2)+(target_2.height/2);

   return x_crossing && y_crossing;
}


export const get_collision_target = (self, target)=>{
    return collision_detection(self, target) ? target : null;
}


export const get_map_row_column_max_min_index = (target)=>{
    const {x, y} = target.position;

    const min_x_index = Math.floor(x/30);
    const max_x_index = Math.ceil(x/30) + 1;

    const min_y_index = Math.floor(y/30);
    const max_y_index = Math.ceil(y/30) + 1;

    return [[min_x_index, max_x_index], [min_y_index, max_y_index]];
}


export const map_obstacles_collision_detection = (target, game)=>{
    const [[min_x_index, max_x_index], [min_y_index, max_y_index]] = get_map_row_column_max_min_index(target);
    const map_items_position = game.map_items_position;
    const collision_items = [];

    for(let i=min_x_index; i<=max_x_index; i++){
        
        for(let j=min_y_index; j<=max_y_index; j++){
            const key = `${i*30}_${j*30}`;
            
            const map_item = map_items_position[key];

            if(map_item){
                const result = collision_detection(target, map_item);
                if(result && map_item.is_barrier){
                    collision_items.push(map_item)
                };
            }

        }
    }

    return collision_items;
}

export const dynamic_roles_collision_detection = (target, game)=>{
    for(let i=0; i<game.dynamic_roles.length; i++){
        if(game.dynamic_roles[i] && game.dynamic_roles[i].is_barrier && target!==game.dynamic_roles[i] && get_collision_target(target, game.dynamic_roles[i])){    
            return game.dynamic_roles[i];
        }
    }
}