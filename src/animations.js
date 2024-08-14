export function createAnimations(scene) {
  scene.anims.create({
    key: "walk",
    frames: scene.anims.generateFrameNumbers("player", { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: "escalera_up_down",
    frames: scene.anims.generateFrameNumbers("player", {
      start: 12,
      end: 15,
    }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: "varita",
    frames: scene.anims.generateFrameNumbers("player", {
      start: 24,
      end: 26,
    }),
    frameRate: 3,
    repeat: -1,
  });

  scene.anims.create({
    key: "death",
    frames: scene.anims.generateFrameNumbers("player", {
      start: 28,
      end: 34,
    }),
    frameRate: 7,
    repeat: -1,
  });
  // Destrucción de un bloque
  scene.anims.create({
    key: "destruction",
    frames: scene.anims.generateFrameNumbers("tiles", {
      frames: [11, 12, 22, 23, 33, 34, 44, 45, 10],
    }),
    frameRate: 18,
    repeat: 0,
  });

  // Restaurar un bloque
  scene.anims.create({
    key: "reverseDestruction",
    frames: scene.anims
      .generateFrameNumbers("tiles", {
        frames: [11, 12, 22, 23, 33, 34, 44, 45, 10],
      })
      .reverse(),
    frameRate: 18,
    repeat: 0,
  });
}
