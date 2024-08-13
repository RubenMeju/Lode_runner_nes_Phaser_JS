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

  manejarEscalera(player, tile) {
    console.log("¡Colisión con escalera!");
    // Añadir lógica para manejar la colisión con la escalera
  }
}
