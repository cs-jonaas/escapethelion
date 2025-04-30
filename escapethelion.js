/*-------------------------------- Variables --------------------------------*/


/*------------------------ Cached Element References ------------------------*/
const startScreen = document.getElementById('startScreen');

const winScreen = document.getElementById('winScreen');

const loseScreen = document.getElementById('loseScreen');

/*--------------------------------- Canvas ----------------------------------*/
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth;
canvas.height = innerHeight;

let gameState = 'start';  
let gameMessage = "";
let gravity = 1.5;

let jumpForce = -23;
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
    }
        

    draw() {    //customise the Player
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
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
        if (this.position.y >= 680) {
            this.position.y = 680;
            this.velocity.y = 0;
            this.isJumping = false;
        }
        
        
    }
    
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
        this.speed = 0.5;       // speed of object
        // this.angle = 0;
    }

    draw() {    //customise the Player
        c.fillStyle = 'orange'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        
        this.position.y += this.velocity.y
        this.position.x += this.speed;
        
    }
}

// let bushArray = [];


class Bush {
    constructor() {
        this.position = {       
            x: canvas.width + Math.random() * 300, // Spawn ahead with randomness
            y: 680 
        }

        // this.position = {       //starting position of Lion
        //     x: 1500,
        //     y: 680,
        // }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30;        // height and width of object
        this.height = 30;
        this.speed = -4;

        this.collided = false;
    }

    draw() {    //customise the Player
        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.position.y += this.velocity.y
        this.position.x += this.speed;
    }
}

class Food {
    constructor() {
        this.position = {       //starting position of Lion
            x: 1500,
            y: 520,
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 20;        // height and width of object
        this.height = 20;
        this.speed = -4;

        this.collided = false;
    }

    draw() {    //customise the Player
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
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
        this.speed = -3;
    }

    draw() {    //customise the Player
        c.fillStyle = 'brown'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
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
// function checkCollision() {
//     bushArray.forEach((bush) => {
//         if (collisonDetect(player, bush)) {
//             lion.speed += 0.2;
//             console.log("Lion is faster!");
    
//         }
//     });
// }

function checkCollision() {
    // Player-Bush checkCollision
    for (let bush of bushArray) {
        if (bush.collided === false) {
            if (checkIfCollide(player, bush)) {
                bush.collided = true;
                lion.speed += 0.05;
                console.log("Lion got faster because player hit a bush");
                
                setTimeout(() => {
                    lion.speed = lionSpeed;
                    console.log("Lion speed reset to original");
                }, 500);
                // check the collision if it has already collided
                return true;
    
            } else {
                console.log("No collision with bush yet");
            }
        }
    }

    // Iterative methods
    // for (let i = 0; i < 5; i++)
    // for (let bush in bushArray)
    // while (i < 5) { i++ }
    // bushArray.forEach((bush) => {})

    
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
                }, 750);
                            
            } else {
                console.log("No collision with food yet");
            }
        }
        
    })

    foodArray = foodArray.filter((food) => { return food.collided === false });
    

    // Player-Lion checkCollision
    if (checkIfCollide(player, lion)) {
        gameState = "lost";
        console.log("Game Over! The lion caught you!")

    }

    if (checkIfCollide(player, jeep)) {
        gameState = "won";
        console.log("You Win! You have escaped!")
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
    
    if (gameState === 'start') {
        c.clearRect(0, 0, canvas.width, canvas.height);
        startScreen.style.display = 'block';
        winScreen.style.display = 'none';
        loseScreen.style.display = 'none';
        return;
    }
    
    if (gameState === 'lost') {
        startScreen.style.display = 'none';
        winScreen.style.display = 'none';
        loseScreen.style.display = 'block';
        return;
    }
    
    if (gameState === 'won') {
        startScreen.style.display = 'none';
        winScreen.style.display = 'block';
        loseScreen.style.display = 'none';
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
    if (frames % getRandomIntInclusive(50, 100) === 0) {
    const rand = Math.random();
    
    if (rand < 0.4) {
        bushArray.push(new Bush());  // 30% chance
    } else {
        foodArray.push(new Food());  // 70% chance
        
    }

    // bushArray.push(new Bush(rand = 0.4)); 

    // foodArray.push(new Food(rand = 0.4)); 

    }


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

    requestAnimationFrame(animate);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  let randomNumber = getRandomIntInclusive(50, 100);
  console.log(randomNumber);
  

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
        if (e.code === 'Space') {
            player.jump();
        }
    }
});




// timer/distance