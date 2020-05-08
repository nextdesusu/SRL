export default class Fighter {
  constructor(RGB, logger) {
    this.owner = null;
    this.hp = 0;
    this.RGB = RGB;
    this.Logger = logger;
  }

  attack(target) {
    this.Logger.battle(this.owner.name, "attacking", target.name)
    target.fighter.takeDamage(10);
  }

  takeDamage(amount) {
    this.hp -= amount;
    if (this.hp < 1) {
      this.die();
    }
  }

  die() {
    console.log(this.owner.name, "died");
    this.owner.actorsList.remove(this.owner);
  }

  heal(amount) {
    const total = this.hp + amount;
    const maxHp = this.owner.stats.maxHp;
    if (total > maxHp) {
      this.hp = maxHp;
    } else {
      this.hp = total;
    }
  }
}
