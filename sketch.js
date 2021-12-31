var jax, jaxImg, jaxImg2;
var fundo, fundoImg;
var bomba, bombaImg;
var bombas;
var estado = "jogo"
//var x = Math.round(random(80,340))
function preload(){
  //imagens pré-carregadas
  jaxImg = loadAnimation("Runner-1.png", "Runner-2.png");
  jaxImg2 = loadAnimation("Runner-1.png");
  fundoImg = loadImage("path.png");
  bombaImg = loadImage("bomb.png");
}

function setup(){
  createCanvas(400,400);
  //crie sprite aqui
  fundo = createSprite(200,200,400,400);
  fundo.addImage(fundoImg);
  fundo.velocityY = 10;
  fundo.scale = 1.2;

  jax = createSprite(200,300,80,100);
  jax.addAnimation("running", jaxImg);
  jax.addAnimation("stoped", jaxImg2);
  jax.scale = 0.07;

  bombas = createGroup()
}

function draw() {
  background(0);
  drawSprites();
  
  funds();
  if(estado == "jogo"){
    gerarBombas();
    movimentoColisao();
    if(jax.isTouching(bombas)){
      fundo.velocityY = 0;
      estado = "fim";
      bomba.velocityY = 0;
      bomba.lifetime = -1
      jax.changeAnimation("stoped")
    }
  }

  
}

function movimentoColisao(){
  
  if(keyDown("RIGHT_ARROW") && estado == "jogo"){
    jax.x += 10
  }
  
  if(keyDown("LEFT_ARROW")){
    jax.x -= 10
  }

  if(jax.x > 340){
    jax.x = 340
  }

  if(jax.x < 60){
    jax.x = 60
  }

}

function funds(){

  if(fundo.y > 500){
    fundo.y = height/2
  }

}

function gerarBombas(){
  if(frameCount % 50 == 0){
     bomba = createSprite(Math.round(random(80,340)),-10);
     bomba.addImage(bombaImg);
     bomba.velocityY = 10
     bomba.scale = 0.1
     bomba.lifetime = 50;
     bombas.add(bomba)
  }

}