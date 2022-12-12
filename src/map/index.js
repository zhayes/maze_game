import roles_map from './material.js';


export default class Map{
    item_list = [];

    constructor(map_data){
        this.map_data = map_data;
        this.init_items(this.map_data);
    }


    init_items(rows=[]){
        for(let y=0; y<rows.length; y++){
            const columns = rows[y];

            for(let x=0; x<columns.length; x++){

                const type = columns[x];
                
                if(roles_map[type]){
                    const barrier = roles_map[type]({
                        position:{
                            x: x*30,
                            y: y*30
                        }
                    })
    
                    this.item_list.push(barrier)
                };

                
            }
        }
    }
}