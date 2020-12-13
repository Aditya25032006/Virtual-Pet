//Create variables here
var dog,DogImg;
var happyDog;
var database;
var foodS;
var foodStock;



function preload()
{
  //load images here
  DogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();



  dog = createSprite(250,250,1,1);
  dog.addImage(DogImg)
  dog.scale=0.3;
  

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);


}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
     writeStock(foodS);
    dog.addImage(happyDog);
  }

  textSize(20);
  stroke(4);
  fill("white");
  drawSprites();
  //add styles here

  text("FoodStock :"+foodS,175,100);
  text("Press Up Arrow to feed the Dog",110,50);
  


}

function readStock(data){
  foodS = data.val();
}

function writeStock(x) {

  if(x<=0){
    x = 0;
  }else{x=x-1;
  }

  database.ref('/').update({
    Food : x
  })
}
