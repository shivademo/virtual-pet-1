//Create variables here
var dog, happyDog, database, foodS, foodStock, dogImg

function preload()
{
	//load images here
  happyDog = loadImage("images/dogImg1.png");
  dogImg = loadImage("images/dogImg.png");
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250, 250);
  dog.addImage(dogImg);
  dog.scale = 0.5;

  database = firebase.database();

  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  

  
}


function draw() {  
  background(46, 139, 87);
  fill("white")
  textSize(20)
  text("Food Remaining "+ foodS,100,40)

  if(keyWentDown(UP_ARROW)){
    foodS = foodS-1
    if(foodS===0){
      text("Food Is Finished "+foodS,100,40)


    }else if(foodS>=0){
      writeStock(foodS)
      dog.addImage(happyDog)

    }
   
  }
  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
  console.log(foodS)

}

function writeStock(dogFood){
  database.ref('/').update({food:dogFood})
}



