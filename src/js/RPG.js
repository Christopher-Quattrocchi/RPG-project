export class Character {
  constructor(name, type, health, damage, actions) {
    this.name = name;
    this.type = type;
    this.health = health;
    this.damage = damage;
    this.actions = actions;
    this.isDead = false;
  }

  Attack() {
    let toHit = Math.floor(Math.random() * 20) + 1;
    let rollDamage = Math.floor(Math.random() * 5) + this.damage;

    if (toHit >= 18) {
      console.log("A mighty blow!");
      return rollDamage = rollDamage * 2;
    } else if (toHit >= 10) {
      console.log("You connect!");
      return rollDamage;
    } else {
      console.log("You missed");
      return rollDamage = 0;
    }
  }
  
  Health() {
    let health = (100);
    if (80 >= health) {
      console.log("you are hurt");
    } else if (50 >= health) {
      console.log("you are severely wounded");
    } else if (20 >= health) {
      console.log("you are almost dead");
    } else if (0 >= health) {
      console.log("you are dead");
    }
  }


}




