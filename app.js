let gameSeq = [];
let userSeq = [];
let highScore = 0;

let buttons = ["yellow","red","purple","green"];

let started = false;
let level = 0;

let h2 =document.querySelector("h2");
let scoreHeading = document.createElement("p");
h2.after(scoreHeading);
document.addEventListener("keypress",function (){
    if(started == false){
        started = true;
        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
} 

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*4);
    let randomColor = buttons[randIdx];
    let randbtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    btnFlash(randbtn);
}

function checkAns(idx){

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,500);
        }
    } else{
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function (){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150)
        if(level > highScore){
            highScore = level;
        }
        scoreHeading.innerText = `High Score : ${highScore}`;
        reset();
    }
}

function btnPress(){
    let btn = this;
    btnFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allButtons = document.querySelectorAll(".btn");
for(btn of allButtons){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}