import { WearableItem, ConsumableItem } from "../Item";

export default class Inventory {
  constructor() {
    this._putOnMe = new Array(9).fill(null);
    this._storage = [];
    this.owner = null;
  }

  deleteFromStorage(toDelete) {
    this._storage = this._storage.filter((item) => item !== toDelete);
  }

  pickUp(item) {
    this._storage.push(item);
    item.mapRepr.deleteFromMap();
  }

  wear(item) {
    if (item instanceof WearableItem) {
      let previousItem = this._putOnMe[item.slotIndex];
      if (previousItem === null) {
        this._putOnMe[item.slotIndex] = item;
        this.deleteFromStoFrage(item);
      }
    }
  }

  consume(item) {
    if (item instanceof ConsumableItem) {
      this.deleteFromStoFrage(item);
    }
  }

  get armour() {
    return this._putOnMe.reduce((item, accum) =>
      item.armour ? accum + item.armour : accum
    );
  }
}
