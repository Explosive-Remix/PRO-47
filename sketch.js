var path,boy,cash,powerUp,jwellery,sword;
var pathImg,boyImg,cashImg,powerUpImg,jwelleryImg,asteroidImg;
var treasureCollection = 0;
var cashG,powerUpG,jwelleryG,asteroidGroup;
var backgroundImg
var spaceshipImg
var bullet2
//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  powerUpImg = loadImage("SpeedBoost2.png");
  jwelleryImg = loadImage("jwell.png");
  asteroidImg = loadImage("pink.png");
  spaceshipImg = loadImage("player.png")
  backgroundImg = loadImage("background1.png")
  bullet2 = loadImage("bullet3.png")
  endImg =loadAnimation("gameOver.png");
  
}

function setup(){
  
  createCanvas(400,600);
  background(backgroundImg)
// Moving background
path=createSprite(200,300);
path.addImage(backgroundImg);
path.velocityY = 4;
if(path.y > 400 ){
  path.y = height/2;
}

//creating boy running
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",spaceshipImg);
boy.scale=0.2
  
  
cashG=new Group();
powerUpG=new Group();
jwelleryG=new Group();
asteroidGroup=new Group();



}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  if(keyDown("DOWN_ARROW")){
 bullet = createSprite(70,400,10,10)
 bullet.addImage(bullet2)
 bullet.x=boy.x
 bullet.velocityY = -4
 bullet.scale = 0.05
 
 
  }
  createCash();
    createPowerUp();
    createJwellery();
    createAsteroids();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (powerUpG.isTouching(boy)) {
      powerUpG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else{
      if(asteroidGroup.isTouching(boy)) {
        gameState=END;
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x=200;
        boy.y=300;
        boy.scale=0.6;
        
        cashG.destroyEach();
        powerUpG.destroyEach();
        jwelleryG.destroyEach();
        asteroidGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        powerUpG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        asteroidGroup.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createPowerUp() {
  if (World.frameCount % 200 == 0) {
  var powerUp = createSprite(Math.round(random(50, 350),40, 10, 10));
  powerUp.addImage(powerUpImg);
  powerUp.scale=0.08;
  powerUp.velocityY = 3;
  powerUp.lifetime = 150;
  powerUpG.add(powerUp);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createAsteroids(){
  if (World.frameCount % 160 == 0) {
  var asteroid = createSprite(Math.round(random(50, 350),40, 10, 10));
  asteroid.addImage(asteroidImg);
 // asteroid.scale=0.1;
  asteroid.velocityY = 3;
  asteroid.lifetime = 150;
  asteroidGroup.add(asteroid);
  }
}