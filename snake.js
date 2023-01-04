const gameboard = document.querySelector("#gameboard");
const ctx = gameboard.getContext("2d");
const scoretext = document.querySelector("#scoretext");
const resetbtn = document.querySelector("resetbtn");
const gamewidth = gameboard.Width;
const gameheight = gameboard.Height;
const boardbackground = "black";
const snakecolor = "lightgreen";
const snakeborder = "grey";
const foodcolor = "red";
const unitsize = 25;

let running = false;
let xvelocity = unitsize;
let yvelocity = 0;
let foodx;
let foody;
let score = 0;
let snake = [
    {x:unitsize * 4, y:0},
    {x:unitsize * 3, y:0},
    {x:unitsize * 2, y:0},
    {x:unitsize, y:0},
    {x:0, y:0}
];

window.addEventListener("keydown", changedirection);
resetbtn.addEventListener("click", resetgame);
gamestart();
function gamestart(){
    running = true;
    scoretext.textContent = score;
    createfood();
    drawfood();
    nexttick();
};

function nexttick(){
    if(running)
    {
        setTimeout(()=>{
            clearboard();
            drawfood();
            movesnake();
            drawsnake();
            checkgameover();
            nexttick();

        },75);
    }
    else{
        displaygameover();
    }
};

function clearboard(){
    ctx.fillStyle = boardbackground;
    ctx.fillRect(0,0, gamewidth,gameheight)
};

function createfood(){
    function randomfood(min, max)
    {
        const randnum = Math.round((Math.random() * (max-min)+ min)/ unitsize)* unitsize;
        return randnum;
    }
    foodx = randomfood(0 , gamewidth - unitsize);
    foody = randomfood(0 , gamewidth - unitsize);
};

function drawfood(){
    ctx.fillStyle = foodcolor;
    ctx.fillRect(foodx, foody, unitsize, unitsize);
};

function movesnake(){
    const head = {x: snake[0].x + xvelocity,
    y: snake[0].y + yvelocity};
    snake.unshift(head);

    if(snake[0].x == foodx && snake[0].y == foody)
    {
        score+=1;
        scoretext.textContent = score;
        createfood();
    }
    else
    {
        snake.pop();
    }
};

function drawsnake(){
    ctx.fillStyle = snakecolor;
    ctx.strokeStyle = snakeborder;
    snake.forEach(snakepart => {
        ctx.fillRect(snakepart.x, snakepart.y, unitsize,unitsize);
        ctx.strokeRect(snakepart.x, snakepart.y, unitsize,unitsize);
    })
};

function changedirection(event){
    const keypressed = event.keycode;
    const LEFT =37;
    const UP =38;
    const RIGHT =39;
    const DOWN =40;

    const goingUP = (yvelocity == -unitsize);
    const goingDOWN = (yvelocity == unitsize);
    const goingRIGHT = (xvelocity == unitsize);
    const goingLEFT = (xvelocity == -unitsize);

    switch(true)
    {
        case(keypressed == LEFT && !goingRIGHT):
        xvelocity = -unitsize;
        yvelocity = 0;
        break;
        case(keypressed == UP && !goingDOWN):
        xvelocity = 0;
        yvelocity = -unitsize;
        break;
        case(keypressed == RIGHT && !goingLEFT):
        xvelocity = unitsize;
        yvelocity = 0;
        break;
        case(keypressed == DOWN && !goingUP):
        xvelocity = 0;
        yvelocity = unitsize;
        break;
    }
    

};

function checkgameover(){
    switch(true)
    {
        case(snake[0].x < 0):
        running = false;
        break;
        case(snake[0].x >= gamewidth):
        running = false;
        break;
        case(snake[0].y < 0):
        running = false;
        break;
        case(snake[0].y >= gameheight):
        running = false;
        break;
    }
    for(let i=1 ; i < snake.length; i+=1)
    {
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y)
        {
            running =false;
        }
    }
};

function displaygameover(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gamewidth / 2, gameheight / 2);
    running = false;
};

function resetgame(){
    score = 0;
    xvelocity = unitsize;
    yvelocity= 0;
    snake = [
        {x:unitsize * 4, y:0},
        {x:unitsize * 3, y:0},
        {x:unitsize * 2, y:0},
        {x:unitsize, y:0},
        {x:0, y:0}
    ];
    gamestart();
};


