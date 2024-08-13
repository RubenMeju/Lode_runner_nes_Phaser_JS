export class Escalera {
  constructor(scene, layer) {
    this.scene = scene;
    this.layer = layer;
    this.init();
  }

  init() {
    this.layer.getTilesWithin(
      0,
      0,
      this.scene.mapa.widthInPixels,
      this.scene.mapa.heightInPixels,
      (tile) => {
        if (tile.properties.escalable) {
          tile.setCollision(true);
        }
      }
    );

    this.scene.physics.add.overlap(
      this.scene.jugador,
      this.layer,
      (player, tile) => {
        if (tile && tile.properties.escalable) {
          this.manejarEscalera(player, tile);
        }
      },
      null,
      this
    );
  }

  manejarEscalera(player) {
    console.log("¡Colisión con escalera!");
    player.canClimb = true; // Permitir que el jugador escale
    player.body.allowGravity = false; // Desactivar la gravedad mientras escala
  }
}
