export default class Fighter {
  constructor(RGB, logger) {
    this.owner = null;
    this.hp = 0;
    this.RGB = RGB;
    this.Logger = logger;
  }

  attack(target) {
    const damage = this.owner.stats.str;
    this.Logger.battle(`${this.owner.name} атакует ${target.name} нанося ${damage} урона`);
    target.fighter.takeDamage(damage);
  }

  takeDamage(amount) {
    this.hp -= amount;
    if (this.hp < 1) {
      this.die();
    }
  }

  die() {
    this.Logger.battle(`${this.owner.name} умирает`);
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
