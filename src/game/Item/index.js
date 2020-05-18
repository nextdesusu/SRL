import { WEAPON_ONE_HANDED_SLOT } from "../consts/Item";

export class Item {
  constructor(name, mapRepr) {
    this.name = name;
    
    mapRepr.owner = this;
    this.mapRepr = mapRepr;
  }
}

export class WearableItem extends Item {
  constructor(name, mapRepr, slotIndex) {
    super(name, mapRepr);
    this.slotIndex = slotIndex;
  }
}

export class OneHandedWeapon extends WearableItem {
  constructor(name, mapRepr, dmg) {
    super(name, mapRepr, WEAPON_ONE_HANDED_SLOT);
    this.dmg = dmg;
  }
}

export class HealingItem extends Item {
  constructor(name, mapRepr, healPower) {
    super(name, mapRepr);
    this.healPower = healPower;
  }
}
