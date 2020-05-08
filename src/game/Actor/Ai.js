export class BaseAi {
    constructor(target) {
        this.owner = null;
        this.target = target;
    }

    takeTurn() {
        const { owner, target } = this;
        if (owner.distanceTo(target) >= 2) {
            owner.moveTowards(target.x, target.y);
        } else {
            owner.fighter.attack(target);
        }
    }
}