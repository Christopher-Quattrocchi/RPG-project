import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Character from "./js/RPG.js";

document.getElementById("character-form").addEventListener("submit", handleForm);
const characterImg = {
  "Shrek": "./assets/shrek.jpg",
  "Donkey": "./assets/donkey.jpg",
  "Fiona": "./assets/ogre-fiona.jpg",
  "Puss In Boots": "./assets/pussinboots.jpg",
}

const enemyImg = {
  "Lord Farquad": "./assets/farquaad.jpg",
  "Dragon": "./assets/dragon.jpg",
  "Prince Charming": "./assets/princecharming.jpg",
  "Human Shrek": "./assets/human-shrek.jpg",
}

function handleForm(event) {
  event.preventDefault();
  document.querySelector("#hold-character").innerText = null;
  document.querySelector("#hold-enemy").innerText = null;

  const character = (document.querySelector("#select-character").value);
  const enemy = (document.querySelector("#select-enemy").value);
  //need logic to fill in character and enemy stats

  // let myGame = new GameState(character, enemy)

  const hTag = document.createElement("p");
  const eTag = document.createElement("p");
  hTag.append('Your fighter is: ' + character);
  eTag.append('Your enemy is: ' + enemy);
  document.querySelector('#hold-character').append(hTag);
  document.querySelector('#hold-enemy').append(eTag);
  document.querySelector('#hold-character').classList.remove("hidden");
  document.querySelector('#hold-enemy').classList.remove("hidden");

  const selectedEnemy = document.querySelector("#select-enemy").value;
  const enemyImgUrl = enemyImg[selectedEnemy] || "";
  const selectedCharacter = document.querySelector("#select-character").value;
  const characterImgUrl = characterImg[selectedCharacter] || "";

  document.getElementById("character-img").src = characterImgUrl;
  document.getElementById("enemy-img").src = enemyImgUrl;
}


// function characterSelector() {
//   let playerRENAMEME = new Character(FILL ME LATER);
//   let enemyRENAMEME = new Character(FILL ME LATER;
//     if ()
// }

function updateDisplay() {

}

class GameState {
  constructor(character, enemy) {
    this.stages = [true, false, false, false];
    this.character = character;
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