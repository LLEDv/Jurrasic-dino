var trex ,trex_running;

var solo,imagemsolo;

var jogo = "play"

var pontos = 0

function preload(){
  imagemsolo = loadImage ("ground2.png")
  trex_running = loadAnimation("t.rex.movimentar1.png","t.rex.movimentar2.png", "Trex.Inicial.png");
  imagemf = loadAnimation ("trex.rip.png")
  imagemnpz = loadImage ("Nuvem1.png")
  imagemctv = loadImage ("cacto1.png")
  imagemctq = loadImage ("cacto2.png")
  imagemctp = loadImage ("cacto5.png")
  imagemgrr = loadImage ("Gorro.png")
  imagemperdeu = loadImage ("gameOver.png")
  imagemresusitar = loadImage ("restart.png")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
   solo2 = createSprite (50,height/2+110,width,5)
   solo2.visible = false 
   solo = createSprite (300,height/2+106,600,10)
   solo.addImage (imagemsolo) 
   solo.velocityX = -5  
   solo.scale = 1.2
  //crie um sprite de trex
  trex = createSprite(50,height/2,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("f",imagemf);
  trex.scale = 0.5    
  //gorro de natal (dino)
  natal = createSprite(50,160,20,50)
  natal.addImage(imagemgrr)
  natal.scale = 0.3
  Groupocacto = new Group()
  Groupnuvem = new Group()
  //game over
   spritegameover = createSprite (width/2,height/2)
   spritegameover.addImage(imagemperdeu)
   spritereviver = createSprite (width/2,height/2+10)
   spritereviver.addImage(imagemresusitar)
   spritereviver.scale = 0.5
   spritegameover.visible = false
   spritereviver.visible = false 
}

function draw(){
  natal.y = trex.y - 33
  natal.x = trex.x + 8
  natal.rotation = -6
  background("lightyellow")
  fill ("orange")
  text (pontos,width/2,290)
  
  drawSprites(); 
  if(jogo == "play") {
    if ( touches.length >0 &&trex.collide(solo2)) {
      trex.velocityY = -6.5;
      touches = [] 
  }
  if (solo.x<0) {
    solo.x = solo.width /2 
 }
 nuv ()
 cto () 
 pontos = pontos + Math.round (getFrameRate()/62)
 if(trex.isTouching(Groupocacto)){
   jogo = "Tentarnovamente"
spritereviver.visible = true
spritegameover.visible = true }
}   
  trex.velocityY += 0.2
  trex.collide (solo2)
  console.log(trex.y)
  if(jogo == "Tentarnovamente"){
    solo.velocityX = 0
    Groupocacto.setVelocityXEach(0)
    Groupocacto.setLifetimeEach(-1)
    Groupnuvem.setVelocityXEach(0)
    Groupnuvem.setLifetimeEach(-1)
    trex.changeAnimation("f")
  
 if (touches.length >0)
 {touches = []
  jogo = "play"
  Groupocacto.destroyEach()
  Groupnuvem.destroyEach()
  spritegameover.visible = false
  spritereviver.visible = false
  solo.velocityX = -5 *pontos /30
  trex.changeAnimation("running")
  pontos = 0
  }
 }
}
function nuv (){
  if (frameCount%60==0) {
  npv = createSprite (-10,60)
  npv.addImage (imagemnpz)
  npv.velocityX = 5
  npv.y = random (40,114)
  npv.lifetime = 262 
  npv.depth = 1 
  trex.depth = 2
  natal.depth = 3
  Groupnuvem.add (npv)
}
 }
 function cto(){
   if (frameCount%200==0) {
   ctv = createSprite (width,height/2+103)
   ctv.velocityX = -5 *pontos / 30
   var numero = Math.round (random(1,3))
   switch(numero) {
     case 1: ctv.addImage (imagemctv) 
     break 
     case 2: ctv.addImage (imagemctq)
     break
     case 3: ctv.addImage (imagemctp)
     break
   }
  ctv.lifetime = 262
  ctv.scale = 0.6   
  Groupocacto.add(ctv)
  }
}
 