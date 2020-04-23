import InterfaceBuilder from "./InterfaceBuilder";
import GameCanvas from "./GameCanvas";

const startGame = (body, width, height) => {
  const Canvas = new GameCanvas(body, width, height);
  window.addEventListener("resize", () => Canvas.toScreenSize());
  const ctx = Canvas.ctx;
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "black";
  ctx.fillRect(30, 100, 60, 200);
};

export default startGame;
