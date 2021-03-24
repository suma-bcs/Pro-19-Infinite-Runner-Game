var blueBoy
var blueBoy_running;
var bg;
var bgImg;
var obstacle;
var obstacleImg;
var obstaclesGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOver;
var gameOverImg;
var restart;
var restartImg;
var score=0;

function preload(){
  blueBoy_running=loadImage('blueBoy.png')
  bgImg=loadImage('background.png')
  obstacleImg=loadImage('obstacle.png');
  gameOverImg=loadImage('GameOver.png');
  restartImg=loadImage('Restart.png')
  
}

function setup() {
  
  bg=createSprite(0,0,600,500);
  bg.addImage(bgImg);
  bg.scale=3.5;
  
  
  blueBoy=createSprite(100,400,20,20);
  blueBoy.addImage(blueBoy_running)
  blueBoy.scale=0.1;
  
  gameOver = createSprite(350,200,20,20);
 gameOver.addImage(gameOverImg); 
 gameOver.scale = 0.5;
  
 restart=createSprite(350,240,50,50);
 restart.addImage(restartImg); 
 restart.scale=0.5;
 
  
  obstaclesGroup=new Group();
  
  invisibleGround=createSprite(100,430,20,20)
  

 
}

function draw() {
 createCanvas(600,500);
  blueBoy.collide(invisibleGround);
  invisibleGround.visible=false;
   
  if(gameState===PLAY){
  gameOver.visible=false;
  
  
  restart.visible=false;
  
  if(keyDown("space")&& blueBoy.y >= 340) {
  blueBoy.velocityY = -12;
  
}
 blueBoy.velocityY =blueBoy.velocityY + 0.8;
  
  
  score = score + Math.round(getFrameRate()/60);
  bg.velocityX= -(4 + 3* score/100);
   if (bg.x < 300){
  bg.x = 400
}
  spawnObstacles();
    
    if(obstaclesGroup.isTouching(blueBoy)){
      gameState=END;
    }
  
  }
  
 if(gameState===END){
    gameOver.visible = true;
  restart.visible = true;
    blueBoy.visible=false;
    obstaclesGroup.destroyEach();
    bg.velocityX=0;
   blueBoy.velocityY=0;
  
  }
  
  if(mousePressedOver(bg)&&gameState===END){
   gameState=PLAY;
 blueBoy.visible=true;
 
 score=0;

 }
 
  drawSprites();
  fill('black'); 
 textSize(15); 
 text("Score: "+ score, 450,50); 
  
  
}

function spawnObstacles() {
 if (frameCount % 100 === 0){
  var obstacle = createSprite(600,380,10,40);
  obstacle.addImage(obstacleImg);
   obstacle.scale=0.2;
  obstacle.velocityX = -(4 + 3* score/100);
 obstacle.setCollider('rectangle',0,0,200,200)
  
  obstacle.lifetime = 300;
  obstaclesGroup.add(obstacle);
    
 }
}


 

