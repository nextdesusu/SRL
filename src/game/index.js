import InterfaceBuilder from "./InterfaceBuilder";
import GameCanvas from "./GameCanvas";
import FileLoader from "./FileLoader";
import RandomGenerator from "./RandomGenerator";
import Map from "./Map";
import ActorFabric from "./Fabric/ActorFabric";
import { TILE_SIZE } from "./consts/File";
import { DIRECTIONS } from "./consts/Actor";
import Logger from "./Logger";

export default class Game {
  constructor(body, width, height) {
    this.Canvas = new GameCanvas(body, width, height);
    this.Interface = new InterfaceBuilder(body, {
      system: "rgba(0, 0, 0, 0.3)",
    });
    this.FileLoader = new FileLoader();
    this.GameMap = new Map();
    this.Logger = null;

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

    const p = document.createElement("p");
    this.Logger = new Logger(this.Interface.dialogue, p);
    const seed = 100000;
    this.Spawner = new ActorFabric(
      new RandomGenerator(seed),
      this.GameMap,
      this.Logger
    );
    this.Spawner.spawnPlayer("player", 3, 3);
  }

  drawActors(mapBodies) {
    const ctx = this.Canvas.ctx;
    const { actors } = this.Spawner;
    console.log(actors.all);
    for (const { tileIndex, x, y } of actors.all) {
      ctx.drawImage(
        mapBodies[tileIndex],
        x * TILE_SIZE,
        y * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
      );
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

  botsTurn() {
    const { actors } = this.Spawner;
    for (const { ai } of actors.all) {
      if (ai !== null) {
        ai.takeTurn();
      }
    }
  }

  nextTurn() {
    const mapTiles = {
      wall: this.FileLoader.getTile("stonewall"),
      ground: this.FileLoader.getTile("earthground"),
    };
    const mapBodies = [
      this.FileLoader.getTile("test1"),
      this.FileLoader.getTile("test2"),
    ];
    this.botsTurn();
    this.drawMap(mapTiles);
    this.drawActors(mapBodies);
  }

  begin() {
    const tileNames = ["earthground", "stonewall", "brickwall"];
    const bodieNames = ["test1", "test2"];
    this.FileLoader.loadTiles(["assets", "tiles", "level"], tileNames);
    this.FileLoader.loadTiles(["assets", "tiles", "bodies"], bodieNames);

    this.Spawner.spawnTestMonster(7, 8);
    const proceedIfNeeded = (event) => {
      const { player } = this.Spawner;
      if (event instanceof KeyboardEvent) {
        if (event.key === "ArrowRight") {
          const { x, y } = DIRECTIONS.right;
          player.move(x, y);
        } else if (event.key === "ArrowLeft") {
          const { x, y } = DIRECTIONS.left;
          player.move(x, y);
        } else if (event.key === "ArrowUp") {
          const { x, y } = DIRECTIONS.up;
          player.move(x, y);
        } else {
          const { x, y } = DIRECTIONS.down;
          player.move(x, y);
        }
        this.nextTurn();
      }
      if (event instanceof MouseEvent) {
        console.log("mouse pressed");
      }
    };
    window.addEventListener("keydown", proceedIfNeeded);
    window.addEventListener("mousedown", proceedIfNeeded);
  }
}
