export function createAnimations(scene) {
  const animationsConfig = {
    walk: {
      texture: "player",
      frames: { start: 0, end: 2 },
      frameRate: 10,
      repeat: -1,
    },
    escalera_up_down: {
      texture: "player",
      frames: { start: 12, end: 15 },
      frameRate: 10,
      repeat: -1,
    },
    caer: {
      texture: "player",
      frames: { start: 4, end: 7 },
      frameRate: 10,
      repeat: -1,
    },
    varita: {
      texture: "player",
      frames: { start: 24, end: 26 },
      frameRate: 3,
      repeat: -1,
    },
    death: {
      texture: "player",
      frames: { start: 28, end: 34 },
      frameRate: 7,
      repeat: -1,
    },
    destruction: {
      texture: "tiles",
      frames: { frames: [11, 12, 22, 23, 33, 34, 44, 45, 10] },
      frameRate: 18,
      repeat: 0,
    },
    reverseDestruction: {
      texture: "tiles",
      frames: { frames: [11, 12, 22, 23, 33, 34, 44, 45, 10].reverse() },
      frameRate: 18,
      repeat: 0,
    },

    //enemigos
    walkEnemy: {
      texture: "player",
      frames: { start: 36, end: 38 },
      frameRate: 10,
      repeat: -1,
    },
    escalera_up_down_enemy: {
      texture: "player",
      frames: { start: 12, end: 15 },
      frameRate: 10,
      repeat: -1,
    },
    caerEnemy: {
      texture: "player",
      frames: { start: 4, end: 7 },
      frameRate: 10,
      repeat: -1,
    },
  };

  Object.entries(animationsConfig).forEach(([key, config]) => {
    scene.anims.create({
      key,
      frames: scene.anims.generateFrameNumbers(config.texture, config.frames),
      frameRate: config.frameRate,
      repeat: config.repeat,
    });
  });
}
