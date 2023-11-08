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


//
// import Triangle from "./../src/js/triangle.js";

// describe("Triangle", () => {
//   test("should correctly create a triangle object with three lengths", () => {
//     const triangle = new Triangle(2, 4, 5);
//     expect(triangle.side1).toEqual(2);
//     expect(triangle.side2).toEqual(4);
//     expect(triangle.side3).toEqual(5);
//   });

// test("should correctly determine whether three lengths are not a triangle", () => {
//   const notTriangle = new Triangle(3, 9, 22);
//   expect(notTriangle.checkType()).toEqual("not a triangle");
// });

// test("should correctly determine whether three lengths make an isosceles triangle", () => {
//   const isocTriangle = new Triangle(5, 5, 7);
//   expect(isocTriangle.checkType()).toEqual("isosceles triangle");
// });

// test("should correctly determine whether three lengths make an scalene triangle", () => {
//   const scalTriangle = new Triangle(2, 3, 4);
//   expect(scalTriangle.checkType()).toEqual("scalene triangle");
// });

// test("should correctly determine whether three lengths make an equilateral triangle", () => {
//   const equiTriangle = new Triangle(5, 5, 5);
//   expect(equiTriangle.checkType()).toEqual("equilateral triangle");
// });
//;