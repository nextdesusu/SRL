import InterfaceBuilder from "./InterfaceBuilder";
import GameCanvas from "./GameCanvas";
import FileLoader from "./FileLoader";

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

  //Main cycle
  const ctx = Canvas.ctx;
  const ms = 30;
  ctx.fillStyle = "red";
  const tileNamesSet = new Set();
  tileNamesSet.add("earthground");
  tileNamesSet.add("stonewall");
  tileNamesSet.add("brickwall");
  await FL.loadTiles(["assets", "tiles", "level"], tileNamesSet);
  const tile = FL.getTile("brickwall");
  setInterval(() => {
    //Canvas.refresh();
    ctx.drawImage(tile, 0, 0, 32, 32);
    //console.log("x", x);
  }, ms);
};

export default startGame;
