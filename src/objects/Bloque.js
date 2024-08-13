export class Bloque {
  constructor(scene, mapa, tilesetKey, layerName, collisionProperty) {
    this.scene = scene;
    this.mapa = mapa;

    // Cargar el tileset y crear la capa
    const tileset = this.mapa.addTilesetImage(tilesetKey);
    this.solidos = this.mapa.createLayer(layerName, tileset, 0, 0);
    this.solidos.setScale(this.scene.escalado);
    this.solidos.setCollisionByProperty(collisionProperty);
  }

  removeTileAt(x, y) {
    const tile = this.mapa.getTileAt(x, y, true, this.solidos.layer.name);

    if (tile && tile.properties.destruible) {
      // Obtener las coordenadas del tile en el mundo
      const worldX = tile.getCenterX();
      const worldY = tile.getCenterY();

      tile.setCollision(false); // Quitar colisiones al bloque
      tile.setVisible(false); // Ocultar el bloque
      const destructionSprite = this.scene.add.sprite(worldX, worldY, "tiles");
      destructionSprite.setScale(this.scene.escalado);
      destructionSprite.setDepth(this.scene.bloques.solidos.depth - 1);

      destructionSprite.play("destruction");

      // Cuando termine la animación de destrucción
      destructionSprite.on("animationcomplete", () => {
        // Esperar 3 segundos
        this.scene.time.delayedCall(3000, () => {
          // Comprobar si el sprite sigue activo antes de hacer cualquier cosa
          if (destructionSprite && destructionSprite.active) {
            destructionSprite.play("reverseDestruction");

            destructionSprite.on("animationcomplete", () => {
              // Comprobar si el sprite sigue activo antes de destruirlo
              if (destructionSprite && destructionSprite.active) {
                destructionSprite.destroy();

                // Restaurar el tile solo si el sprite se ha destruido correctamente
                tile.setCollision(true);
                tile.setVisible(true);
              }
            });
          }
        });
      });

      // Eliminar cualquier referencia al sprite después de destruirlo
      destructionSprite.on("destroy", () => {
        destructionSprite.off("animationcomplete");
      });
    }
  }

  // Método para verificar si un bloque en una posición es destruible
  isDestruible(x, y) {
    console.log("isDEStruible", x, y);
    const tile = this.mapa.getTileAt(x, y, true, this.solidos.layer.name);
    return tile?.properties.destruible || false;
  }
}
