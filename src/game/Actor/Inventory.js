export default class Inventory {
  constructor() {
    this._putOnMe = new Array(9).fill(null);
    this.owner = null;
  }

  get weaponLeft() {
    return this._putOnMe[0];
  }

  set weaponLeft(newWeapon) {
    this._putOnMe[0] = newWeapon;
  }

  get weaponRight() {
    return this._putOnMe[1];
  }

  set weaponRight(newWeapon) {
    this._putOnMe[1] = newWeapon;
  }

  get helmet() {
    return this._putOnMe[2];
  }

  set helmet(newHelmet) {
    this._putOnMe[2] = newHelmet;
  }

  get bodyArmour() {
    return this._putOnMe[3];
  }

  set bodyArmour(newArmour) {
    this._putOnMe[3] = newArmour;
  }

  get gloves() {
    return this._putOnMe[4];
  }

  set gloves(newGloves) {
    this._putOnMe[4] = newGloves;
  }

  get trousers() {
    return this._putOnMe[5];
  }

  set trousers(newTrousers) {
    this._putOnMe[5] = newTrousers;
  }

  get leftRing() {
    return this._putOnMe[6];
  }

  set leftRing(newRing) {
    this._putOnMe[6] = newRing;
  }

  get rightRing() {
    return this._putOnMe[7];
  }

  set rightRing(newRing) {
    this._putOnMe[7] = newRing;
  }

  get necklace() {
    return this._putOnMe[8];
  }

  set necklace(newNeclace) {
    this._putOnMe[8] = newNeclace;
  }

  get armour() {
    return this._putOnMe.reduce((item, accum) =>
      item.armour ? accum + item.armour : accum
    );
  }
}
