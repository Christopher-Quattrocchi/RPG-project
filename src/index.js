
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Character from "./js/RPG.js";

// src/index.js
import defaultImageOne from "./assets/images/default-placeholder1.jpg";
import defaultImageTwo from "./assets/images/default-placeholder2.jpg";
import ShrekImage from './assets/images/shrek.jpg';
import DonkeyImage from './assets/images/donkey.jpg';
import FionaImage from './assets/images/ogre-fiona.jpg';
import PussInBootsImage from './assets/images/pussinboots.jpg';
import FarquadImage from './assets/images/farquaad.jpg';
import DragonImage from './assets/images/dragon.jpg';
import PrinceCharmingImage from './assets/images/princecharming.jpg';
import HumanShrekImage from './assets/images/human-shrek.jpg';
// ... import other images as needed

let myGame; //I AM GLOBAL!!

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#character-form").addEventListener("submit", handleForm);
});

//DELAY FUNCTION
function delay(ms) {//so we can add delays more consistently than with setinterval which sucks
  return new Promise(resolve => setTimeout(resolve, ms));
}

// await delay(1000);   //SHOWS HOW TO USE IT
//END DELAY FUNCTIOn


const characterImg = {
  "Shrek": ShrekImage,
  "Donkey": DonkeyImage,
  "Fiona": FionaImage,
  "Puss In Boots": PussInBootsImage
  // ... other characters
}

const enemyImg = {
  "Lord Farquad": FarquadImage,
  "Dragon": DragonImage,
  "Prince Charming": PrinceCharmingImage,
  "Human Shrek": HumanShrekImage
  // ... other enemies
}

async function handleForm(event) {
  event.preventDefault();

  document.getElementById("character-form").setAttribute("class", "hidden");

  //Troubleshooting
  console.log(document.getElementById("character-img"));
  console.log(document.getElementById("enemy-img"));

  //Clear previous
  let holdCharacterDiv = document.querySelector("#hold-character");
  let holdEnemyDiv = document.querySelector("#hold-enemy");


  //Get character and enemy
  const selectedCharacter = (document.querySelector("#select-character").value);
  const player = characterSelector(selectedCharacter);



  const enemySequence = [
    new Character(FarquadImage, "Lord Farquad", "a man", 65, 10, 6, "Attack"),
    new Character(PrinceCharmingImage, "Prince Charming", "a man", 90, 15, 4, "Attack"),
    new Character(HumanShrekImage, "Human Shrek", "a man", 100, 15, 4, "Attack"),
    new Character(DragonImage, "Dragon", "a dragon", 220, 30, 0, "Attack")
  ];

  // const selectedEnemy = (document.querySelector("#select-enemy").value);

  //Character selection logic
  // const isFinalEnemy = selectedEnemy === "dragon"


  //Init game
  myGame = new GameState(player, enemySequence);

  //Update display
  await updateDisplay(holdCharacterDiv, holdEnemyDiv, player, myGame.enemy);

  //attach attack handler to attack button after game start
  document.querySelector("#attack").addEventListener("click", attackHandler);

  //start enemy attacks
  await myGame.enemy.EnemyLogic(myGame, updateDisplay);
}

/////START SHAKE EFFECT
function applyShakeEffect(enemyElement) {
  enemyElement.classList.add('shake');

  // Remove the class after the animation ends
  enemyElement.addEventListener('animationend', () => {
    enemyElement.classList.remove('shake');
  }, { once: true });
}

// Usage example
// Apply the shake effect when an enemy is hit
// replace 'enemyImageId' with the actual ID of your enemy image element
// const enemyImageElement = document.getElementById('enemyImageId');
// applyShakeEffect(enemyImageElement);
/////END SHAKE EFFECT




async function attackHandler(event) {
  event.preventDefault();

  const holdCharacterDiv = document.querySelector("#hold-character");
  const holdEnemyDiv = document.querySelector("#hold-enemy");

  let attackButton = document.getElementById("attack");
  attackButton.disabled = true;

  let attackDetails = myGame.player.Attack(myGame.enemy);
  applyShakeEffect(document.getElementById("enemy-img"));
  myGame.EndCheck();

  await updateDisplay(holdCharacterDiv, holdEnemyDiv, myGame.player, myGame.enemy, attackDetails);

  if (myGame.enemy.isDead) {
    const hasNextEnemy = myGame.nextEnemy();
    if (hasNextEnemy) {
      await updateDisplay(holdCharacterDiv, holdEnemyDiv, myGame.player, myGame.enemy, attackDetails = null);
    } else {
      //victory stuff
    }
  }

  await delay(5000);
  attackButton.disabled = false;
}



function characterSelector(characterName) {
  let player;
  // let enemy;

  //help
  console.log("In char select, characterName is:", characterName);
  // console.log("In char select, enemyName is:", enemyName);

  if (characterName === "Shrek") {
    player = new Character(ShrekImage, "Shrek", "an ogre", 120, 20, 1, "Attack");
  } else if (characterName === "Donkey") {
    player = new Character(DonkeyImage, "Donkey", "a donkey", 80, 10, 4, "Attack");
  } else if (characterName === "Fiona") {
    player = new Character(FionaImage, "Fiona", "an ogre", 100, 15, 3, "Attack");
  } else if (characterName === "PussInBoots") {
    player = new Character(PussInBootsImage, "Puss In Boots", "a cat", 75, 15, 5, "Attack");
  }

  console.log("Created player:", player);


  //help
  console.log("Created player:", player);
  // console.log("Created enemy:", enemy);

  return player;
}

async function updateDisplay(holdCharacterDiv, holdEnemyDiv, player, enemy, attackDetails) {



  //DISPLAY DAMAGE
  if (attackDetails) {
    const playerDamage = document.getElementById("player-damage");
    const enemyDamage = document.getElementById("enemy-damage");


    if (attackDetails.target === player.name) {
      if (attackDetails.damage === 0) {
        playerDamage.innerText = `${myGame.enemy.name} missed!`;
        await delay(1000);
        playerDamage.innerText = "";
      } else {
        playerDamage.innerText = `You were hit for ${enemy.lastDamageDealt}`;
        await delay(1000);
        playerDamage.innerText = "";
      }

    } else if (attackDetails.target === enemy.name) {
      if (attackDetails.damage === 0) {
        enemyDamage.innerText = `${myGame.player.name} missed!`;
        await delay(1000);
        enemyDamage.innerText = "";
      } else {
        enemyDamage.innerText = `${myGame.enemy.name} was hit for ${player.lastDamageDealt}`;
        await delay(1000);
        enemyDamage.innerText = "";
      }
    }
  }

  if (!player || !enemy) {
    console.error("Invalid player or enemy object");
    return;
  }
  //Text content set to something
  const hTag = document.getElementById("playerName");
  const eTag = document.getElementById("enemyName");
  console.log("I check if hTag and eTag are there", hTag, eTag);

  hTag.innerText = `Your fighter is: ${player.name}`;
  eTag.innerText = `Your enemy is: ${enemy.name}`;

  holdCharacterDiv.classList.remove("hidden");
  holdEnemyDiv.classList.remove("hidden");

  const playerStats = document.getElementById("character-stats");
  const enemyStats = document.getElementById("enemy-stats");
  const playerHp = document.getElementById("character-hp");
  const enemyHp = document.getElementById("enemy-hp");
  //help
  console.log("I check if stats are there", playerStats, enemyStats, playerHp, enemyHp);

  playerStats.innerText = `Your damage is: ${player.damage}, your finesse is ${player.finesse}`;
  enemyStats.innerText = `Enemy damage is: ${enemy.damage}, enemy finesse is ${enemy.finesse}`;
  playerHp.innerText = `Your health is ${player.currentHealth}`;
  enemyHp.innerText = `${enemy.name}'s health is ${enemy.currentHealth}`;

  //Correct src path to be relative to location of index.
  console.log("In update display, I shouldn't be null:", document.getElementById("character-img"));//Should not be null 
  console.log("In update display, I shouldn't be null:", document.getElementById("enemy-img"));//Should not be null 
  let characterImgElement = document.getElementById("character-img");
  let enemyImgElement = document.getElementById("enemy-img");

  if (characterImgElement && enemyImgElement) {
    characterImgElement.src = characterImg[player.name] || defaultImageOne;
    enemyImgElement.src = enemyImg[enemy.name] || defaultImageTwo;
  } else {
    console.error("One of the images couldn't be found in DOM");
  }
}

class GameState {
  constructor(player, enemies, currentEnemyIndex = 0) {
    this.stages = [true, false, false, false];
    this.player = player;
    this.enemies = enemies;
    this.currentEnemyIndex = 0;
    this.enemy = enemies[this.currentEnemyIndex];
  }

  nextEnemy() {
    this.currentEnemyIndex++
    if (this.currentEnemyIndex < this.enemies.length) {
      this.enemy = this.enemies[this.currentEnemyIndex];
      return true;
    }
    return false;
  }

  StageSwitch() {
    const nextStageIndex = this.stages.findIndex(stage => stage) + 1;
    if (nextStageIndex < this.stages.length) {
      this.stages.fill(false);
      this.stages[nextStageIndex] = true;
    }
  }

  async EndCheck() {
    if (this.player.isDead) {
      // death screen
      let title = document.getElementById("title");
      title.setAttribute("class", "hidden");
      let playerDeath = document.getElementById("player-death");
      playerDeath.setAttribute("class", "hideme");
      let hideOnEnd = document.getElementById("hideOnEnd");
      hideOnEnd.setAttribute("class", "hidden");

    } else if (this.enemy.isDead) {
      this.StageSwitch();
      //stage victory screen
      let title = document.getElementById("title");
      title.setAttribute("class", "hidden");
      let enemyDeath = document.getElementById("enemy-death");
      enemyDeath.setAttribute("class", "hideme");
      let hideOnEnd = document.getElementById("hideOnEnd");
      hideOnEnd.setAttribute("class", "hidden");
      await delay(2000);
      title.setAttribute("class", "hideme");
      hideOnEnd.setAttribute("class", "hideme");
      enemyDeath.setAttribute("class", "hidden");
      if (this.stages[this.stages.length - 1]) {
        //final victory screen
      }
    }
  }
}


