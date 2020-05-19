import InterfaceBuilder from "./InterfaceBuilder";
import GameCanvas from "./GameCanvas";
import FileLoader from "./FileLoader";
import RandomGenerator from "./RandomGenerator";
import Map from "./Map";
import ActorFabric from "./Fabric/ActorFabric";
import ItemFabric from "./Fabric/ItemFabric";
import { TILE_SIZE, REAL_TILE_SIZE } from "./consts/File";
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
    this.GameMap.generateMap(20);
    const seed = 100000;
    this.Spawner = new ActorFabric(
      new RandomGenerator(seed),
      this.GameMap,
      this.Logger
    );
    this.Spawner.spawnPlayer("player", 3, 3);

    const IF = new ItemFabric(this.GameMap);
    IF.spawnHealPotion("heal potion", 10, 1, 1);
  }

  drawAll() {
    const { ctx, viewport, width, height } = this.Canvas;
    const map = this.GameMap;
    const mapSize = map.size;
    const { player } = this.Spawner;
    const plrMapRepr = player.mapRepr;
    viewport.scrollTo(plrMapRepr.x * TILE_SIZE, plrMapRepr.y * TILE_SIZE);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    const mapTiles = [
      this.FileLoader.getTile("earthground"),
      this.FileLoader.getTile("stonewall"),
    ];
    const mapBodies = [
      this.FileLoader.getTile("test1"),
      this.FileLoader.getTile("test2"),
    ];
    const potionsTiles = [this.FileLoader.getTile("potions")];
    ctx.fillStyle = "rgba(0, 0, 0, .7)";
    for (let x = 0; x < mapSize; x++) {
      for (let y = 0; y < mapSize; y++) {
        const tileX = Math.floor(
          x * TILE_SIZE - viewport.x + width * 0.5 - viewport.w * 0.5
        );
        const tileY = Math.floor(
          y * TILE_SIZE - viewport.y + height * 0.5 - viewport.h * 0.5
        );
        const { textureId, explored, actorOn, itemsOn } = map._map[x][y];
        if (explored) {
          ctx.drawImage(
            mapTiles[textureId],
            tileX,
            tileY,
            TILE_SIZE,
            TILE_SIZE
          );
        }
        // Checking is tile in fov if not its darkened
        if (plrMapRepr.isInFov(x, y)) {
          map._map[x][y].explored = true;
          if (actorOn !== null) {
            const { tileIndex } = actorOn.mapRepr;
            ctx.drawImage(
              mapBodies[tileIndex],
              tileX,
              tileY,
              TILE_SIZE,
              TILE_SIZE
            );
          }
          if (itemsOn !== null) {
            for (const item of itemsOn) {
              const { tileIndex } = item.mapRepr;
              ctx.drawImage(
                potionsTiles[tileIndex],
                0,
                0,
                16,
                16,
                tileX,
                tileY,
                TILE_SIZE,
                TILE_SIZE
              );
            }
          }
        } else {
          ctx.fillRect(tileX, tileY, TILE_SIZE, TILE_SIZE);
        }
      }
    }
  }

  botsTurn() {
    for (const ai of this.Spawner.bots) {
      ai.takeTurn();
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
    this.FileLoader.loadTileSet(["assets", "tiles", "items"], "potions");

    const map = this.GameMap;
    const mapSize = map.size;
    const { player } = this.Spawner;
    const plrMapRepr = player.mapRepr;
    const { fov } = player.stats;
    let xMin = plrMapRepr.x - fov;
    let yMin = plrMapRepr.y - fov;
    let xMax = plrMapRepr.x + fov;
    let yMax = plrMapRepr.y + fov;
    if (xMin < 0) xMin = 0;
    if (yMin < 0) yMin = 0;
    if (xMax > mapSize) xMax = mapSize;
    if (yMax > mapSize) yMax = mapSize;
    for (let x = xMin; x < xMax; x++) {
      for (let y = yMin; y < yMax; y++) {
        map._map[x][y].explored = true;
      }
    }

    const playerTakeAction = (dx, dy) => {
      const newX = player.mapRepr.x + dx;
      const newY = player.mapRepr.y + dy;
      if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        const actorAt = this.GameMap.actorAt(newX, newY);
        if (actorAt !== null) {
          player.fighter.attack(actor);
          return;
        }
        const itemsAt = this.GameMap.itemsAt(newX, newY);
        if (itemsAt !== null) {
          for (const item of itemsAt) {
            player.inventory.pickUp(item);
          }
          this.GameMap.deleteAllItems(newX, newY);
        }
        player.mapRepr.move(dx, dy);
      }
    };
    const proceedIfNeeded = (event) => {
      if (event instanceof KeyboardEvent) {
        switch (event.key) {
          case "ArrowRight":
            playerTakeAction(1, 0);
            break;
          case "ArrowLeft":
            playerTakeAction(-1, 0);
            break;
          case "ArrowUp":
            playerTakeAction(0, -1);
            break;
          case "ArrowDown":
            playerTakeAction(0, 1);
            break;
          case "PageDown":
            playerTakeAction(1, 1);
            break;
          case "Home":
            playerTakeAction(-1, -1);
            break;
          case "PageUp":
            playerTakeAction(1, -1);
            break;
          case "End":
            playerTakeAction(-1, 1);
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
      this.drawAll();
    }, 1000);
  }
}
