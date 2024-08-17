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

    //detectar si el jugador esta en una escalera
    this.scene.physics.add.overlap(
      this.scene.jugador,
      this.layer,
      (player, tile) => {
        if (tile && tile.properties.escalable) {
          this.colisionEscalera(player, tile);
        }
      },
      null,
      this
    );
  }

  colisionEscalera(entity) {
    if (entity === this.scene.jugador) {
      console.log("¡Colisión con escalera por el jugador!");
      entity.isClimbing = true; // Permitir que el jugador escale
    } else {
      console.log("¡Colisión con escalera por un enemigo!");
      entity.isClimbing = true; // Permitir que el enemigo escale
    }
  }
}
