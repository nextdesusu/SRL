import InterfaceBuilder from "./InterfaceBuilder";
import GameCanvas from "./GameCanvas";

const startGame = (body, width, height) => {
  const Canvas = new GameCanvas(body, width, height);
  const ctx = Canvas.ctx;
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "black";
  ctx.fillRect(30, 100, 60, 200);

  const Interface = new InterfaceBuilder(body, { system: "rgba(0, 0, 0, 0.3)" });
  Interface.createDialogue("system");

  window.addEventListener("resize", () => {
    const { width, height } = window.screen;
    Canvas.toScreenSize(width, height);
    Interface.toScreenSize(width, height);
  });

  //Main cycle
  while(true){
    //Canvas.refresh();
    break;
  }
};

export default startGame;
