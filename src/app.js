const PIXI = require('pixi.js');
const Car = require('./car.js');
const Bump = require('bump.js');
const Controller = require('./controller.js');
const Vec = require('./vec');
const Map = require('./map');

const Container = PIXI.Container;
const autoDetectRenderer = PIXI.autoDetectRenderer;
const loader = PIXI.loader;
const resources = PIXI.loader.resources;
const TextureCache = PIXI.utils.TextureCache;
const Texture = PIXI.Texture;
const Sprite = PIXI.Sprite;
const Graphics = PIXI.Graphics;
const b = new Bump(PIXI);

const ctrl = new Controller({
    forward: 38,
    backward: 40,
    left: 37,
    right: 39
});
const stage = new Container();
const renderer = autoDetectRenderer();

let circle;
let car;

document.body.appendChild(renderer.view);

let map = new Map("/assets/map.png");

loader
    .add('car', "assets/car.png")
    .add('map', "assets/map.png")
    .load(setup);

function setup() {



    let floor = new Sprite(TextureCache["assets/map.png"]);
    //floor.beginFill(0xaaaaaa);
    //floor.drawRect(10, 10, 1000, 600);
    //floor.endFill();
    stage.addChild(floor);


    circle = new Graphics();
    circle.beginFill(0x9966FF);
    circle.drawCircle(0, 0, 16);
    circle.endFill();
    circle.x = 64;
    circle.y = 130;
    circle.radius = 16;
    stage.addChild(circle);

    let sprite = new Sprite(TextureCache["assets/car.png"]);
    sprite.scale.x = 0.3;
    sprite.scale.y = 0.3;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    car = new Car(ctrl, sprite, 100,100,2);
    stage.addChild(sprite);

    resize();
    gameLoop();
}

function gameLoop(){
    requestAnimationFrame(gameLoop);
    car.update(map);
    renderer.render(stage);
}

window.addEventListener("resize", resize);

function resize() {
    let w = window.innerWidth;
    let h = window.innerHeight;

    renderer.resize( w, h );

}