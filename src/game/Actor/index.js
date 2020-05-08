export default class Actor {
  constructor(name, tileIndex, map, x, y, fighter, stats, actors, ai = null) {
    this.name = name;
    this.tileIndex = tileIndex;
    this.map = map;
    this.x = x;
    this.y = y;
    this.actorsList = actors;

    stats.owner = this;
    this.stats = stats;

    fighter.owner = this;
    fighter.hp = stats.maxHp;
    this.fighter = fighter;

    if (ai !== null) {
      ai.owner = this;
    }
    this.ai = ai;

    this.blocks = true;
  }

  moveTowards(targetX, targetY) {
    const dist = this.distance(targetX, targetY);
    const dx = Math.round((targetX - this.x) / dist);
    const dy = Math.round((targetY - this.y) / dist);
    this.move(dx, dy);
  }

  isBlocked(x, y) {
    if (this.map.isBlocked(x, y)) {
      return true;
    }
    for (const actor of this.actorsList.all) {
      if (actor.blocks && actor.x === x && actor.y === y) {
        return true;
      }
    }

    return false;
  }

  move(dx, dy) {
    const newX = this.x + dx;
    const newY = this.y + dy;
    if (!this.isBlocked(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }
    //Dev check
    if (Math.abs(newX - this.x) > 1 || Math.abs(newY - this.y) > 1) {
      throw Error("Cant move to more than one tile!");
    }
  }

  distanceTo(other) {
    const { x, y } = other;
    return this.distance(x, y);
  }

  distance(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }
}
