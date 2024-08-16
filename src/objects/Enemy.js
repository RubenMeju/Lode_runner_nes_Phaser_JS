export class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(this.scene.escalado);
    this.body.setSize(12, 14);
    this.setCollideWorldBounds(true);

    this.velocidad = 100; // Velocidad inicial
    this.alive = true;
    this.isClimbing = false;
    this.direction = Phaser.Math.Between(0, 1) === 0 ? -1 : 1; // Dirección inicial aleatoria
  }

  update(cursors, spaceBar) {
    if (!this.alive) {
      this.stopMovement();
      return;
    }

    this.movement();
  }

  movement() {
    if (this.body.blocked.left || this.body.blocked.right) {
      // Cambiar dirección si choca con un obstáculo
      this.direction *= -1;
    }

    // Seguir al jugador si está en la misma fila
    if (Math.abs(this.y - this.scene.jugador.y) < 10) {
      if (this.x < this.scene.jugador.x) {
        this.direction = 1; // Moverse hacia la derecha
      } else if (this.x > this.scene.jugador.x) {
        this.direction = -1; // Moverse hacia la izquierda
      }
    }

    this.setVelocityX(this.direction * this.velocidad);

    if (this.direction < 0) {
      this.flipX = false; // Voltear sprite a la izquierda
    } else {
      this.flipX = true; // Voltear sprite a la derecha
    }

    this.anims.play("walkEnemy", true); // Reproducir animación de caminar
  }

  stopMovement() {
    this.setVelocity(0, 0);
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
