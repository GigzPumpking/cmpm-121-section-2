//purposely bad code so students can fix it - can make it worse

import "./style.css";

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const bird = document.getElementById("bird");

const scoreText = document.getElementById("scoreText");
let score = 0;
setText("click to start!");

let isJumping = false;
let gameOver = true;
let frameTime : number = 0;

document.addEventListener("mousedown", () => jump());

setInterval(function () {
  main();
}, 10);

function main() {
  if (gameOver == false) {
    score = score + 1;
    setText("Score: " + score);

    checkGameOver();
  }
}

function jump() {
  if (gameOver === false) {
    if (isJumping == false) {
      isJumping = true;
      dino?.classList.add("jump");
    }
  } else {
    startGame();
  }
}

function removeJumpBuffer() {
    frameTime += 1;

    if (frameTime >= 60) {
        frameTime = 0;
        removeJump();
    }
}

function removeJump() {
  dino?.classList.remove("jump");
  isJumping = false;
  //mainLoop = mainLoop //bug fix?
}

function removeObstacles() {
  cactus?.classList.remove("cactusMove");
  bird?.classList.remove("birdMove");
}

function parseObject(object: any, direction: string) {
    return parseInt(window.getComputedStyle(object).getPropertyValue(direction));
}

function checkGameOver() {
  if (gameOver == false && dino != null && cactus != null && bird != null) {
    if (isJumping) {
        window.requestAnimationFrame(removeJumpBuffer);
    }

    //get is dinosaur jumping
    const dinoTop = parseObject(dino, "top");

    //get cactus position
    const cactusleft = parseObject(cactus, "left");

    //get bird position
    const birdleft = parseObject(bird, "left");

    //detect cactus collision
    if (dinoTop >= 150 && Math.abs(cactusleft) < 7) {
      death();
    }

    //detect bird collision
    if (dinoTop <= 55 && Math.abs(birdleft) < 11) {
      death();
    }
  }
}

function startGame() {
  console.log("Game started!");
  gameOver = false;
  score = 0;
  cactus?.classList.add("cactusMove");
  bird?.classList.add("birdMove");
}

function setText(s: string) {
  if (scoreText) {
    scoreText.textContent = s;
  }
}

function death() {
  //end game
  console.log("player died!");
  setText("Final Score: " + score + "! Click To Play Again!");
  gameOver = true;

  //reset player
  removeJump();

  //reset cactus
  removeObstacles();
}
