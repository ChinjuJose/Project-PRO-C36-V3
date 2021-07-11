var dog, sadDog, happyDog;
var database;
var foodS, foodStock;
var addFood;
var foodObj;
var feed, lastFed, feedTime;

function preload() {
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);

  foodObj = new Food();

  foodStock = database.ref('food');
  foodStock.on("value", readStock);

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  feedButton = createButton("Feed Dog");
  feedButton.position(650, 95);
  feedButton.mousePressed(feedDog);

  addButton = createButton("Add Food");
  addButton.position(800, 95);
  addButton.mousePressed(addFood);

}

function draw() {
  background(46, 139, 87);
  foodObj.display();
  fill("white");

  feedTime = database.ref("feedTime");
  feedTime.on("value",function(data){
    lastFed = data.val();
  })

  if(lastFed!=undefined){
    if(lastFed>=12){
      text("Last Feed : "+ lastFed%12 + " PM", 350,30);
    }else if(lastFed==0){
      text("Last Feed : 12 AM",350,30);
    }else{
      text("Last Feed : "+ lastFed + " AM", 350,30);
    }
  }

  drawSprites();
}

function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog() {
  dog.addImage(happyDog);
  foodS--;
  database.ref('/').update({
    food:foodS,
    feedTime:hour()
  })
}

function addFood() {
  foodS++;
  database.ref('/').update({
    food: foodS
  })
}
