var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var player1;
var opponent1,opponent1over;


var player2;
var opponent2,opponent2over;
var bell;

var player3;
var opponent3,opponent3over;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

var gameOver,gameOver1;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  opponent1 = loadAnimation("opponent1.png","opponent2.png"); 
   opponent2 = loadAnimation("opponent4.png","opponent5.png");
   opponent3 = loadAnimation("opponent7.png","opponent8.png");
  
  gameOver = loadAnimation("gameOver.png");
  

}

function setup(){
  
createCanvas(500,300);
  
  redcg= new Group();
  yellowcg= new Group();
  pinkcg= new Group();
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -4;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.addAnimation(mainRacerImg2);
mainCyclist.scale=0.07;
  
gameOver1 = createSprite(250,150,20,20);
gameOver1.addAnimation("end",gameOver);
gameOver1.scale=0.7;
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(keyWentDown(UP_ARROW)){
    gameState=PLAY;}
  if(keyWentDown(UP_ARROW)){
    distance=0}
  
  if(gameState===PLAY){
  
   mainCyclist.y = World.mouseY;
    
    gameOver1.visible = false;
    
  
   edges= createEdgeSprites();
   mainCyclist.collide(edges);
    
  distance = distance + Math.round(getFrameRate()/50);
    
   path.velocityX = -(4 + 2*distance/150);
   pinkcg.velocityX = -(4 + 2*distance/150);
   yellowcg.velocityX = -(4 + 2*distance/150);
   redcg.velocityX = -(4 + 2*distance/150);
    
    
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
}
  
if(mainCyclist.isTouching(pinkcg)){
    gameState=END;}
  if(mainCyclist.isTouching(yellowcg)){
    gameState=END;}
  if(mainCyclist.isTouching(redcg)){
    gameState=END;}
    
  if(gameState===END){

  gameOver1.visible = true;



   edges= createEdgeSprites();
   mainCyclist.collide(edges);

   path.velocityX = 0;
   pinkcg.setVelocityXEach(0);
   yellowcg.setVelocityXEach(0);
   redcg.setVelocityXEach(0);

   pinkcg.visible = false;
   yellowcg.visible = false;
   redcg.visible = false;

   gameOver.visible = true;

}
  

var select_player = Math.round(random(1,3));

if(frameCount % 60 == 0){
  if(select_player == 1){
  pinkCyclist();
  }
else if (select_player == 2){
  yellowCyclist();
}else{
  redCyclist();
}
  }
}

function pinkCyclist() {
  player1 = createSprite(540,Math.round(random(50,250),10,10));
  player1.addAnimation("ishaRunning",opponent1);
  player1.scale=0.065;
  player1.lifetime = 170;
  player1.velocityX = -4;
  pinkcg.add(player1);
}

function yellowCyclist() {
  player2 = createSprite(540,Math.round(random(50,250),10,10));
  player2.addAnimation("rinaRunning",opponent2);
  player2.scale=0.065;
  player2.lifetime = 170;
  player2.velocityX = -4;
  yellowcg.add(player2);
}

function redCyclist() {
  player3 = createSprite(540,Math.round(random(50,250),10,10));
  player3.addAnimation("ronRunning",opponent3);
  player3.scale=0.065;
  player3.lifetime = 170;
  player3.velocityX = -4;
  redcg.add(player3);
}