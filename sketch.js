var PLAY = 1;
var END = 0;
var gameState = PLAY;
var sword, swordImage;
var apple, appleImage;
var banana, bananaImage;
var orange, orangeImage;
var strawberry, strawberryImage;
var watermelon, watermelonImage;
var monster, monsterImage;
var fruits, fruitGroup;
var enemy, enemyGroup;
var gameOver, gameOverImage;
var gameOverSound;
var knifeSwooshSound;
var score;

function preload()
{
  swordImage = loadImage("sword.png");
  
  appleImage = loadImage("apple.png");
  bananaImage = loadImage("banana.png");
  orangeImage = loadImage("orange.png");
  strawberryImage = loadImage("strawberry.png");
  watermelonImage = loadImage("watermelon.png");
  
  monsterImage = loadImage("virus.jpg");
  gameOverImage = loadImage("gameOver-1.png");
  
  gameOverSound = loadSound("gameOver.mp3");
  knifeSwooshSound = loadSound("knifeSwoosh.mp3");
}


function setup() 
{
  createCanvas(500, 500);
  
  sword = createSprite(40,200,20,20);
  sword.addImage("sword",swordImage);
  sword.scale = 0.2;
  
  sword.setCollider("rectangle",0,0,40,40);
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  score = 0;
}

function draw() 
{ 
  background(255);
  
  textSize(25);
  fill(0);
  text("Score: "+ score,200,30);
  
  if(gameState === PLAY)
  {
    spawnFruits();
    spawnEnemy();
    
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    
    if(fruitGroup.isTouching(sword))
    {
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score = score + 2;
    }
  
    else if(enemyGroup.isTouching(sword))
    {
      gameState = END;
      
      gameOverSound.play();
      
      gameOver = createSprite(250,250,20,20);
      gameOver.addImage("gameOver-1",gameOverImage);
      gameOver.scale = 0.9;
      
      sword.y = World.mouseY;
      sword.x = World.mouseX;
      
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      fruitGroup.setVelocityXEach(0);
      enemyGroup.setVelocityXEach(0);
    }
  }  
  drawSprites();  
}

function spawnFruits()
{
  if (frameCount % 80 === 0) 
  {
     position = Math.round(random(1,2));
     fruit = createSprite(400,200,20,20);
     console.log(position);
     
    if(position==1)
    {
      fruit.x=400;
      fruit.velocityX=-(7+(score/4));
    }
    else
    {
      if(position==2)
      {
        fruit.x=0;
        fruit.velocityX= (7+(score/4));
      }
    }
    fruit.scale=0.1;
  
     r = Math.round(random(1,5));
     if (r == 1)
     {
       fruit.addImage(appleImage);
     } else if (r == 2)
     {
       fruit.addImage(bananaImage);
     } else if (r == 3)
     {
       fruit.addImage(orangeImage);
     } else if (r == 4)
     {
       fruit.addImage(strawberryImage);
     } else 
     {
       fruit.addImage(watermelonImage);
     }
 
     fruit.y = Math.round(random(50,340));
     fruit.x = Math.round(random(50,340));
    
     fruit.velocityX = -4;
     fruit.setLifetime = 100;
    
     fruitGroup.add(fruit);
  }
}

function spawnEnemy()
{
  if (World.frameCount % 200 === 0) 
  {
     monster = createSprite(400,200,20,20);
     monster.addAnimation("moving",monsterImage);
     monster.y = Math.round(random(100,300));
     monster.setLifetime = 50;
     monster.velocityX = -(8+(score/10));
     monster.scale = 0.3;
    
     enemyGroup.add(monster);
  }
}