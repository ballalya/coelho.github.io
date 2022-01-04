const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var rope2_0, rope2_5;
var fruit_con, fruit_con2, fruit_con3;

var bg_img;
var food;
var rabbit;

var button;
var bunny;

var blink;

var eat;

var sad;

var som_fundo;
var som_tesourada;
var som_mastigando;
var som_fica_triste_nao;
var som_ia_a_chuva;

//var botao_ar;

var botao_silencioso;

var buttons;
var copia;

var canW, canH;


function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  som_fundo = loadSound("sound1.mp3");
  som_tesourada = loadSound("rope_cut.mp3");
  som_mastigando = loadSound("eating_sound.mp3");
  som_fica_triste_nao = loadSound("sad.wav");
  //som_ia_a_chuva = loadSound("air.wav");

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;

  eat.looping = false;
  sad.looping = false;
}

function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth+80,displayHeight);
  }
  else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth, windowHeight);
  }
  frameRate(80);

  som_fundo.play();
  som_fundo.setVolume(0.05);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(200,30);
  button.size(50,50);
  button.mouseClicked(drop);

  buttons = createImg("cut_btn.png");
  buttons.position(25,50);
  buttons.size(50,50);
  buttons.mouseClicked(drop2_0);

  copia = createImg("cut_btn.png");
  copia.position(420,110);
  copia.size(50,50);
  copia.mouseClicked(drop2_5);

 // botao_ar = createImg("balloon.png");
 // botao_ar.position(35,220);
 // botao_ar.size(120,100);
 // botao_ar.mouseClicked( airblow);

  botao_silencioso = createImg("mute.png");
  botao_silencioso.position(400,40);
  botao_silencioso.size(60,60);
  botao_silencioso.mouseClicked(mute);

  
  rope = new Rope(6,{x:220,y:30});
  rope2_0 = new Rope(8,{x:45,y:50});
  rope2_5 = new Rope(8,{x:445,y:110});
  ground = new Ground(200,canH,600,20);

  blink.frameDelay = 19;
  eat.frameDelay = 19;
  sad.frameDelay = 19;

  bunny = createSprite(400,canH-80,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;

  bunny.addAnimation("piscando",blink);
  bunny.addAnimation("comendo",eat);
  bunny.addAnimation("bem_triste",sad);
  bunny.changeAnimation("piscando");

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2_0,fruit);
  fruit_con3 = new Link(rope2_5,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2_0.show();
  rope2_5.show();

  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny)==true){
    bunny.changeAnimation("comendo");

    som_mastigando.play();
  }
  if(fruit!=null && fruit.position.y>=650){
    bunny.changeAnimation("bem_triste");
    som_fica_triste_nao.play();
    som_fica_triste_nao.setVolume(0.05);

    fruit = null;
  }

  drawSprites();
   
}

function drop()
{
  som_tesourada.play();

  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2_0()
{
  som_tesourada.play();

  rope2_0.break();
  fruit_con2.detach();
  fruit_con2 = null; 
}

function drop2_5()
{
  som_tesourada.play();

  rope2_5.break();
  fruit_con3.detach();
  fruit_con3 = null; 
}

function collide(body,sprite){
  if(body!=null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);

    if(d<=80){
      World.remove(engine.world, fruit);
      fruit = null;
      return true;
    }
  else{
    return false;
  }
  }
}
//function airblow(){
  //Matter.Body.applyForce(fruit, {x:0, y:0}, {x:0.01, y:0});
  //som_ia_a_chuva.play();
//}

function mute(){
  if(som_fundo.isPlaying()){
    som_fundo.stop();
  }
 else{
   som_fundo.play();
 } 
}