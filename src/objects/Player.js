export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Escalar el sprite
    this.setScale(this.scene.escalado);

    // Ajustar el tamaño del collider
    this.body.setSize(12, 14);

    // El jugador no puede salir del mundo
    this.setCollideWorldBounds(true);

    //velocidad del jugador
    this.velocidad = 100;
    // Estado de muerte
    this.alive = true;
    this.canClimb = false; // Añadir esta propiedad
  }

  update(cursors, spaceBar) {
    if (!this.alive) {
      this.setVelocity(0, 0); // Detener el movimiento si está muerto
      return;
    }

    //Detectar si la tecla espacio ha sido pulsada
    if (Phaser.Input.Keyboard.JustDown(spaceBar)) {
      console.log("¡La tecla de espacio ha sido pulsada!", this.x);
      this.anims.play("varita", true);

      const tileSize = 48; // Tamaño real del tile en píxeles

      // Coordenadas del jugador en términos de celdas
      let tileX = Math.floor(this.x / tileSize);
      let tileY = Math.floor(this.y / tileSize);

      console.log("player: ", this.flipX);
      tileY++;
      if (this.flipX) {
        tileX++;
      } else {
        tileX--;
      }
      console.log("tile: ", tileX);
      // Verificar si el bloque en esa posición es destructible
      if (this.scene.bloques.isDestruible(tileX, tileY)) {
        this.scene.bloques.removeTileAt(tileX, tileY); // Remover el bloque
      }
    }

    // Detectar si las teclas de dirección están siendo presionadas
    if (cursors.left.isDown) {
      this.setVelocityX(-this.velocidad); // Mover a la izquierda con velocidad
      this.flipX = false; // Invertir el sprite hacia la izquierda
      this.anims.play("walk", true); // Reproducir animación hacia la izquierda
    } else if (cursors.right.isDown) {
      this.setVelocityX(this.velocidad); // Mover a la derecha con velocidad
      this.flipX = true; // Invertir el sprite hacia la derecha
      this.anims.play("walk", true); // Reproducir animación hacia la derecha
    } else {
      this.setVelocityX(0); // Detener movimiento horizontal si no se presiona ninguna tecla
      this.anims.stop();
    }

    // Movimiento vertical para escalar
    if (this.canClimb && cursors.up.isDown) {
      this.setVelocityY(-this.velocidad); // Subir la escalera
      this.anims.play("up", true);
    } else if (this.canClimb && cursors.down.isDown) {
      this.setVelocityY(this.velocidad); // Bajar la escalera
      this.anims.play("down", true);
    } else if (this.canClimb) {
      this.setVelocityY(0); // Detener el movimiento vertical si está escalando
    } else {
      this.body.allowGravity = true; // Asegurarse de que la gravedad actúe si no está escalando
    }

    // Reseteo del estado de escalada al final del frame
    this.canClimb = false;
  }

  die() {
    if (this.alive) {
      this.alive = false;
      this.anims.play("death"); // Reproducir la animación de muerte
      this.body.setVelocity(0, 0); // Detener el movimiento

      this.scene.time.delayedCall(1000, () => {
        this.setVisible(false); // Opcional: ocultar el jugador después de morir
      });
    }
  }
}
