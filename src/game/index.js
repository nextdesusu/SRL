import InterfaceBuilder from "./InterfaceBuilder";
import GameCanvas from "./GameCanvas";

const startGame = (body, width, height) => {

  const Canvas = new GameCanvas(body, width, height);
  const Interface = new InterfaceBuilder(body, {
    system: "rgba(0, 0, 0, 0.3)",
  });
  Interface.createDialogue("system");
  Interface.setSize(width, height);

  window.addEventListener("resize", () => {
    //console.log(window.innerWidth);
    //const { width, height } = window.screen;
    const width = window.innerWidth;
    const height = window.innerHeight;
    Canvas.setSize(width, height);
    Interface.setSize(width, height);
  });

  //Main cycle
  const ctx = Canvas.ctx;
  let x = 0,
    y = 0;
  const rheight = 80,
    rwidth = 80;
  const ms = 30;
  ctx.fillStyle = "red";
  setInterval(() => {
    Canvas.refresh();
    ctx.fillRect(x, 0, rwidth, rheight);
    x += 1;
    y += 1;
    //console.log("x", x);
  }, ms);
};

export default startGame;
