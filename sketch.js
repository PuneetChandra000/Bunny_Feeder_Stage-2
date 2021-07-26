// constants
const Engine =  Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

// declaring variables
let engine;
let world;
var rope,fruit,ground;
var con, con2;
var rope;

var bg_img;
var food, fruit;
var rabbit, bunny;

var button,button2;
var blink,eat,sad;

var plank, star;
var star_img, plank_img;
var bubble;
var bubble_img;

// The Preload Function
function preload(){

  // loading images
  bubble_img = loadImage("./assets/bubble.png")
  bg_img = loadImage("./assets/background.png");
  food = loadImage("./assets/melon.png");
  rabbit = loadImage("./assets/Rabbit-01.png");

  blink = loadAnimation("./assets/blink_1.png", "./assets/blink_2.png", "./assets/blink_3.png");
  eat = loadAnimation("./assets/eat_0.png" , "./assets/eat_1.png", "./assets/eat_2.png", "./assets/eat_3.png", "./assets/eat_4.png");
  sad = loadAnimation("./assets/sad_1.png", "./assets/sad_2.png", "./assets/sad_3.png");
  star_img = loadImage("./assets/star.png");

  // playing motion
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  // looping motion
  sad.looping= false;
  eat.looping = false; 

}

// The Setup Function
function setup() {

  // creating canvas
  createCanvas(500, 800);

  // setting frameRate
  frameRate(80);

  // creating engine
  engine = Engine.create();
  world = engine.world;

  // fruit options
   var fruit_options = {
    restitution: 0.8

  }

  // using classes to create rope, ground, link
  ground =new Ground(250, height-10, width,20);
  fruit = Bodies.circle(100, 400, 15, fruit_options);
  World.add(world, fruit);

  higherground =new Ground(300, 170, 100, 10);

  rope = new Rope(4, {x:230, y:330});
  rope2 = new Rope(4, {x:50, y:450});
  con = new Link(rope, fruit);
  con2 = new Link(rope2, fruit);

  // creating bunny and bubble
  bubble = createSprite(290, 460, 20, 20);
  bubble.addImage(bubble_img);
  bubble.scale = 0.1;

  bunny = createSprite(270, 100, 100, 100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;

  // slowing down the frames
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  // adding all animations
  bunny.addAnimation("blinking", blink);
  bunny.addAnimation("eating", eat);
  bunny.addAnimation("crying", sad);
  bunny.changeAnimation("blinking");

  //btn 1
  button = createImg("./assets/cut_btn.png");
  button.position(200, 320);
  button.size(50, 50);

  // btn 2
  button2 = createImg("./assets/cut_btn.png");
  button2.position(30, 420);
  button2.size(50, 50);
  button2.mouseClicked(drop);

  // ellipseMode
  ellipseMode(RADIUS);

}

// The Draw Function
function draw(){

  // backGround
  background(51);

  // img
  image(bg_img, 0, 0, width, height);

  // updating engine
  Engine.update(engine);

  // pushing 
  push();

  // imageMode
  imageMode(CENTER);

  // if condition
  if(fruit!=null){

    image(food, fruit.position.x, fruit.position.y, 70,70);

  }

  // popping
  pop();

  // showing all
  ground.show();
  higherground.show();
  rope.show();
  rope2.show();

  // if conditions
  if(collide(fruit,bunny,80)==true){
  
    remove_rope();
    bubble.visible = false;
    World.remove(engine.world,fruit);
    fruit = null;
    bunny.changeAnimation("eating");

  }
  
  if(collide(fruit,bubble,40) == true){
    
      engine.world.gravity.y = -1;
      bubble.position.x = fruit.position.x;
      bubble.position.y = fruit.position.y;

  }

  // drawing all the sprites
  drawSprites();

}

// function drop
function drop(){

  rope2.break();
  con2.dettach();
  con2 = null; 

}

// function remove_rope
function remove_rope(){

  rope.break();
  con.dettach();
  con = null; 

}

// collide function
function collide(body,sprite,x){

  if(body!=null){
        
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x){

            // returning
            return true; 

            }else{

              // returning
              return false;

            }

         }

}