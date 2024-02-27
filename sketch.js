const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var ground1, base1;
var wall1, wall2, wall3, wall4, wall5, wall6;

var star1, star2, star3, star_display;
var cannon, cannonball;

var balls = [];
let stars = [];
var score = 0;

function preload(){
  backgroundImage = loadImage("assets/carnival_bg.jpg");
  starImg = loadImage("assets/clipart_star.png");
  empty_stars = loadAnimation("assets/three_empty_stars.png")
  one_star = loadAnimation("assets/one_star.png");
  two_star = loadAnimation("assets/two_stars.png");
  three_star = loadAnimation("assets/three_stars.png");
}

function setup() {
  createCanvas(1500,700);

  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15

  ground1 = new Ground(750,680,1500,50, color(140, 70, 20));

  cannon = new Cannon(160, 200, 130, 100, angle);

  //walls
	wall1 = new Ground(650, 600, 20, 120, color(140, 70, 20));
	wall2 = new Ground(810, 600, 20, 120, color(140, 70, 20));

  wall3 = new Ground(900, 580, 20, 160, color(140, 70, 20));
	wall4 = new Ground(1060, 580, 20, 160, color(140, 70, 20));

  wall5 = new Ground(1150, 560, 20, 200, color(140, 70, 20));
	wall6 = new Ground(1310, 560, 20, 200, color(140, 70, 20));
  
  //stars
  star1 = new Star(735, 610, starImg);
  stars.push(star1);
  star2 = new Star(985, 610, starImg);
  stars.push(star2);
  star3 = new Star(1235, 610, starImg);
  stars.push(star3);

  star_display = createSprite(160, 320, 30, 30);
  star_display.scale = 0.6;
  star_display.addAnimation("empty",empty_stars);
  star_display.addAnimation("one",one_star);
  star_display.addAnimation("two",two_star);
  star_display.addAnimation("three",three_star);

  star_display.changeAnimation("empty");
  console.log(stars)
	Engine.run(engine);
  
  console.log("Setup completed");
}


function draw() {
  console.log("Drawing...");

  background(0);
  image(backgroundImage, 0, 0, width, height);

  Engine.update(engine);

  
 
  //star and cannonball collisions
  for (var i = 0; i < balls.length; i++) {
    if (star1.isCollided(balls[i])) {
        
        star_display.changeAnimation("one");
        //star1.collected = true;
        //star1.body.isSensor = true;
        star1.visible = false;
        console.log("star1 collision");
    }
     if (star2.isCollided(balls[i])) {
         
        star_display.changeAnimation("two");
        //star2.collected = true;
        //star2.body.isSensor = true;
        star2.visible = false;
        console.log("star2 collision");
    }
     if (star3.isCollided(balls[i])) {
         
        star_display.changeAnimation("three");
        //star3.collected = true;
        //star3.body.isSensor = true;
        star3.visible = false;
        console.log("star3 collision");
    }
}

  ground1.show();
  wall1.show();
  wall2.show();
  wall3.show();
  wall4.show();
  wall5.show();
  wall6.show();

  cannon.display();
  star1.display();
  star2.display();
  star3.display();
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }
  drawSprites();

  fill(255);
  textSize(32);
  text("Hello! LEFT & RIGHT ARROW to change cannon angle, DOWN ARROW to shoot!", 100, 100); 
  
}


function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    ball.animate();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 40) {
      ball.remove(index);
    }
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    //console.log("Shooting cannonball");
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    //console.log("Displaying cannonball");
    ball.display();
    ball.animate();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 40) {
      console.log("Removing cannonball at index: " + index);
      balls.splice(index, 1);
    }
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}