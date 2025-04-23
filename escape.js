
/*-------------------------------- Variables --------------------------------*/


/*------------------------ Cached Element References ------------------------*/


/*--------------------------------- Canvas ----------------------------------*/
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth;
canvas.height = innerHeight;

let gravity = 1.5;
let gameOver = false;

let jumpForce = -100;
let distance = 0;

//creating Player class (good if you want to expand more players in future)
class Player {
    constructor() {
        this.position = {   //starting position of Player
            x: 600,
            y: 680
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30     //height and width of object
        this.height = 30
        this.speed = 1;     // speed of object
        this.angle = 0;
    }
        

    draw() {    //customise the Player
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
    }
        // this.position.y += this.velocity.y
        // this.position.x += this.speed;
        // this.position.y -= this.speed * Math.sin(this.angle);

        // To keep Player on ground
        // if (this.position.y + this.height + this.velocity.y <= canvas.height)
        //     this.velocity.y += gravity;
        // else this.velocity.y = 0
    
}

//creating Lion class (good if you want to expand more players in future)
class Lion {
    constructor() {
        this.position = {       //starting position of Lion
            x: 50,
            y: 680
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 40;        // height and width of object
        this.height = 30;
        this.speed = 0.4;       // speed of object
        // this.angle = 0;
    }

    draw() {    //customise the Player
        c.fillStyle = 'orange'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.speed;
        // this.position.y -= this.speed * Math.sin(this.angle);

        // Object will fly up!!
        // this.position.y += this.velocity.y
        // this.position.x += this.speed;
        // this.position.y -= this.speed * Math.sin(this.angle);

        // if (this.position.y + this.height + this.velocity.y <= canvas.height)
        //     this.velocity.y += gravity;
        // else this.velocity.y = 0
    }
}

// let bushArray = [];


class Bush {
    constructor() {
        this.position = {       //starting position of Lion
            x: 1500,
            y: 680
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30;        // height and width of object
        this.height = 30;
        this.speed = -2;
    }

    draw() {    //customise the Player
        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.speed;
    }
}

class Food {
    constructor() {
        this.position = {       //starting position of Lion
            x: 1500,
            y: 580
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 20;        // height and width of object
        this.height = 20;
        this.speed = -2;
    }

    draw() {    //customise the Player
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.speed;
    }
}

class Jeep {
    constructor() {
        this.position = {       //starting position of Lion
            x: 5000,
            y: 670
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 80;        // height and width of object
        this.height = 40;
        this.speed = -2;
    }

    draw() {    //customise the Player
        c.fillStyle = 'brown'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.speed;
    }
}


/*-------------------------------- Constants --------------------------------*/
let player = new Player()
let lion = new Lion()
let bush = new Bush()
let food = new Food()
let jeep = new Jeep()


/*-------------------------------- Functions --------------------------------*/

function jump() {
    if (!player.isJumping) {
    this.velocity.y = jumpForce;
    this.isJumping = true;
    }
}

//refreshing animation 
function animate() {

    // Apply gravity
    player.velocity.y += gravity;

    // Update player position
    player.y += player.velocity.y;

    // Ground collision check (example: ground at y=250)
    if (player.y >= 680) {
    player.y = 680;
    player.isJumping = false;
    player.velocity.y = 0;
    }
    
          
    c.clearRect(0, 0, canvas.width, canvas.height)  //clearing the whole canvas
    player.update(), lion.update(), bush.update(), food.update(), jeep.update()      //update player, lion and bush

    requestAnimationFrame(animate);
}


animate()

/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener('keydown', (jumping) => {
    if (jumping.code === 'Space') {
        jump();
    }
});

