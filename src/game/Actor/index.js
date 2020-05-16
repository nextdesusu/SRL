export default class Actor {
  constructor(name, mapRepr, fighter, stats, inventory, ai = null) {
    this.name = name;
    this.mapRepr = mapRepr;
    mapRepr.owner = this;

    stats.owner = this;
    this.stats = stats;

    fighter.owner = this;
    fighter.hp = stats.maxHp;
    this.fighter = fighter;

    inventory.owner = this;
    this.inventory = inventory;
    if (ai !== null) {
      ai.owner = this;
    }
    this.ai = ai;
  }

  die() {
    this.mapRepr.deleteFromMap();
    if (this.ai) {
    }
  }
}
