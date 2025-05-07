/*------------------------ Cached Element References ------------------------*/
const startScreen = document.getElementById('startScreen'); //

const winScreen = document.getElementById('winScreen');     //

const loseScreen = document.getElementById('loseScreen');   //

/*--------------------------------- Canvas ----------------------------------*/
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//Setting Canvas size = Browser window size
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

    }

    jump() {
        if (!player.isJumping) {        //checks if player is jumping
        this.velocity.y = jumpForce;
        this.isJumping = true;          //player is jumping so cannot double jump
        }
    }
    
    update() {
        
        this.velocity.y += gravity; //apply gravity
        this.position.y += this.velocity.y; //update player position

        // Keep player on ground
        if (this.position.y >= 620) {   //make sure player is on ground
            this.position.y = 620;      
            this.velocity.y = 0;        
            this.isJumping = false;     //player not jumping so can jump again
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
        this.width = 80;        // height and width of object
        this.height = 60;
        this.speed = 0.7;       // speed of object
    
    }

    draw() {    //customise the Lion

        this.image = new Image()
        this.image.src = "./images/lion.png"

        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)

    }

    update() {
        this.position.x += this.speed;
        
    }
}

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
        this.width = 50;        
        this.height = 50;
        this.speed = -4;

        this.collided = false;
    }

    draw() {    //customise the Bush

        this.image = new Image()
        this.image.src = "./images/bush.png"

        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)

    }

    update() { 
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

    }

    update() {
        this.position.x += this.speed;
    }
}

class Jeep {
    constructor() {
        this.position = {       //starting position of Jeep
            x: 6620,
            y: 620
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 150 ;        // height and width of object
        this.height = 80;
        this.speed = -3;
    }

    draw() {    //customise the Jeep

        this.image = new Image()
        this.image.src = "./images/jeep.png"

        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)

    }

    update() {
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
    bushArray.forEach((bush) => {
        if (bush.collided === false) {
            if (checkIfCollide(player, bush)) {
                bush.collided = true;
                lion.speed += 0.01;
    
            }
        }
    })

    // Player-Food checkCollision
    foodArray.forEach((food) => {
        if (food.collided === false) {
            if (checkIfCollide(player, food)) {
                food.collided = true;
                lion.speed += -1.5;
    
                setTimeout(() => {
                    lion.speed = lionSpeed;
                }, 1000);
                            
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
    
    //input this code as background imgae is not showing upon browser upload
    background.onload = function() {
        c.drawImage(background, 0, 0, canvas.width, canvas.height);    
    }

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

            //for every 50 - 100 frames, bush will randomly spawn 40% of the time and food will spawn 60%
            if (rand < 0.4) {
                    bushArray.push(new Bush());  
                } else {
                    foodArray.push(new Food());      
            }

    }

    //to show the distance of the man to the jeep
    let dx = jeep.position.x - player.position.x;
    score = Math.max(0, Math.floor(dx));    //make sure the number doesn't go -ve and rounding the distance to integer

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
    return Math.floor(Math.random() * (max - min + 1) + min);   //calculates a random number between 0 - 1 based on the min and max given
}

let randomNumber = getRandomIntInclusive(50, 100);

animate() 

/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener('keydown', (jumping) => {
    if (jumping.code === 'Space') {
        player.jump();
    }
});

document.addEventListener('keydown', (e) => {
    if (gameState === 'start') {
        gameState = 'playing';
        resetGame();  
        animate();

    } else if (gameState === 'lost' || gameState === 'won') {
        if (e.code === 'Space') {
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
