
export default class Game{
    //保存游戏所有角色的列表。整个游戏将一直循环遍历更新该列表里的角色对象。
    roles = [];

    dynamic_roles = [];

    all_images = {};

    is_over = false;

    //初次渲染地图的时候，将所有地图上的元素对象保存在这个集合里面（见 renderMap 方法），同时地图元素对象也会被添加到roels队列里面。
    //用这个集合保存地图元素，目的是为了后面做碰撞检测的时候可以快速查找。
    //为了提高碰撞检测的效率，检测地图上的碰撞元素，不是去遍历roles里所有的对象，
    //而是选取地图上位于玩家对象附近的几个元素进行检测（见 utils/index.js 里的 map_obstacles_collision_detection 方法）。
    map_items_position = {};

    requestAnimationFrameId = null;

    constructor(config){
        const {el, images, width, height} = config;
        const ctx = el.getContext("2d");

        this.ctx = ctx;

        el.width = width;
        el.height = height;

        this.screen_width = width;
        this.screen_height = height;

        //加载完所有图片资源后启动游戏
        images && this.loadImages(images).then((img_list)=>{
            img_list.forEach(({name, image})=>{
                this.all_images[name] = image;
            });

            this.setup();//启动游戏
        })
    }

    update=()=>{
        if(this.is_over){
            window.cancelAnimationFrame(this.requestAnimationFrameId);

            this.show_over_text();
            return
        }

        this.ctx.clearRect(0, 0, this.screen_width, this.screen_height);

        this.roles.forEach((role, i)=>{
            role && role.update && role.is_useless===false && role.update(this);

            if(role && role.is_useless){
                //清除无用的角色;
                const {x, y} = this.roles[i].position;
                delete this.map_items_position[`${x}_${y}`];
                this.roles.splice(i, 1);
                this.dynamic_roles.forEach((item, j)=>{
                    if(role===item){
                       this.dynamic_roles.splice(j, 1);
                    }
                })                
            }
        })

        this.requestAnimationFrameId = window.requestAnimationFrame(this.update);
    }

    add_static_role=(role_item)=>{
        this.roles.push(role_item);
    }

    add_dynamic_role = (role_item)=>{
        this.roles.push(role_item);
        this.dynamic_roles.push(role_item);
    }

    setup=()=>{
       this.update();
    }

    stop=()=>{
        this.is_over = true;
    }

    loadImages=(image_map=[])=>{
        const names = Object.keys(image_map);

        const promise_list = [];

        for(let i=0; i<names.length; i++){
            const name = names[i];
            const url = image_map[name];

            promise_list.push(new Promise((resolve, reject)=>{
                const image = new Image();
                image.onload = ()=>{
                    resolve({name, image});
                }

                image.src = url;
            }))
        }

        return Promise.all(promise_list);
    }

    renderMap=(map)=>{
        const {item_list} = map;

        item_list.forEach((item)=>{
            this.map_items_position[`${item.position.x}_${item.position.y}`] = item;

            this.add_static_role(item);
        })
    }

    remove_role = (role)=>{
        role.is_useless = true;
    }

    over=()=>{
        this.stop();
        this.show_over_text();
    }

    show_over_text = ()=>{
        this.ctx.save();
        this.ctx.font = "80px Comic Sans MS";
        this.ctx.fillStyle = "#fff";
        this.ctx.textAlign = "center";
        this.ctx.fillText('GAME OVER', this.screen_width / 2, this.screen_height / 2 -40);
        this.ctx.restore();
    }
}