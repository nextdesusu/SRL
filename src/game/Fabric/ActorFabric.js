import Actor from "../Actor";
import Fighter from "../Actor/Fighter";

export default class ActorFabric {
  constructor(randomBattleGenerator) {
    this.RBG = randomBattleGenerator;
    this.actorsList = [];
  }
  spawnPlayer(name, map, x, y) {
    const fighter = new Fighter(10, 10, 10, this.RGB);
    const actor = new Actor(name, 0, map, x, y, this.actorsList, fighter);
    this.actorsList.push(actor);
    return actor;
  }
  spawnTestMonster(map, x, y) {
    const fighter = new Fighter(3, 3, 3, this.RGB);
    const actor = new Actor(
      "test-monster",
      0,
      map,
      x,
      y,
      this.actorsList,
      fighter
    );
    this.actorsList.push(actor);
    return actor;
  }
}
