// Access the canvas. (HTML element where the game is rendered)
const canvas = document.getElementById("tetris");
const context = canvas.getContext('2d');
context.fillStyle = '#000';
context.fillRect(0,0,canvas.width, canvas.height);


context.scale(20,20)
// This tells the drawPieces function how to draw the pieces
const matrix = [
    [0,0,0],
    [1,1,1],
    [0,1,0]
];

// This is used to update the game display continuously
function draw(){
    context.fillStyle = '#000';
    context.fillRect(0,0,canvas.width, canvas.height);
    drawPieces(player.matrix, player.pos);
}

// This function reads the piece matrices and renders them on the canvas based on the offset
function drawPieces(matrix, offset){
    matrix.forEach((row, y) => {
        row.forEach((value, x) =>{
            if (value !== 0){
                context.fillStyle = 'red';
                context.fillRect(x + offset.x,y + offset.y,1,1);
            }
        });
    });
}

let dropCounter = 0;
// rate at which pieces fall (1,000 ms)
let dropInterval = 1000;

let lastTime = 0;
function update(time=0){
    const deltaTime = time - lastTime;
    lastTime = time;

    // drops piece one unit every second and resets counter
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        if (player.pos.y < 17)
        {player.pos.y++;}
        dropCounter = 0;
    }

    draw();
    requestAnimationFrame(update);
}

// This event listener checks for key presses
document.addEventListener('keydown', event => {
    console.log(event);
    console.log(player.pos);
    switch (event.key) {
        case 'ArrowRight':
            if (player.pos.x < 9)
            {player.pos.x++;}
            break;
        case 'ArrowLeft':
            if (player.pos.x > 0)
            {player.pos.x--;}
            break;
        default: console.log("Not a valid input");
    }
})

const player = {
    pos: {x: 5,y: 5},
    matrix: matrix
}

update();