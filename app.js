let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highscore =0;
let count = 0;//theme

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game is started");
    started = true;

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    if(highscore<level){
      highscore = level;
    }
    h2.innerHTML = `Game Over! Your score was <b>${level}</b><br><b> High Score : ${highscore}<b><br> Press any key to start.<br> `;
    document.querySelector("body").style.backgroundColor = "red";
    document.querySelector("body").style.color= "white"
    setTimeout(function () {
      if(count%2==0){
        document.querySelector("body").style.backgroundColor = "white";
        document.querySelector("body").style.color= "black";
      }
      else{
        document.querySelector("body").style.backgroundColor = "black";
        document.querySelector("body").style.color= "white";
      }

    }, 500);

    reset();
  }
  
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

//themes
let bd = document.querySelector("body");

let theme = document.querySelector(".themes");
let box = document.querySelector(".rule-container");
let all = document.querySelector(".dark");


theme.addEventListener("click", function () {
    count++;
    console.log(count);

    // Toggle theme based on count
    if (count %2== 0) {
        bd.style.backgroundColor = '#fff';
        theme.style.color = '#000'
        box.style.color = `#000`
        all.style.color = `#000`
        box.style.border = `2px solid #000`

        
    } else {
      bd.style.backgroundColor =`#000`;
      theme.style.color = '#fff';
      box.style.color = '#fff';
      all.style.color = '#fff';
      box.style.border = `2px solid #fff`
    }
});
