  var PLAY = 1;

  var END = 0;

  var gameState = PLAY;

  var player,playerImage;

  var coin,coinImage;

  var stone,stoneImage;

  var Background,Back_image;

  var stonesGroup;

  var coinsGroup;

  var score = 0;   

  var restart;
  
  var gameOver;

function preload(){
  
  playerImage = loadImage("f81158eae9a6257cdcd0bef382f31b51.png");
  
  coinImage = loadImage("f9da09a345b352d9f6cd4e59f66197c4.png");
  
  Background_image = loadImage("android-games_news.jpg");
  
  stoneImage = loadImage("grey-stone-rock-vector-clipart.png");
       
 restartImage = loadImage ("restart-refresh-video-game-asset-menu-icon-button-vector-14954463.jpg");
  
  gameOverImage = loadImage("download.png");
  
}

function setup() {
  
  createCanvas(600, 600);
  
  Background = createSprite(400,350,900,10);
  Background.addImage(Background_image);
  Background.scale = 2.2;

  player = createSprite(100,500);
  player.addImage(playerImage);
  player.scale = 0.09;
  
  gameOver = createSprite(300,300);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5
  
  restart = createSprite(300,380);
  restart.addImage(restartImage);
  restart.scale = 0.05;
  
  coinsGroup = new Group();
  
  stonesGroup = new Group();
  
  score = 0;
  
  edges = createEdgeSprites();
  
}

function draw() {  
  
  background("white");
  
  
  
  if(gameState === PLAY){
    
     gameOver.visible = false;
     restart.visible = false;
    
    Background.velocityX = -2;
    
    stroke("red"); 
  textSize(20); 
  fill("red"); 
  text("Score: "+ score, 100,50); 
  
  if(player.isTouching(coinsGroup)){    
    
    score = score+2;
    coinsGroup.destroyEach();   
     
     }
    
    if(Background.x<0) 
  { 
    Background.x=Background.width/2; 
  }
    
    if(keyDown("space")){
    
    player.velocityY = -12;     
     
     }
    
    
    
    player.velocityY = player.velocityY + 0.8;
    player.collide(edges[3]);
  
  spawnCoins();
  
  spawnStones();
    
    if(stonesGroup.isTouching(player)){
       
       gameState = END;
       
       }
     
     }
  else if(gameState === END){
    
    
    gameOver.visible = true;
    restart.visible = true;
    
    Background.velocityX = 0
    player.velocityY = 0;
    
   Background.velocityX = 0;
    player.velocityY = 0;
    
    stonesGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    
    stonesGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
    
  }
  
   
  drawSprites(); 
  
 stroke("red"); 
  textSize(20); 
  fill("red"); 
  text("Score: "+ score, 100,50); 
  
  
  
}

function spawnCoins() {
   
  if (frameCount % 80 === 0)
  { 
    coin = createSprite(600,250,40,10);
    coin.y = random(120,200);
    coin.velocityX = -5;
    coin.lifetime = 300; 
    player.depth = coin.depth + 1;
    coin.addImage(coinImage);
    coin.scale=0.03  ;
    coinsGroup.add(coin);
  } 
  
} 

function spawnStones() {
  if(frameCount % 300 === 0) 
  { 
    stone = createSprite(800,560,10,40);
    stone.velocityX = -6; 
    stone.addImage(stoneImage);
    stone.scale=0.05;
    stone.lifetime = 300;
    stonesGroup.add(stone);
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  stonesGroup.destroyEach();
  coinsGroup.destroyEach();
  
  score = 0;
  
}