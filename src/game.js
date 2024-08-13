import { GameScene } from "./scenes/GameScene.js";

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [GameScene],
  physics: {
    default: "arcade",
    arcade: { debug: true, gravity: { y: 300 } },
  },
};

const game = new Phaser.Game(config);
