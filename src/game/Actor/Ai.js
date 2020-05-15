export class BaseAi {
  constructor(target) {
    this.owner = null;
    this.target = target;
  }

  deleteFromBots() {}

  takeTurn() {
    const { owner, target } = this;
    if (owner.mapAdapter.distanceTo(target) >= 2) {
      const { x, y } = target.mapAdapter;
      owner.mapAdapter.moveTowards(x, y);
    } else {
      owner.fighter.attack(target);
    }
  }
}
