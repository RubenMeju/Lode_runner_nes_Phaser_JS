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
    this.canClimb = false;
  }

  update(cursors, spaceBar) {
    if (!this.alive) {
      this.stopMovement();
      return;
    }

    this.handleSpaceBar(spaceBar);
    this.handleHorizontalMovement(cursors);
    this.handleVerticalMovement(cursors);

    // Reseteo del estado de escalada al final del frame
    this.canClimb = false;
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

  handleHorizontalMovement(cursors) {
    if (cursors.left.isDown) {
      this.setVelocityX(-this.velocidad);
      this.flipX = false;
      this.anims.play("walk", true);
    } else if (cursors.right.isDown) {
      this.setVelocityX(this.velocidad);
      this.flipX = true;
      this.anims.play("walk", true);
    } else {
      this.setVelocityX(0);
      if (!this.canClimb) {
        this.anims.stop();
      }
    }
  }

  handleVerticalMovement(cursors) {
    if (this.canClimb) {
      if (cursors.up.isDown) {
        this.climb(-this.velocidad);
      } else if (cursors.down.isDown) {
        this.climb(this.velocidad);
      } else {
        this.setVelocityY(0);
        this.anims.pause();
      }
    } else {
      this.body.allowGravity = true;
      if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
        this.anims.stop();
      }
    }
  }

  climb(velocity) {
    this.setVelocityY(velocity);
    this.body.allowGravity = false;

    if (this.anims.currentAnim?.key !== "escalera_up_down") {
      this.anims.play("escalera_up_down", true);
    } else {
      this.anims.resume();
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
