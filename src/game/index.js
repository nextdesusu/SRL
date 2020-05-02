import InterfaceBuilder from "./InterfaceBuilder";
import GameCanvas from "./GameCanvas";
import FileLoader from "./FileLoader";
import RandomGenerator from "./RandomGenerator";
import Map from "./Map";
import ActorFabric from "./Fabric/ActorFabric";

export default class Game {
  constructor(body, width, height) {
    this.Canvas = new GameCanvas(body, width, height);
    this.Interface = new InterfaceBuilder(body, {
      system: "rgba(0, 0, 0, 0.3)",
    });
    this.FileLoader = new FileLoader();
    this.GameMap = new Map();
    const seed = 100000;
    this.Spawner = new ActorFabric(new RandomGenerator(seed), this.GameMap);
    this.init(width, height);
  }

  init(width, height) {
    this.Interface.createDialogue("system");
    this.Interface.setSize(width, height);
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.Canvas.setSize(width, height);
      this.Interface.setSize(width, height);
    });
    this.GameMap.generateMap(10);
  }

  async begin() {
    const ctx = this.Canvas.ctx;
    const ms = 300;
    ctx.fillStyle = "red";
    const tileNamesSet = new Set();
    tileNamesSet.add("earthground");
    tileNamesSet.add("stonewall");
    tileNamesSet.add("brickwall");
    await this.FileLoader.loadTiles(["assets", "tiles", "level"], tileNamesSet);
    console.log(this.GameMap._map);
    const mapTiles = {
      wall: this.FileLoader.getTile("stonewall"),
      ground: this.FileLoader.getTile("earthground"),
    };
    const player = this.Spawner.spawnPlayer("player", this.GameMap, 2, 2);
    setInterval(() => {
      //Canvas.refresh();
      this.Canvas.drawMap(this.GameMap, mapTiles);
      //ctx.drawImage(tile, 0, 0, 32, 32);
      //console.log("x", x);
      //console.log(TestGen.generate(100));
      console.log(player);
    }, ms);
  }
}
