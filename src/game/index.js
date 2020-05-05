import InterfaceBuilder from "./InterfaceBuilder";
import GameCanvas from "./GameCanvas";
import FileLoader from "./FileLoader";
import RandomGenerator from "./RandomGenerator";
import Map from "./Map";
import ActorFabric from "./Fabric/ActorFabric";
import { TILE_SIZE } from "./consts/File";
import { DIRECTIONS } from "./consts/Actor";

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
    this.player = this.Spawner.spawnPlayer("player", 4, 4);
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
    this.GameMap.generateMap(20);
  }

  drawActors() {
    const ctx = this.Canvas.ctx;
    ctx.fillStyle = "red";
    const actors = this.Spawner.actorsList;
    for (const actor of actors) {
      if (actor.name === "player") {
        ctx.fillStyle = "green";
      } else {
        ctx.fillStyle = "red";
      }
      ctx.fillRect(actor.x * 32, actor.y * 32, 32, 32);
    }
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

  nextTurn() {
    const mapTiles = {
      wall: this.FileLoader.getTile("stonewall"),
      ground: this.FileLoader.getTile("earthground"),
    };
    this.drawMap(mapTiles);
    this.drawActors();
  }

  async begin() {
    const tileNamesSet = new Set();
    tileNamesSet.add("earthground");
    tileNamesSet.add("stonewall");
    tileNamesSet.add("brickwall");
    await this.FileLoader.loadTiles(["assets", "tiles", "level"], tileNamesSet);

    const proceedIfNeeded = (event) => {
      console.log(DIRECTIONS);
      if (event instanceof KeyboardEvent) {
        if (event.key === "ArrowRight") {
          const { x, y } = DIRECTIONS.right;
          this.player.move(x, y);
        } else if (event.key === "ArrowLeft") {
          const { x, y } = DIRECTIONS.left;
          this.player.move(x, y);
        } else if (event.key === "ArrowUp") {
          const { x, y } = DIRECTIONS.up;
          this.player.move(x, y);
        } else {
          const { x, y } = DIRECTIONS.down;
          this.player.move(x, y);
        }
        this.nextTurn();
      }
      if (event instanceof MouseEvent) {
        console.log("mouse pressed");
      }
    };
    this.Spawner.spawnTestMonster(5, 5);
    window.addEventListener("keydown", proceedIfNeeded);
    window.addEventListener("mousedown", proceedIfNeeded);
  }
}
