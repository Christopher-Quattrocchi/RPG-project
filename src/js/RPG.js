export default class Character {
  constructor(imageUrl, name, type, maxHealth, damage, finesse, actions) {
    this.imageUrl = imageUrl;
    this.name = name;
    this.type = type;
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth; // Initialize with full health
    this.damage = damage;
    this.finesse = finesse;
    this.actions = actions;
    this.isDead = false;
    // this.isTurn = false;
    this.lastDamageDealt = 0;
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

    this.lastDamageDealt = rollDamage;
    return {
      attacker: this.name,
      target: target.name,
      damage: rollDamage
    };
  }

  Health() {
    let percentHealth = (this.currentHealth / this.maxHealth * 100);
    if (percentHealth <= 0) {
      this.isDead = true;
      return "you are dead";
    } else if (percentHealth <= 20) {
      return "you are almost dead";
    } else if (percentHealth <= 50) {
      return "you are severely hurt";
    } else if (percentHealth <= 80) {
      return "you are injured";
    } else {
      return "you are healthy";
    }
  }

  // DecideTurn(target) {
  //   if (!this.isTurn && !target.isTurn) {
  //     this.isTurn = false;
  //   }
  //   this.isTurn = !this.isTurn;
  //   target.isTurn = !target.isTurn;
  // }

  async EnemyLogic(gameState, updateDisplay) {
    // if (target.isTurn === false) {
    //   return;
    // }
    while (true) {

      if (gameState.player.isDead) {
        console.log("Player is dead. Ending enemy attack");
        break;
      }
      let enemy = gameState.enemy;
      if (!enemy.isDead) {
        let attackDetails = enemy.Attack(gameState.player);
        applyShakeEffect(document.getElementById("character-img"));
        let holdCharacterDiv = document.querySelector("#hold-character");
        let holdEnemyDiv = document.querySelector("#hold-enemy");
        await updateDisplay(holdCharacterDiv, holdEnemyDiv, gameState.player, enemy, attackDetails);
        gameState.EndCheck();
        console.log(gameState.player.Health());
      } else {
        const hasNextEnemy = gameState.hasNextEnemy();
        if (!hasNextEnemy) {
          //Victory
          break;
        }
        enemy = gameState.enemy;
      }
      await delay(5000);
    }
    // while (!target.isDead) {
    //   let holdCharacterDiv = document.querySelector("#hold-character");
    //   let holdEnemyDiv = document.querySelector("#hold-enemy");
    //   let attackDetails = target.Attack(character);
    //   applyShakeEffect(document.getElementById("character-img"));
    //   await updateDisplay(holdCharacterDiv, holdEnemyDiv, character, target, attackDetails);

    //   console.log(character.Health());
    //   await delay(5000);
    //   // character.DecideTurn(target);
  }
}




/////START SHAKE EFFECT
function applyShakeEffect(enemyElement) {
  enemyElement.classList.add('shake');

  // Remove the class after the animation ends
  enemyElement.addEventListener('animationend', () => {
    enemyElement.classList.remove('shake');
  }, { once: true });
}

//DELAY FUNCTION
function delay(ms) {//so we can add delays more consistently than with setinterval which sucks
  return new Promise(resolve => setTimeout(resolve, ms));
}

// await delay(1000);   //SHOWS HOW TO USE IT
//END DELAY FUNCTIOn