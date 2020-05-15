export default class Actor {
  constructor(name, mapAdapter, fighter, stats, ai = null) {
    this.name = name;
    this.mapAdapter = mapAdapter;
    mapAdapter.owner = this;

    stats.owner = this;
    this.stats = stats;

    fighter.owner = this;
    fighter.hp = stats.maxHp;
    this.fighter = fighter;

    if (ai !== null) {
      ai.owner = this;
    }
    this.ai = ai;
  }

  die() {
    this.mapAdapter.deleteFromMap();
    if (this.ai) {
      
    }
  }
}
