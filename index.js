let turnPlayer = player1;

const winningSeries = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

let outSpaces = [];
let player1Spaces = [];
let player2Spaces = [];

//---------------Start and Restart Buttons-----------------//
document.getElementById("startBtn").addEventListener("click", function () {
  //Catch player's names
  const player1 = document.getElementById("player1").value;
  const player2 = document.getElementById("player2").value;

  startGame(player1, player2);
});

document.getElementById("reStartBtn").addEventListener("click", function () {
  location.reload();
});

//-------------------------------------------------------------------------//

function startGame(player1, player2) {
  if ((player1 != "") & (player2 != "")) {
    // Name inputs will disapper
    document.getElementById("player1").style.display = "none";
    document.getElementById("player2").style.display = "none";
    document.getElementById("labelPlayer1").style.display = "none";
    document.getElementById("labelPlayer2").style.display = "none";
    // Start button disappears
    document.getElementById("startBtn").style.display = "none";
    // Restart button appears
    document.getElementById("reStartBtn").style.display = "inline-block";
    // Show Game Messages
    document.getElementById("gameText").innerText =
      player1 + ", It's yout turn!";
    // Erase content of Table Spaces
    document.querySelectorAll(".tableSpace").forEach((space) => {
      space.innerText = "";
    });
    // Enable all buttons
    document.querySelectorAll(".tableSpace").forEach((btn) => {
      btn.disabled = false;
    });
  } else {
    document.getElementById("gameText").innerText =
      "We need the player's names!";
  }
}

function checkGame(playerSpaces, player) {
  let winningCombo = null;

  for (let combo of winningSeries) {
    if (combo.every((space) => playerSpaces.includes(space))) {
      winningCombo = combo;
      break;
    }
  }

  if (winningCombo) {
    document.getElementById("gameText").style.fontSize = "2rem";
    document.getElementById("gameText").innerText =
      player.value + " is the WINNER!";

    //Stand out winning combo
    winningCombo.forEach((number) => {
      const btn = document.querySelector(`.tableSpace[data-value="${number}"]`);
      btn.style.backgroundColor = "#90ee90";
    });

    // Desable all buttons
    document.querySelectorAll(".tableSpace").forEach((btn) => {
      btn.disabled = true;
    });
  } else if (outSpaces.length === 9) {
    document.getElementById("gameText").style.fontSize = "2rem";
    document.getElementById("gameText").innerText = " Oh, no! It's a tie x.x!";
    document.querySelectorAll(".tableSpace").forEach((btn) => {
      btn.disabled = true;
    });
  }
}

function Play1(button) {
  if (!outSpaces.includes(Number(button.dataset.value))) {
    button.innerText = "X";
    player1Spaces.push(Number(button.dataset.value));
    outSpaces.push(Number(button.dataset.value));
    turnPlayer = player2;
    document.getElementById("gameText").innerText =
      player2.value + ", It's yout turn!";
  }
  checkGame(player1Spaces, player1);
}

function Play2(button) {
  if (!outSpaces.includes(Number(button.dataset.value))) {
    button.innerText = "O";
    player2Spaces.push(Number(button.dataset.value));
    outSpaces.push(Number(button.dataset.value));
    turnPlayer = player1;
    document.getElementById("gameText").innerText =
      player1.value + ", It's yout turn!";
  }
  checkGame(player2Spaces, player2);
}

document.querySelectorAll(".tableSpace").forEach((button) => {
  button.addEventListener("click", function (ev) {
    const button = ev.currentTarget;
    if (turnPlayer === player1) {
      Play1(button);
    } else {
      Play2(button);
    }
  });
});
