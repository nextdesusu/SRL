import { HealingItem } from "../Item";
import { ItemMapRepresentation } from "../Map/MapRepresentation";

export default class ItemFabric {
  constructor(map) {
    this.map = map;
  }

  spawnHealPotion(name, healPower, x, y) {
    const mapRepr = new ItemMapRepresentation(0, this.map, x, y);
    const item = new HealingItem(name, mapRepr, healPower);
    this.map.addItem(item);
  }
}
