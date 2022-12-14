import Game from './game.js';
import map_data from '../map/data.js';
import Map from '../map/index.js';
import Player from '../roles/player.js';
import Monster from "../roles/monster.js";
import Room from "../roles/room.js";
import {room_data_1, room_data_2} from "../map/data.js";

export default (el_id_string="app", {width, height}={width: 600, height: 600})=>{
    const game = new Game({
        el: document.getElementById(el_id_string),
        width,
        height,
        images: {
            'dark_bg': './src/assets/img/tiles_final_sw.png',
            'light_bg': './src/assets/img/tiles_final_col11.png',
            'grass': './src/assets/img/SNES - Secret of Mana - High Grass.png'
        }
    });

    game.renderMap(new Map(map_data));

    game.add_static_role(new Room({data: room_data_1}));
    game.add_static_role(new Room({data: room_data_2}));

    game.add_dynamic_role(new Player({
        position: {x: 400, y:200},
        name: "player",
        color: "red",
        height: 20,
        width: 20,
        health_point: 10
    }));

    game.add_dynamic_role(new Monster({speed: 10, width: 10, height: 10}));
    game.add_dynamic_role(new Monster({speed: 3, width: 20, height: 20, health_point: 20}));
    game.add_dynamic_role(new Monster({speed: 1, width: 40, height: 40, health_point: 40}));
    game.add_dynamic_role(new Monster({speed: 2, health_point: 10}));
}