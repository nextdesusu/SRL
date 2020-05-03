import InterfaceBuilder from "./InterfaceBuilder";
import GameCanvas from "./GameCanvas";
import FileLoader from "./FileLoader";
import RandomGenerator from "./RandomGenerator";
import Map from "./Map";
import ActorFabric from "./Fabric/ActorFabric";
import { TILE_SIZE } from "./consts/File";

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

  drawMap(mapTiles) {
    const map = this.GameMap;
    const size = map.size;
    const ctx = this.Canvas.ctx;
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        if (map._map[x][y].blocked) {
          ctx.drawImage(
            mapTiles.wall,
            x * TILE_SIZE,
            y * TILE_SIZE,
            TILE_SIZE,
            TILE_SIZE
          );
        } else {
          ctx.drawImage(
            mapTiles.ground,
            x * TILE_SIZE,
            y * TILE_SIZE,
            TILE_SIZE,
            TILE_SIZE
          );
        }
      }
    }
  }

  async begin() {
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
    this.drawMap(mapTiles);
  }
}
