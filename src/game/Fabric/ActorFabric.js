import Actor from "../Actor";
import Stats from "../Actor/Stats";
import Fighter from "../Actor/Fighter";
import MapAdapter from "../Actor/MapAdapter";
import Inventory from "../Actor/Inventory";
import { BaseAi } from "../Actor/Ai";

export default class ActorFabric {
  constructor(randomBattleGenerator, map, logger) {
    this.RBG = randomBattleGenerator;
    this.map = map;
    this.player = null;
    this.Logger = logger;
  }
  spawnPlayer(name, x, y) {
    if (this.player !== null) {
      throw Error("Player already spawned!");
    }
    const mapAdapter = new MapAdapter(0, this.map, x, y);
    const fighter = new Fighter(this.RGB, this.Logger);
    const stats = new Stats(10, 10, 10, 10, 10);
    const inv = new Inventory();
    const player = new Actor(name, mapAdapter, fighter, stats, inv);
    this.player = player;
    this.map.addActorAdapter(player);
  }
  spawnTestMonster(x, y) {
    const mapAdapter = new MapAdapter(1, this.map, x, y);
    const fighter = new Fighter(this.RGB, this.Logger);
    const stats = new Stats(3, 3, 3, 3, 3);
    const ai = new BaseAi(this.player);
    const inv = new Inventory();
    const monster = new Actor(
      "test-monster",
      mapAdapter,
      fighter,
      stats,
      inv,
      ai
    );
    this.map.addActorAdapter(monster);
  }
}
