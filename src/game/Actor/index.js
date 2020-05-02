import Fighter from "./Fighter";
import MapAdapter from "./MapAdapter";

export default class Actor {
  constructor(name, tileIndex, map, x, y, actorsList, fighter, ai = null) {
    this.name = name;
    this.tileIndex = tileIndex;
    this.map = map;
    this.x = x;
    this.y = y;
    this.actorsList = actorsList;
    this.fighter = fighter;
    this.mapAdapter = mapAdapter;
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
    if (!this.map.isBlocked(x, y)) {
      return true;
    }

    for (const actor of this.actorsList) {
      if (actor.blocks && actor.x === x && actor.y === y) {
        return true;
      }
    }

    return false;
  }

  move(dx, dy) {
    const newX = this.x + dx;
    const newY = this.y + dy;
    if (!this.isBlocked(dx, dy)) {
      this.x = newX;
      this.y = newY;
    }
    //Dev check
    if (Math.abs(newX - this.x) > 1 || Math.abs(newY - this.y) > 1) {
      throw Error("Cant move to more than one tile!");
    }
  }

  distanceTo(other) {
    if (!other.mapAdapter) {
      throw Error(`Object dont have a map adapter!`);
    }
    const { x, y } = other.mapAdapter;
    return this.distance(x, y);
  }

  distance(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }
}
