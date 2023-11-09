
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
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#character-form").addEventListener("submit", handleForm);
});


// const characterImg = {
//   "Shrek": "./assets/shrek.jpg",
//   "Donkey": "./assets/donkey.jpg",
//   "Fiona": "./assets/ogre-fiona.jpg",
//   "Puss In Boots": "./assets/pussinboots.jpg",
// }

// const enemyImg = {
//   "Lord Farquad": "./assets/farquaad.jpg",
//   "Dragon": "./assets/dragon.jpg",
//   "Prince Charming": "./assets/princecharming.jpg",
//   "Human Shrek": "./assets/human-shrek.jpg",
// }

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


function handleForm(event) {
  event.preventDefault();

  //Troubleshooting
  // console.log(document.body.innerHTML);
  console.log(document.getElementById("character-img"));
  console.log(document.getElementById("enemy-img"));

  //Clear previous
  const holdCharacterDiv = document.querySelector("#hold-character");
  const holdEnemyDiv = document.querySelector("#hold-enemy");
  holdCharacterDiv.innerText = "";
  holdEnemyDiv.innerText = "";

  //Get character and enemy
  const selectedCharacter = (document.querySelector("#select-character").value);
  const selectedEnemy = (document.querySelector("#select-enemy").value);

  //Convert to match keys
  // const characterKey = formatSelectionKey(selectedCharacter);
  // const enemyKey = formatSelectionKey(selectedEnemy);


  //Character selection logic
  const isFinalEnemy = selectedEnemy === "dragon"

  //Debug stuff
  // console.log("Character Key:", characterKey);
  // console.log("Enemy Key:", enemyKey);

  const { player, enemy } = characterSelector(selectedCharacter, selectedEnemy, isFinalEnemy);
  //Init game
  let myGame = new GameState(player, enemy);

  //Update display
  updateDisplay(holdCharacterDiv, holdEnemyDiv, player, enemy);
}

// /////START SHAKE EFFECT
// function applyShakeEffect(enemyElement) {
//   enemyElement.classList.add('shake');

//   // Remove the class after the animation ends
//   enemyElement.addEventListener('animationend', () => {
//     enemyElement.classList.remove('shake');
//   }, { once: true });
// }

// // Usage example
// // Apply the shake effect when an enemy is hit
// // replace 'enemyImageId' with the actual ID of your enemy image element
// const enemyImageElement = document.getElementById('enemyImageId');
// applyShakeEffect(enemyImageElement);
// /////END SHAKE EFFECT


// Helper function to format the selection key properly
// function formatSelectionKey(selection) {
//   // This will turn something like 'lord-farquad' into 'Lord Farquad'
//   return selection.split('-')
//     .map(part => part.charAt(0).toUpperCase() + part.slice(1))
//     .join(' ');
// }


function characterSelector(characterName, enemyName, isFinalEnemy = false) {
  let player;
  let enemy;

  //Use formatted name
  // characterName = formatSelectionKey(characterName);
  // enemyName = formatSelectionKey(enemyName);
  //help
  console.log("In char select, characterName is:", characterName);
  console.log("In char select, enemyName is:", enemyName);

  if (characterName === "Shrek") {
    player = new Character("Shrek", "an ogre", 120, 20, 1, "Attack");
  } else if (characterName === "Donkey") {
    player = new Character("Donkey", "a donkey", 80, 10, 4, "Attack");
  } else if (characterName === "Fiona") {
    player = new Character("Fiona", "an ogre", 100, 15, 3, "Attack");
  } else if (characterName === "PussInBoots") {
    player = new Character("Puss In Boots", "a cat", 75, 15, 5, "Attack");
  }

  if (isFinalEnemy) {
    enemy = new Character("Dragon", "a dragon", 220, 30, 0, "Attack");
  } else if (enemyName === "LordFarquad") {
    enemy = new Character("Lord Farquad", "a man", 65, 10, 6, "Attack");
  } else if (enemyName === "PrinceCharming") {
    enemy = new Character("Prince Charming", "a man", 90, 15, 4, "Attack");
  } else if (enemyName === "HumanShrek") {
    enemy = new Character("Human Shrek", "a man", 100, 15, 4, "Attack");
  }
  //help
  console.log("Created player:", player);
  console.log("Created enemy:", enemy);

  return { player, enemy };

}

function updateDisplay(holdCharacterDiv, holdEnemyDiv, player, enemy) {
  console.log("Player:", player);
  console.log("Enemy:", enemy);
  if (!player || !enemy) {
    console.error("Invalid player or enemy object");
    return;
  }
  //Text content set to something
  const hTag = document.createElement("p");
  const eTag = document.createElement("p");
  hTag.textContent = 'Your fighter is: ' + player.name;
  eTag.textContent = 'Your enemy is: ' + enemy.name;
  holdCharacterDiv.appendChild(hTag);
  holdEnemyDiv.appendChild(eTag);

  holdCharacterDiv.classList.remove("hidden");
  holdEnemyDiv.classList.remove("hidden");


  //Correct src path to be relative to location of index. I am broken currently
  console.log("In update display, I shouldn't be null:", document.getElementById("character-img"));//Should not be null 
  console.log("In update display, I shouldn't be null:", document.getElementById("enemy-img"));//Should not be null 
  const characterImgElement = document.getElementById("character-img");
  const enemyImgElement = document.getElementById("enemy-img");


  if (characterImgElement && enemyImgElement) {
    characterImgElement.src = characterImg[player.name] || defaultImageOne;
    enemyImgElement.src = enemyImg[enemy.name] || defaultImageTwo;
  } else {
    console.error("One of the images couldn't be found in DOM");
  }

}

class GameState {
  constructor(player, enemy) {
    this.stages = [true, false, false, false];
    this.player = player;
    this.enemy = enemy;
  }

  StageSwitch() {
    const nextStageIndex = this.stages.findIndex(stage => stage) + 1;
    if (nextStageIndex < this.stages.length) {
      this.stages.fill(false);
      this.stages[nextStageIndex] = true;
    }
    // if (stageOne && !stageFour) {
    //   stageOne = false;
    //   stageTwo = true;
    // } else if (stageTwo && !stageFour) {
    //   stageTwo = false;
    //   stageThree = true;
    // } else if (stageThree && !stageFour) {
    //   stageThree = false;
    //   stageFour = true;
    // }
  }

  EndCheck() {
    if (this.character.isDead) {
      // death screen
    } else if (this.enemy.isDead) {
      this.StageSwitch();
      //stage victory screen
      if (this.stages[this.stages.length - 1]) {
        //final victory screen
      }
    }
  }
}


//DELAY FUNCTION
function delay(ms) {//so we can add delays more consistently than with setinterval which sucks
  return new Promise(resolve => setTimeout(resolve, ms));
}

// await delay(1000);   //SHOWS HOW TO USE IT
//END DELAY FUNCTIOn
