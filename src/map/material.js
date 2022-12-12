import Wall from '../roles/wall.js';
import Path from '../roles/path.js';
import Door from '../roles/door.js';

export default {
    1: ({position})=>{
        return new Wall({
            position
        })
    },
    2: ({position})=>{
        return new Path({
            position
        })
    },
    3: ({position})=>{
        return new Door({
            position,
            direction: "right",
        })
    },
    4: ({position})=>{
        return new Door({
            position,
            direction: "bottom"
        })
    },
    5: ({position})=>{
        return new Door({
            position,
            direction: "left"
        })
    },
    6: ({position})=>{
        return new Door({
            position,
            direction: "top"
        })
    }
}