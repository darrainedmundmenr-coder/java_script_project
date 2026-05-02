const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const tileSize = 40;

// 0 = dot, 1 = wall, 2 = empty, 3 = power pellet
let map = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,3,1],
    [1,0,1,1,0,1,1,0,0,1],
    [1,0,0,0,0,0,1,0,0,1],
    [1,0,1,0,1,0,1,0,0,1],
    [1,0,1,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,0,1,0,1],
    [1,3,0,0,1,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1],
];

let pacman = { x: 1, y: 1 };
let ghost = { x: 8, y: 8 };

let score = 0;
let ghostsFrozen = false;

// Controls
document.addEventListener("keydown", movePacman);

function movePacman(e) {
    let newX = pacman.x;
    let newY = pacman.y;

    if (e.key === "ArrowUp") newY--;
    if (e.key === "ArrowDown") newY++;
    if (e.key === "ArrowLeft") newX--;
    if (e.key === "ArrowRight") newX++;

    if (map[newY][newX] !== 1) {
        pacman.x = newX;
        pacman.y = newY;
        checkTile();
    }
}

// Check dots & power pellets
function checkTile() {
    let tile = map[pacman.y][pacman.x];

    if (tile === 0) {
        score += 10;
        map[pacman.y][pacman.x] = 2;
    }

    if (tile === 3) {
        score += 50;
        map[pacman.y][pacman.x] = 2;
        activateFreeze();
    }

    document.getElementById("score").innerText = "Score: " + score;
}

// Freeze mode
function activateFreeze() {
    ghostsFrozen = true;

    setTimeout(() => {
        ghostsFrozen = false;
    }, 5000);
}

// Ghost AI (simple random + chase)
function moveGhost() {
    if (ghostsFrozen) return;

    let moves = [
        {x:0,y:-1},
        {x:0,y:1},
        {x:-1,y:0},
        {x:1,y:0}
    ];

    let move = moves[Math.floor(Math.random() * 4)];

    let newX = ghost.x + move.x;
    let newY = ghost.y + move.y;

    if (map[newY][newX] !== 1) {
        ghost.x = newX;
        ghost.y = newY;
    }
}

// Draw game
function draw() {
    ctx.clearRect(0,0,400,400);

    // draw map
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {

            if (map[y][x] === 1) {
                ctx.fillStyle = "blue";
                ctx.fillRect(x*tileSize, y*tileSize, tileSize, tileSize);
            }

            if (map[y][x] === 0) {
                ctx.fillStyle = "white";
                ctx.fillRect(x*tileSize+15, y*tileSize+15, 5, 5);
            }

            if (map[y][x] === 3) {
                ctx.fillStyle = "orange";
                ctx.beginPath();
                ctx.arc(x*tileSize+20, y*tileSize+20, 6, 0, Math.PI*2);
                ctx.fill();
            }
        }
    }

    // Pac-Man
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(pacman.x*tileSize+20, pacman.y*tileSize+20, 12, 0, Math.PI*2);
    ctx.fill();

    // Ghost
    ctx.fillStyle = ghostsFrozen ? "cyan" : "red";
    ctx.fillRect(ghost.x*tileSize+10, ghost.y*tileSize+10, 20, 20);

    if (ghostsFrozen) {
        ctx.fillStyle = "white";
        ctx.fillText("FREEZE MODE!", 150, 20);
    }
}

// Game loop
function update() {
    moveGhost();
    draw();
    requestAnimationFrame(update);
}

update();