import InterfaceBuilder from "./InterfaceBuilder";
import GameCanvas from "./GameCanvas";
import FileLoader from "./FileLoader";
import RandomGenerator from "./RandomGenerator";
import Map from "./Map";
import ActorFabric from "./Fabric/ActorFabric";
import { TILE_SIZE } from "./consts/File";
import Logger from "./Logger";

export default class Game {
  constructor(body, width, height) {

    this.Canvas = new GameCanvas(body, width, height);
    this.Interface = new InterfaceBuilder(body, {
      system: "rgba(0, 0, 0, 0.3)",
    });
    this.FileLoader = new FileLoader();
    this.GameMap = new Map();
    this.Interface.createDialogue("system");
    this.Logger = new Logger(
      this.Interface.dialogue,
      document.createElement("p")
    );
    this.Interface.setSize(width, height);
    window.addEventListener("resize", () => {
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      this.Canvas.setSize(width, height);
      this.Interface.setSize(width, height);
    });
    this.GameMap.generateMap(40);
    const seed = 100000;
    this.Spawner = new ActorFabric(
      new RandomGenerator(seed),
      this.GameMap,
      this.Logger
    );
    this.Spawner.spawnPlayer("player", 3, 3);
  }

  drawAll() {
    const { ctx, viewport, width, height } = this.Canvas;
    const map = this.GameMap;
    const mapSize = map.size;
    const { player, actors } = this.Spawner;
    viewport.scrollTo(player.x * TILE_SIZE, player.y * TILE_SIZE);
    let xMin = player.x - player.fov;
    let yMin = player.y - player.fov;
    let xMax = player.x + player.fov;
    let yMax = player.y + player.fov;
    if (xMin < 0) xMin = 0;
    if (yMin < 0) yMin = 0;
    if (xMax > mapSize) xMax = mapSize;
    if (yMax > mapSize) yMax = mapSize;
    console.log(viewport.x, viewport.y);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    const mapTiles = {
      wall: this.FileLoader.getTile("stonewall"),
      ground: this.FileLoader.getTile("earthground"),
    };
    const mapBodies = [
      this.FileLoader.getTile("test1"),
      this.FileLoader.getTile("test2"),
    ];

    for (let x = xMin; x < xMax; x++) {
      for (let y = yMin; y < yMax; y++) {
        const tileX = Math.floor(
          x * TILE_SIZE - viewport.x + width * 0.5 - viewport.w * 0.5
        );
        const tileY = Math.floor(
          y * TILE_SIZE - viewport.y + height * 0.5 - viewport.h * 0.5
        );
        if (map._map[x][y].blocked) {
          ctx.drawImage(mapTiles.wall, tileX, tileY, TILE_SIZE, TILE_SIZE);
        } else {
          ctx.drawImage(mapTiles.ground, tileX, tileY, TILE_SIZE, TILE_SIZE);
        }
      }
    }
    for (const { tileIndex, x, y } of actors.all) {
      const actorX = Math.floor(
        x * TILE_SIZE - viewport.x + width * 0.5 - viewport.w * 0.5
      );
      const actorY = Math.floor(
        y * TILE_SIZE - viewport.y + height * 0.5 - viewport.h * 0.5
      );
      ctx.drawImage(mapBodies[tileIndex], actorX, actorY, TILE_SIZE, TILE_SIZE);
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
    this.botsTurn();
    this.drawAll();
  }

  begin() {
    const tileNames = ["earthground", "stonewall", "brickwall"];
    const bodieNames = ["test1", "test2"];
    this.FileLoader.loadTiles(["assets", "tiles", "level"], tileNames);
    this.FileLoader.loadTiles(["assets", "tiles", "bodies"], bodieNames);

    const moveOrAttack = (dx, dy) => {
      const { player, actors } = this.Spawner;
      const newX = player.x + dx;
      const newY = player.y + dy;
      if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        for (let actor of actors.all) {
          if (actor.x === newX && actor.y === newY) {
            player.fighter.attack(actor);
            return;
          }
        }
        player.move(dx, dy);
      }
    };
    const proceedIfNeeded = (event) => {
      const { player } = this.Spawner;
      if (event instanceof KeyboardEvent) {
        //console.log(event.key);
        switch (event.key) {
          case "ArrowRight":
            moveOrAttack(1, 0);
            break;
          case "ArrowLeft":
            moveOrAttack(-1, 0);
            break;
          case "ArrowUp":
            moveOrAttack(0, -1);
            break;
          case "ArrowDown":
            moveOrAttack(0, 1);
            break;
          case "PageDown":
            moveOrAttack(1, 1);
            break;
          case "Home":
            moveOrAttack(-1, -1);
            break;
          case "PageUp":
            moveOrAttack(1, -1);
            break;
          case "End":
            moveOrAttack(-1, 1);
            break;
        }
        this.nextTurn();
      }
      if (event instanceof MouseEvent) {
        console.log("mouse pressed");
      }
    };
    setTimeout(() => {
      this.Logger.congrat("Игра началась!");
      this.Spawner.spawnTestMonster(7, 8);
      window.addEventListener("keydown", proceedIfNeeded);
      window.addEventListener("mousedown", proceedIfNeeded);
      this.nextTurn();
    }, 1000);
  }
}
