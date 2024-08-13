export class Oro {
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
        if (tile.properties.recolectar) {
          tile.setCollision(true);
        }
      }
    );

    this.scene.physics.add.overlap(
      this.scene.jugador,
      this.layer,
      (player, tile) => {
        if (tile && tile.properties.recolectar) {
          this.manejarOro(player, tile);
        }
      },
      null,
      this
    );
  }

  manejarOro(player, tile) {
    console.log("¡Colisión con oro!");
    // Añadir lógica para manejar la colisión con el oro
  }
}
