import Actor from "../Actor";
import Stats from "../Actor/Stats";
import Fighter from "../Actor/Fighter";

export default class ActorFabric {
  constructor(randomBattleGenerator, map) {
    this.RBG = randomBattleGenerator;
    this.map = map;
    this.actorsList = [];
  }
  spawnPlayer(name, x, y) {
    const fighter = new Fighter(this.RGB);
    const stats = new Stats(10, 10, 10, 10, 10);
    const actor = new Actor(
      name,
      0,
      this.map,
      x,
      y,
      this.actorsList,
      fighter,
      stats
    );
    this.actorsList.push(actor);
    return actor;
  }
  spawnTestMonster(x, y) {
    const fighter = new Fighter(this.RGB);
    const stats = new Stats(10, 10, 10, 10, 10);
    const actor = new Actor(
      "test-monster",
      0,
      this.map,
      x,
      y,
      this.actorsList,
      fighter,
      stats
    );
    this.actorsList.push(actor);
    return actor;
  }
}
