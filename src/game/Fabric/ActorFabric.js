import Actor from "../Actor";
import Stats from "../Actor/Stats";
import Fighter from "../Actor/Fighter";
import { BaseAi } from "../Actor/Ai";

import FabricList from "./FabricList";

export default class ActorFabric {
  constructor(randomBattleGenerator, map, logger) {
    this.RBG = randomBattleGenerator;
    this.map = map;
    this.player = null;
    this.actors = new FabricList();
    this.Logger = logger;
  }
  spawnPlayer(name, x, y) {
    if (this.player !== null) {
      throw Error("Player already spawned!");
    }
    const fov = 4;
    const fighter = new Fighter(this.RGB, this.Logger);
    const stats = new Stats(10, 10, 10, 10, 10);
    const player = new Actor(
      name,
      fov,
      0,
      this.map,
      x,
      y,
      fighter,
      stats,
      this.actors
    );
    this.actors.add(player);
    this.player = player;
  }
  spawnTestMonster(x, y) {
    const fighter = new Fighter(this.RGB, this.Logger);
    const fov = 4;
    const stats = new Stats(10, 10, 10, 10, 10);
    const ai = new BaseAi(this.player);
    const monster = new Actor(
      "test-monster",
      fov,
      1,
      this.map,
      x,
      y,
      fighter,
      stats,
      this.actors,
      ai
    );
    this.actors.add(monster);
  }
}
