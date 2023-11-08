let character;
let target;

export class Character {
  constructor(name, type, maxHealth, damage, finesse, actions) {
    this.name = name;
    this.type = type;
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth // Initialize with full health
    this.damage = damage;
    this.finesse = finesse;
    this.actions = actions;
    this.isDead = false;
    this.isTurn = false;
  }

  Attack(target) {
    let toHit = Math.floor(Math.random() * 20) + 1 + this.finesse;
    let rollDamage = Math.floor(Math.random() * 5) + this.damage;

    if (toHit >= 18) {
      rollDamage = rollDamage * 2;
    } else if (toHit < 10) {
      rollDamage = 0;
    }

    target.currentHealth -= rollDamage;
    if (target.currentHealth <= 0) {
      target.isDead = true;
    }

    return rollDamage;

  }

  Health() {
    let percentHealth = (this.currentHealth / this.maxHealth * 100);
    if (percentHealth === 0) {
      this.isDead = true;
      return "you are dead";
    } else if (percentHealth <= 20) {
      return "you are almost dead";
    } else if (percentHealth <= 50) {
      return "you are severely hurt";
    } else if (percentHealth <= 80) {
      return "you are injured";
    } else {
      return "you are healthy"
    }
  }
  DecideTurn(target) {
    if (!this.isTurn && !target.isTurn) {
      this.isTurn = false;
    }
    this.isTurn = !this.isTurn;
    target.isTurn = !target.isTurn;
  }

  EnemyLogic(character, target) {
    if (target.isTurn === false) {
      return;
    }

    while (target.isTurn && !target.isDead) {
      target.Attack(character);
      console.log(character.Health());
      character.DecideTurn(target);
    }
  }


}

//UI Logic

// function delay(ms) {//so we can add delays more consistently than with setinterval which sucks
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function computerStrategy() {//defines computer player behavior 
//   if (!computerOpponent.playerTurn) return;
//   const rollButton = document.getElementById("rollbutton");
//   const holdButton = document.getElementById("holdbutton");
//   const pTotal1 = document.getElementById("total-score-p1");
//   const pTotal2 = document.getElementById("total-score-p2");
//   const pRound1 = document.getElementById("round-score-p1");
//   const pRound2 = document.getElementById("round-score-p2");
//   const victory = document.getElementById("victory");
//   const hideMe = document.getElementById("hideme");

//   rollButton.disabled = true;//disable buttons so the player can't mess with the computer's turn
//   holdButton.disabled = true;
//   console.log("should be disabled");

//   while (computerOpponent.playerTurn && computerOpponent.totalScore < 100 && computerOpponent.roundScore < 18) {//while loop so the comp keeps rolling unless conditions are met
//     await computerOpponent.diceRoll();
//     updateDisplay(computerOpponent, pTotal1, pRound1, pTotal2, pRound2);
//     await delay(1000);
//   }
//   if (computerOpponent.roundScore >= 18) {//computer will hold if it has 18 or more current points
//     computerOpponent.updateScore();
//     updateDisplay(computerOpponent, pTotal1, pRound1, pTotal2, pRound2);
//     console.log("computer held, screen should be updated");
//     await delay(1000);
//     computerOpponent.victoryCheck();//check if comp won
//     if (computerOpponent.playerVictory) {
//       victory.innerText = computerOpponent.name + " Victory! Winner Winner Chicken Dinner!!";
//       hideMe.setAttribute("class", "hidden");
//     } else {
//       changePlayer();//if comp hasn't won, it becomes player turn
//     }
//   }
//   rollButton.disabled = false;//reenable buttons so player can click
//   holdButton.disabled = false;
//   console.log("Should be enabled");
//   console.log("end of computerStrategy");
// }



// let farquad = new Character("Farquad", "Lord", 100, 10, "Attack");
// let target = new Character("Shrek", "Ogre", 200, 20, "Attack");
// farquad.Attack(target);
// console.log(target.Health());Player.prototype.updateScore = function () {//update score when player or computer chooses to hold

//const screenUpdate () => {

// }

