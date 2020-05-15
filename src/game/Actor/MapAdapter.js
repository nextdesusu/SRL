export default class MapAdapter {
  constructor(tileIndex, map, x, y) {
    this.tileIndex = tileIndex;
    this.map = map;
    this.x = x;
    this.y = y;
    this.blocks = true;
    this.owner = null;
  }

  moveTowards(targetX, targetY) {
    const dist = this.distance(targetX, targetY);
    const dx = Math.round((targetX - this.x) / dist);
    const dy = Math.round((targetY - this.y) / dist);
    this.move(dx, dy);
  }

  isBlocked(x, y) {
    if (this.map.isWallAt(x, y)) {
      return true;
    }
    if (this.map.isActorAt(x, y)) {
    }
    if (this.map.isObjectAt(x, y)) {
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

  deleteFromMap() {
    this.map.deleteActorAdapter(this);
  }

  distanceTo(other) {
    const { x, y } = other.mapAdapter;
    return this.distance(x, y);
  }

  distance(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  isInFov(x, y) {
    const mapSize = this.map.size;
    const { fov } = this.owner.stats;
    let xMin = this.x - fov;
    let yMin = this.y - fov;
    let xMax = this.x + fov;
    let yMax = this.y + fov;
    if (xMin < 0) xMin = 0;
    if (yMin < 0) yMin = 0;
    if (xMax > mapSize) xMax = mapSize;
    if (yMax > mapSize) yMax = mapSize;
    return x > xMin - 1 && x < xMax && y > yMin - 1 && y < yMax;
  }
}
