var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;



function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/huevo asustado.png")
  shooter_shooting = loadImage("assets/huevo enojado.png")

  bgImg = loadImage("assets/cocina.jpg")

  zombieImg = loadImage("assets/enemy.png")

  

}

function setup() {

  
  createCanvas(1450,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 0.27
  

//creando el sprite del jugador 
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.1
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //creando sprites para representar la vida sobrante
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creando un grupo para los zombis
    zombieGroup = new Group();
}

function draw() {
  background(0); 

  //moviendo al jugador arriba y abajo: volviéndolo compatible con juegos mobiles a traves de entrada táctil
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//liberar las balas y cambiar la imagen del tirador a posición de disparo cuando la barra espaciadora es presionada 
if(keyWentDown("space")){
  
  player.addImage(shooter_shooting)
  
 
}

//el jugador regresa a la imagen de la posición original una vez que dejamos de presionar la barra espaciadora
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}


//destruir al zombi cuando el jugador lo toca
if(zombieGroup.isTouching(player)){
 

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
       } 
 }
}

//llamar a la función para generar zombis
enemy();

drawSprites();
}



//creando la función para generar zombis
function enemy(){
  if(frameCount%50===0){

    //dando posiciones "x" e "y" aleatorias para la aparición de los zombis
    zombie = createSprite(1460,random(100,600),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.4
    zombie.velocityX = -7
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 520
   zombieGroup.add(zombie)
  }

}
