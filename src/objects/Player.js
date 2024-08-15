import {
  handleHorizontalMovement,
  handleVerticalMovement,
} from "../controls.js";

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(this.scene.escalado);
    this.body.setSize(12, 14);
    this.setCollideWorldBounds(true);

    this.velocidad = 100;
    this.alive = true;
    this.isClimbing = false;
  }

  update(cursors, spaceBar) {
    //si el jugador esta muerto
    if (!this.alive) {
      this.stopMovement();
      return;
    }

    this.handleSpaceBar(spaceBar);
    handleVerticalMovement(this, cursors);
    handleHorizontalMovement(this, cursors);

    // Reseteo del estado de escalada al final del frame
    this.isClimbing = false;
  }

  stopMovement() {
    this.setVelocity(0, 0);
  }

  handleSpaceBar(spaceBar) {
    if (Phaser.Input.Keyboard.JustDown(spaceBar)) {
      this.anims.play("varita", true);
      const tileSize = 48;
      let tileX = Math.floor(this.x / tileSize);
      let tileY = Math.floor(this.y / tileSize);

      tileY++;
      tileX += this.flipX ? 1 : -1;

      if (this.scene.bloques.isDestruible(tileX, tileY)) {
        this.scene.bloques.removeTileAt(tileX, tileY);
      }
    }
  }

  die() {
    if (this.alive) {
      this.alive = false;
      this.anims.play("death");
      this.body.setVelocity(0, 0);

      this.scene.time.delayedCall(1000, () => {
        this.setVisible(false);
      });
    }
  }
}
