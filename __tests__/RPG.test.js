import { Character } from "./../src/js/RPG.js";
// constructor(name, type, maxHealth, damage, finesse, actions)
describe("Character", () => {
  test("should create character object with 6 attributes", () => {
    let character = new Character("Farquad", "Lord", 5, 2, 2, "Run");
    expect(character.name).toEqual("Farquad");
    expect(character.type).toEqual("Lord");
    expect(character.maxHealth).toEqual(5);
    expect(character.damage).toEqual(2);
    expect(character.finesse).toEqual(2);
    expect(character.actions).toEqual("Run");
    expect(character.isDead).toEqual(false);
  });
})

describe("Attack", () => {
  test("Should determine whether a player hits and how much damage is inflicted", () => {
    let character = new Character("Farquad", "Lord", 5, 2, 2, "Attack");
    let target = new Character("Shrek", "Ogre", 10, 5, 2, "Attack");
    let damage = character.Attack(target);

    expect(typeof damage).toBe('number');
  });

  test("it should modify current health based off of roll damage", () => {
    let target = new Character("Shrek", "Ogre", 10, 5, 2, "Attack");
    let character = new Character("Farquad", "Lord", 50, 50, 5, "Attack");
    let damage = character.Attack(target);
    expect(typeof damage).toBe('number');
    expect(target.Health()).toBe("you are almost dead");
  })
});

describe("Health", () => {
  test("Should return health status", () => {
    let character = new Character("Farquad", "Lord", 10, 2, 2, "Attack");
    let healthMsg = character.Health()
    expect(healthMsg).toEqual("you are healthy");
  });
});

describe("DecideTurn", () => {
  test("Should set character turn to true if both character.isTurn and target.isTurn are false", () => {
    let target = new Character("Shrek", "Ogre", 10, 5, 2, "Attack");
    let character = new Character("Farquad", "Lord", 50, 50, 5, "Attack");
    character.DecideTurn(target);
    expect(character.isTurn).toEqual(true);
  });
});

describe("EnemyLogic", (character, target) => {
  test("Computer should attack player character, log damage, and switch turns", () => {
    let target = new Character("Shrek", "Ogre", 10, 5, 2, "Attack");
    let character = new Character("Farquad", "Lord", 50, 50, 5, "Attack");
    target.isTurn = true;
    target.EnemyLogic(character, target);
    expect(character.currentHealth).toBeLessThan(50);
    expect(character.isTurn).toEqual(true);
  });
});
   