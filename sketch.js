//important matterJS variables
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world, body;

var board, die;
var bluePiece, blueSpaces, blueMoved;
var redPiece, redSpaces, redMoved;

function preload(){
  board = loadImage("sprites/background.png");
}

function drawDie(x, y, side){
  fill("white");
  strokeWeight(8);
  rectMode(CENTER);
  rect(x, y, 100, 100, 20);

  fill("black")
  strokeWeight(3);
  if(side === 1){
    circle(x, y, 20);
  }else if(side === 2){
    circle(x - 25, y - 25, 20);
    circle(x + 25, y + 25, 20);
  }else if(side === 3){
    circle(x - 25, y - 25, 20);
    circle(x, y, 20);
    circle(x + 25, y + 25, 20);
  }else if(side === 4){
    circle(x - 25, y - 25, 20);
    circle(x + 25, y + 25, 20);
    circle(x - 25, y + 25, 20);
    circle(x + 25, y - 25, 20);
  }else if(side === 5){
    circle(x - 25, y - 25, 20);
    circle(x + 25, y + 25, 20);
    circle(x, y, 20);
    circle(x - 25, y + 25, 20);
    circle(x + 25, y - 25, 20);
  }else if(side === 6){
    circle(x - 25, y - 25, 20);
    circle(x + 25, y + 25, 20);
    circle(x - 25, y + 25, 20);
    circle(x + 25, y - 25, 20);
    circle(x - 25, y, 20);
    circle(x + 25, y, 20);
  }
}

function checkForBlueUpsAndDowns(){
  //ladders
  if(blueSpaces === 2){
    Matter.Body.setVelocity(bluePiece.body, {x: 7, y: -13});
    blueSpaces = 23;
  }

  if(blueSpaces === 6){
    Matter.Body.setVelocity(bluePiece.body, {x: -6, y: -26});
    blueSpaces = 45;
  }

  if(blueSpaces === 20){
    Matter.Body.setVelocity(bluePiece.body, {x: 7, y: -26});
    blueSpaces = 59;
  }

  if(blueSpaces === 57){
    Matter.Body.setVelocity(bluePiece.body, {x: 7, y: -26});
    blueSpaces = 96;
  }

  if(blueSpaces === 28){
    Matter.Body.setVelocity(bluePiece.body, {x: 7, y: -13});
    blueSpaces = 49;
  }

  if(blueSpaces === 52){
    Matter.Body.setVelocity(bluePiece.body, {x: 0, y: -13});
    blueSpaces = 72;
  }

  if(blueSpaces === 71){
    Matter.Body.setVelocity(bluePiece.body, {x: -7, y: -13});
    blueSpaces = 92;
  }

  //snakes
  if(blueSpaces === 43){
    Matter.Body.setVelocity(bluePiece.body, {x: 7, y: 20});
    blueSpaces = 17;
  }

  if(blueSpaces === 50){
    Matter.Body.setVelocity(bluePiece.body, {x: -32, y: 26});
    blueSpaces = 5;
  }

  if(blueSpaces === 56){
    Matter.Body.setVelocity(bluePiece.body, {x: 20, y: 33});
    blueSpaces = 8;
  }

  if(blueSpaces === 73){
    Matter.Body.setVelocity(bluePiece.body, {x: -13, y: 38});
    blueSpaces = 15;
  }

  if(blueSpaces === 87){
    Matter.Body.setVelocity(bluePiece.body, {x: 12, y: 26});
    blueSpaces = 49;
  }

  if(blueSpaces === 84){
    Matter.Body.setVelocity(bluePiece.body, {x: -7, y: 13});
    blueSpaces = 63;
  }

  if(blueSpaces === 98){
    Matter.Body.setVelocity(bluePiece.body, {x: -14, y: 39});
    blueSpaces = 40;
  }
}

function setup() {
  //create canvas
  createCanvas(600,725);

  //setup
  engine = Engine.create();
  world = engine.world;

  //set gravity
  engine.world.gravity.y = 0;

  //create the die array
  die = [false, 1, 0, false, 0];
  //item 0 = if die is rolling
  //item 1 = current number displayed
  //item 2 = times to die will change
  //item 3 = blinking time or not
  //item 4 = blinking counter

  //create the pieces
  bluePiece = new BluePiece(20, 570, 40, 40);
  blueSpaces = 1;
  blueMoved = false;

  //redPiece = new RedPiece(40, 570, 40, 40);
  redSpaces = 1;
  redMoved = true;
}

function draw() {
  //draw the background
  background(158, 113, 79);  

  //update the engine
  Engine.update(engine);

  //draw the board
  image(board, 0, 0, 600, 600);

  //display the pieces
  bluePiece.display();
  //redPiece.display();

  //add a divider
  stroke("black");
  strokeWeight(8);
  
  line(0, 602.5, 600, 602.5);

  //draw die or make it blink or move it
  if(die[3] === false){
    drawDie(525, 665, die[1]);
  }else{
    if(die[4] % 2 === 0){
      drawDie(525, 665, die[1]);

      if(blueMoved === false && blueSpaces !== 100){
        if(blueSpaces % 10 === 0){
          bluePiece.moveUp();
        }else{
          var num = Math.floor(blueSpaces / 10);
          if(num === 0 || num === 2 || num === 4 || num === 6 || num === 8){
            bluePiece.moveRight();
          }else{
            bluePiece.moveLeft();
          }
        }
        blueMoved = true;
        blueSpaces++;
        console.log(blueSpaces);
      }
    }

    if(frameCount % 15 === 0){
      die[4]--;
      blueMoved = false;

      if(die[4] === 0){
        die[3] = false;
        die[0] = false;
        checkForBlueUpsAndDowns();
      }
    }
  }

  //make the die roll
  if(die[0] === true && die[2] > 0 && frameCount % 5 === 0){
    die[2]--;

    die[1]++;
    if(die[1] > 6){
      die[1] = 1;
    }

    if(die[2] === 0){
      die[3] = true;
      die[4] = die[1] * 2;
    }
  }
}

function keyPressed(){
  if (keyCode === 32 && die[0] === false) {
    die[0] = true;
    die[2] = round(random(12, 18));
  }
}