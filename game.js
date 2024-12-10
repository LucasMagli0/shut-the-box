////-- Variables --\\\\
const dice1 = document.querySelector("#dice1");
const dice2 = document.querySelector("#dice2");
const turnText = document.querySelector("#turn-num");
const nameText = document.querySelector("#turn-name");
const sumText = document.querySelector("#sum");
const tbody = document.querySelector("#tbody");

//divisions
const playersDiv = document.querySelector("#players");
const boardDiv = document.querySelector("#board");
const diceDiv = document.querySelector("#dice");
const scoreboardDiv = document.querySelector("#scoreboard");
const winnerDiv = document.querySelector("#winner");

//inputs
const startBtn = document.querySelector("#start-btn");
const rollBtn = document.querySelector("#roll-btn");
const individualBtn = document.querySelector("#individual-btn");
const sumBtn = document.querySelector("#sum-btn");
const endBtn = document.querySelector("#end-btn");
const restartBtn = document.querySelector("#restart-btn");
const reloadBtn = document.querySelector("#reload-btn");

const player1name = document.querySelector("#player1-input");
const player2name = document.querySelector("#player2-input");

const player1scorename = document.querySelector("#plr1scorename");
const player2scorename = document.querySelector("#plr2scorename");
const winnername = document.querySelector("#winner-name");

const boxes = [0,0,0,0,0,0,0,0,0,0];

let totalturn = 1;
let round = 1;
let totalrounds = 6; // THIS IS HARD CODED
let dice1Num = 1;
let dice2Num = 1;
let player1Points = 0;
let player2Points = 0;

let player1TotalPoints = 0;
let player2TotalPoints = 0;

rollBtn.disabled = true;
individualBtn.disabled = true;
sumBtn.disabled = true;
endBtn.disabled = true;
////-- Events --\\\\
startBtn.addEventListener("click", function(){
    if (player1name.value.trim() && player2name.value.trim()) {
        playersDiv.style.display = "none";
        boardDiv.style.display = "block";
        diceDiv.style.display = "block";
        scoreboardDiv.style.display = "block";
        rollBtn.disabled = false;
        turnText.textContent = `Turn: ${round}`;
        nameText.textContent = `${player1name.value}'s Turn`;
        player1scorename.textContent = player1name.value;
        player2scorename.textContent = player2name.value;
    } else {
        console.log("Empty Names");
    }
});
rollBtn.addEventListener("click", function(){
    rollBtn.disabled = true;
    individualBtn.disabled = true;
    sumBtn.disabled = true;
    endBtn.disabled = true;

    dice1Num = rollDice();
    dice2Num = rollDice();

    sumText.textContent = `Sum: ${dice1Num + dice2Num}`;
    dice1.className = `bi bi-dice-${dice1Num}`;
    dice2.className = `bi bi-dice-${dice2Num}`;

    // Individual
    if (dice1Num === dice2Num && boxes[dice1Num] !== "X" && boxes[dice2Num] !== "X") {
        console.log("Not Individual");
    } else {
        if (0 === boxes[dice1Num] && 0 === boxes[dice2Num]) {
            individualBtn.disabled = false;
            console.log("Individual");
        } else {
            console.log("number is not avaliable");
        }
    }
    // Sum
    if ((dice1Num + dice2Num) > 9 || boxes[dice1Num + dice2Num] === "X") {
        console.log("Not Sum");
    } else {
        if (0 === boxes[dice1Num + dice2Num]) {
            console.log("Sum");
            sumBtn.disabled = false;
        } else {
            console.log("number is not avaliable");
        }
    }
    // End
    if (sumBtn.disabled === true && individualBtn.disabled === true) {
        endBtn.disabled = false;
    }
});
individualBtn.addEventListener("click", function(){
    rollBtn.disabled = false;
    individualBtn.disabled = true;
    sumBtn.disabled = true;
    endBtn.disabled = true;

    shut(dice1Num);
    shut(dice2Num);
});
sumBtn.addEventListener("click", function(){
    rollBtn.disabled = false;
    individualBtn.disabled = true;
    sumBtn.disabled = true;
    endBtn.disabled = true;

    shut(dice1Num + dice2Num);
});
endBtn.addEventListener("click", function(){
    console.log(round);
    if (round === 1 || round === 3 || round === 5) {
        for (let i = 1; i < boxes.length; i++) {
            if (boxes[i] === 0) {
                player1Points += Number(document.querySelector(`#num${i}`).textContent);
                player1TotalPoints += Number(document.querySelector(`#num${i}`).textContent);
            }
        }
        nameText.textContent = `${player2name.value}'s Turn`;
        buildRow(round, player1Points);
    } else if (round === 2 || round === 4) {
        for (let i = 1; i < boxes.length; i++) {
            if (boxes[i] === 0) {
                player2Points += Number(document.querySelector(`#num${i}`).textContent);
                player2TotalPoints += Number(document.querySelector(`#num${i}`).textContent);
            }
        }
        nameText.textContent = `${player1name.value}'s Turn`;
        totalturn++;
        buildRow(round, player2Points);
        player1Points = 0;
        player2Points = 0;
    } else {
        for (let i = 1; i < boxes.length; i++) {
            if (boxes[i] === 0) {
                player2Points += Number(document.querySelector(`#num${i}`).textContent);
                player2TotalPoints += Number(document.querySelector(`#num${i}`).textContent);
            }
        }
        nameText.textContent = `${player1name.value}'s Turn`;
        totalturn++;
        buildRow(round, player2Points);
        player1Points = 0;
        player2Points = 0;
    }
    for (let i = 1; i < boxes.length; i++) {
        boxes[i] = 0;
        document.querySelector(`#num${i}`).classList.remove("fill");
    }
    round += 1;
    turnText.textContent = `Turn: ${round}`;
    rollBtn.disabled = false;
    endBtn.disabled = true;
});
restartBtn.addEventListener("click", function(){
    player1Points = 0;
    player2Points = 0;
    player1TotalPoints = 0;
    player2TotalPoints = 0;
    round = 1;
    totalturn = 1;

    turnText.textContent = `Turn: ${round}`;

    const element1 = document.getElementById(`round1`);
    element1.remove();
    const element2 = document.getElementById(`round3`);
    element2.remove();
    const element3 = document.getElementById(`round5`);
    element3.remove();

    boardDiv.style.display = "block";
    diceDiv.style.display = "block";
    winnerDiv.style.display = "none";
});
reloadBtn.addEventListener("click", function(){
    location.reload();
});

////-- Functions --\\\\
function rollDice() {
    const diceNumber = Math.floor(Math.random() * 6) + 1;
    return diceNumber;
}
function shut(number) {
    if (0 === boxes[number]) {
        boxes[number] = "X";
        document.querySelector(`#num${number}`).className = "fill";
    } else {
        console.log("number is not avaliable");
    }
}
function buildRow(turn, points) {
    if (turn === 1 || turn === 3 || turn === 5) {
        const tr = document.createElement("tr");
        tr.id = `round${turn}`;
        tbody.insertAdjacentElement("beforeend", tr);
        const th = document.createElement("th");
        th.textContent = `Round ${totalturn}`
        const td1 = document.createElement("td");
        td1.className = "plr1Points";
        const td2 = document.createElement("td");
        td2.className = "plr2Points";
        tr.insertAdjacentElement("beforeend", th);
        tr.insertAdjacentElement("beforeend", td1);
        tr.insertAdjacentElement("beforeend", td2);
        td1.textContent = points;
    } else if (round === 2 || round === 4) {
        const tr = document.querySelector(`#round${turn-1}`);
        const td2 = tr.querySelector(".plr2Points");
        td2.textContent = points;
    } else {
        const tr = document.querySelector(`#round${turn-1}`);
        const td2 = tr.querySelector(".plr2Points");
        td2.textContent = points;

        boardDiv.style.display = "none";
        diceDiv.style.display = "none";
        winnerDiv.style.display = "block";

        if (player1TotalPoints < player2TotalPoints) {
            console.log("Player 1 Wins!");
            winnername.textContent = `${player1name.value} Wins the Game!`;
        } else if (player2TotalPoints < player1TotalPoints) {
            console.log("Player 2 Wins!");
            winnername.textContent = `${player2name.value} Wins the Game!`;
        } else {
            console.log("Tie!");
            winnername.textContent = "Tie Game!";
        }
    }
}
