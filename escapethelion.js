/*------------------------ Cached Element References ------------------------*/
const startScreen = document.getElementById('startScreen');

const winScreen = document.getElementById('winScreen');

const loseScreen = document.getElementById('loseScreen');

/*--------------------------------- Canvas ----------------------------------*/
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth;
canvas.height = innerHeight;

let background = new Image();
background.src = "https://cdna.artstation.com/p/assets/images/images/027/967/652/large/gabriel-gabas-x-pmwxv17xss1tctdo6o1-1280.jpg?1593097332";

/*-------------------------------- Variables --------------------------------*/
let gameState = 'start';  
let gameMessage = "";
let gravity = 1.5;

let jumpForce = -25;
let distance = 0;
let score = 0;


//creating Player class (good if you want to expand more players in future)
class Player {
    constructor() {
        this.position = {   //starting position of Player
            x: 600,
            y: 620
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 60     //height and width of object
        this.height = 70

    }
        

    draw() {    //customise the Player
        
        this.image = new Image()
        this.image.src = "./images/manrun1.png"

        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        
        // c.fillStyle = "black"
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)

    }

    jump() {
        if (!player.isJumping) {
        this.velocity.y = jumpForce;
        this.isJumping = true;
        }
    }
    
    update() {
        
        this.velocity.y += gravity; //apply gravity
        this.position.y += this.velocity.y; //update player position

        // Keep player on ground
        if (this.position.y >= 620) {
            this.position.y = 620;
            this.velocity.y = 0;
            this.isJumping = false;
        }
        
        
    }
    
}


//creating Lion class (good if you want to expand more players in future)
class Lion {
    constructor() {
        this.position = {       //starting position of Lion
            x: 0,
            y: 640
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 70;        // height and width of object
        this.height = 50;
        this.speed = 0.7;       // speed of object
        // this.angle = 0;
    }

    draw() {    //customise the Lion

        this.image = new Image()
        this.image.src = "./images/lion.png"

        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)

        // c.fillStyle = "orange"
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        
        // this.position.y += this.velocity.y
        this.position.x += this.speed;
        
    }
}

// let bushArray = [];


class Bush {
    constructor() {
        this.position = {       
            x: 1500, //canvas.width + Math.random() * 300, // Spawn ahead with randomness
            y: 650 
        }

        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 40;        
        this.height = 40;
        this.speed = -4;

        this.collided = false;
    }

    draw() {    //customise the Bush

        this.image = new Image()
        this.image.src = "./images/bush.png"

        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)

        // c.fillStyle = "green"
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() { 
        // this.position.y += this.velocity.y
        this.position.x += this.speed;
    }
}

class Food {
    constructor() {
        this.position = {       //starting position of Food
            x: 1500,
            y: 500,
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30;        // height and width of object
        this.height = 30;
        this.speed = -4;

        this.collided = false;
    }

    draw() {    //customise the Food

        this.image = new Image()
        this.image.src = "./images/meat.png"

        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)

        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        // this.position.y += this.velocity.y
        this.position.x += this.speed;
    }
}

class Jeep {
    constructor() {
        this.position = {       //starting position of Jeep
            x: 7000,
            y: 620
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 140 ;        // height and width of object
        this.height = 70;
        this.speed = -3;
    }

    draw() {    //customise the Jeep

        this.image = new Image()
        this.image.src = "./images/jeep.png"

        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)

        // c.fillStyle = "brown"
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
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

let bushArray = [bush];
let foodArray = [food];

let lionSpeed = lion.speed;

/*-------------------------------- Functions --------------------------------*/

function checkCollision() {
    // Player-Bush checkCollision
    for (let bush of bushArray) {
        if (bush.collided === false) {
            if (checkIfCollide(player, bush)) {
                bush.collided = true;
                lion.speed += 0.1;
                console.log("Lion got faster because player hit a bush");
                
                setTimeout(() => {
                    lion.speed = lionSpeed;
                    console.log("Lion speed reset to original");
                }, 750);
                // check the collision if it has already collided
                return true;
    
            } else {
                console.log("No collision with bush yet");
            }
        }
    }

    
    // Player-Food checkCollision
    
    foodArray.forEach((food) => {
        if (food.collided === false) {
            if (checkIfCollide(player, food)) {
                food.collided = true;
                lion.speed += -1.5;
                
                console.log("Lion is slower.");
    
                setTimeout(() => {
                    lion.speed = lionSpeed;
                    console.log("Lion speed reset to original");
                }, 1000);
                            
            } else {
                console.log("No collision with food yet");
            }
        }
        
    })

    foodArray = foodArray.filter((food) => { return food.collided === false });
    
    // Player-Lion checkCollision
    if (checkIfCollide(player, lion)) {
        gameState = "lost";

    }

    if (checkIfCollide(player, jeep)) {
        gameState = "won";
        
    }

}


function checkIfCollide(a, b) {
    let collision = false;  // Change const to let
    
    if (
        a.position.x < b.position.x + b.width &&
        a.position.x + a.width > b.position.x &&
        a.position.y < b.position.y + b.height &&
        a.position.y + a.height > b.position.y
    ) {
        console.log("Collision detected with bush at index", b);    
        
        collision = true;
        
    }

    return collision;
}

function resetGame() {
    player = new Player();
    lion = new Lion();
    jeep = new Jeep();
    bushArray = [];
    foodArray = [];
    frames = 0;

    startScreen.style.display = 'none';
    winScreen.style.display = 'none';
    loseScreen.style.display = 'none';

}

let frames = 0;

//refreshing animation 
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height)  //clearing the whole canvas
    
    c.drawImage(background, 0, 0, canvas.width, canvas.height);

    if (gameState === 'start') {
        
        startScreen.style.display = 'block';    //show start screen
        loseScreen.style.display = 'none';      //does not show lost screen
        winScreen.style.display = 'none';       //does not show win screen
        return;
        
    }
    
    if (gameState === 'lost') {
        startScreen.style.display = 'none';     //does not show start screen
        loseScreen.style.display = 'block';     //show lost screen
        winScreen.style.display = 'none';       //does not show win screen
        return;
    }
    
    if (gameState === 'won') {
        startScreen.style.display = 'none';     //does not show start screen
        loseScreen.style.display = 'none';      //does not show lost screen
        winScreen.style.display = 'block';      //show win screen
        return;
    }    
    
    player.update()
    
    lion.update()
    
    bushArray.forEach((bush) => {
        bush.update()
    })

    foodArray.forEach((food) => {
        food.update()
    })
    
    jeep.update()      

    frames++;

// Every 100 frames, spawn either a bush or food
    if (frames % randomNumber === 0) {
        const rand = Math.random();

            if (rand < 0.4) {
                    bushArray.push(new Bush());  
                } else {
                    foodArray.push(new Food());      
            }

    }

    let dx = jeep.position.x - player.position.x;
    score = Math.max(0, Math.floor(dx));

    //Check Collision
    checkCollision()

    player.draw()

    lion.draw()

    bushArray.forEach((bush) => {
        bush.draw()
    })

    foodArray.forEach((food) => {
        food.draw()
    })

    jeep.draw()

    c.font = "24px Pixelify Sans";
    c.fillText("Distance to Jeep: " + score + "m", 30, 50);

    requestAnimationFrame(animate);

}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let randomNumber = getRandomIntInclusive(50, 100);

animate() 

/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener('keydown', (jumping) => {
    if (jumping.code === 'Space') {
        player.jump();
    }
});

document.addEventListener('keydown', (j) => {
    if (gameState === 'start') {
        gameState = 'playing';
        resetGame();  
        animate();

    } else if (gameState === 'lost' || gameState === 'won') {
        if (j.code === 'Space') {
            resetGame();
            gameState = 'start';
            animate();
        }
    } else if (gameState === 'playing') {
        if (j.code === 'Space') {
            player.jump();
        }
    }
});
