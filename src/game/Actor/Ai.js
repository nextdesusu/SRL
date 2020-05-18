export class BaseAi {
  constructor(target) {
    this.owner = null;
    this.target = target;
  }

  deleteFromBots() {}

  takeTurn() {
    const { owner, target } = this;
    const { x, y } = target.mapRepr;
    if (owner.mapRepr.isInFov(x, y)) {
      if (owner.mapRepr.distanceTo(target) >= 2) {
        owner.mapRepr.moveTowards(x, y);
      } else {
        owner.fighter.attack(target);
      }
    }
  }
}
