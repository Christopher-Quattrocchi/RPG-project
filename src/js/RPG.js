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
    this.isTurn = true;
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

}


// let farquad = new Character("Farquad", "Lord", 100, 10, "Attack");
// let target = new Character("Shrek", "Ogre", 200, 20, "Attack");
// farquad.Attack(target);
// console.log(target.Health());Player.prototype.updateScore = function () {//update score when player or computer chooses to hold

function changePlayer() {//switch turns by flipping booleans, display whose turn it is
  playerOne.playerTurn = !playerOne.playerTurn;
  displayTurn();
  if (playerTwo) {
      playerTwo.playerTurn = !playerTwo.playerTurn;
      displayTurn();
  } else if (computerOpponent) {
      computerOpponent.playerTurn = !computerOpponent.playerTurn;
      computerStrategy();//check to see if this actually does something. currently it calls an async function without await
      console.log("computerStrategy called in changePlayer");
  }
  displayTurn();
}

const decideTurn = () => {
  character.isTurn = !character.isTurn;
  target.isTurn = !target.isTurn;
}

//const screenUpdate () => {

// }

//const battleLogic () => {

// }

