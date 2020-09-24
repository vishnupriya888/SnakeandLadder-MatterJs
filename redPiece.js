class RedPiece{
    constructor(x, y, width, height){
        var rectOptions = {
            friction: 0,
            frictionAir: 0.098,
            density: 0.001
        }
        this.body = Bodies.rectangle(x, y, width, height, rectOptions);
        this.image = loadImage("sprites/redPiece.png");
        this.width = width;
        this.height = height;
        //this.body.collisionFilter.group = 1;
        World.add(world, this.body);
    }

    display(){
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        noStroke();
        fill(67, 78, 97);
        image(this.image, 0, 0, this.width, this.height);
        pop();
    }

    moveRight(){
        Matter.Body.setVelocity(this.body, {x: 6.85, y: 0});
    }

    moveLeft(){
        Matter.Body.setVelocity(this.body, {x: -6.8, y: 0});
    }

    moveUp(){
        Matter.Body.setVelocity(this.body, {x: 0, y: -6.8});
    }
}