export class BaseAi {
  constructor(target) {
    this.owner = null;
    this.target = target;
  }

  deleteFromBots() {}

  takeTurn() {
    const { owner, target } = this;
    const { x, y } = target.mapAdapter;
    if (owner.mapAdapter.isInFov(x, y)) {
      if (owner.mapAdapter.distanceTo(target) >= 2) {
        owner.mapAdapter.moveTowards(x, y);
      } else {
        owner.fighter.attack(target);
      }
    }
  }
}
