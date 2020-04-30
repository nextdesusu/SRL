import InterfaceBuilder from "./InterfaceBuilder";
import GameCanvas from "./GameCanvas";
import FileLoader from "./FileLoader";
import RandomGenerator from "./RandomGenerator";
import Map from "./Map";

const startGame = async (body, width, height) => {
  const Canvas = new GameCanvas(body, width, height);
  const Interface = new InterfaceBuilder(body, {
    system: "rgba(0, 0, 0, 0.3)",
  });
  Interface.createDialogue("system");
  Interface.setSize(width, height);
  window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    Canvas.setSize(width, height);
    Interface.setSize(width, height);
  });
  const FL = new FileLoader();

  const seed = 100000;
  const TestGen = new RandomGenerator(seed);

  const GameMap = new Map();
  GameMap.generateMap(10);
  //Main cycle
  const ctx = Canvas.ctx;
  const ms = 300;
  ctx.fillStyle = "red";
  const tileNamesSet = new Set();
  tileNamesSet.add("earthground");
  tileNamesSet.add("stonewall");
  tileNamesSet.add("brickwall");
  await FL.loadTiles(["assets", "tiles", "level"], tileNamesSet);
  console.log(GameMap._map);
  const mapTiles = {
    wall: FL.getTile("brickwall"),
    ground: FL.getTile("earthground")
  }
  setInterval(() => {
    //Canvas.refresh();
    Canvas.drawMap(GameMap, mapTiles);
    //ctx.drawImage(tile, 0, 0, 32, 32);
    //console.log("x", x);
    //console.log(TestGen.generate(100));
  }, ms);
};

export default startGame;
