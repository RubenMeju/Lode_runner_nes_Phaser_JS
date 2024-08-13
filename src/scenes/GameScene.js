import { createAnimations } from "../animations.js";
import { Bloque } from "../objects/Bloque.js";
import { Player } from "../objects/Player.js";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });

    this.escalado = 3;
    this.maxBombas = 3;
    this.maxEnemies = 3;
  }

  preload() {
    this.load.spritesheet("tiles", "assets/tileSets.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.tilemapTiledJSON("mapa", "/assets/mapa.json");
    this.load.image("tileSets", "assets/tileSets.png");

    this.load.spritesheet("player", "assets/sprites_player.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  manejarOro(player, tile) {
    console.log("¡Colisión con oro!");
  }

  manejarEscalera(player, tile) {
    console.log("¡Colisión con escalera!");
  }

  create() {
    createAnimations(this);

    this.cameras.main.setBackgroundColor("#000000");

    // Crear el mapa
    this.mapa = this.make.tilemap({ key: "mapa" });

    // Instanciar la clase Bloque
    this.bloques = new Bloque(this, this.mapa, "tileSets", "solidos", {
      bloques: true,
    });

    const tileset = this.mapa.addTilesetImage("tileSets");

    //escaleras
    this.escaleras = this.mapa.createLayer("escalerass", tileset, 0, 0);
    this.escaleras.setScale(this.escalado);

    // oro
    this.oro = this.mapa.createLayer("oroo", tileset, 0, 0);
    this.oro.setScale(this.escalado);

    // Crear el jugador
    this.jugador = new Player(this, 548, 148, "player", 0);
    this.physics.add.collider(this.jugador, this.bloques.solidos);

    // Agregar un overlap para manejar la interacción del jugador con el oro
    this.physics.add.overlap(
      this.jugador,
      this.oro,
      (player, tile) => {
        if (tile && tile.properties.recolectar) {
          this.manejarOro(player, tile);
        }
      },
      null,
      this
    );

    // Agregar un overlap para manejar la interacción del jugador con las escaleras
    this.physics.add.overlap(
      this.jugador,
      this.escaleras,
      (player, tile) => {
        if (tile && tile.properties.escalable) {
          this.manejarEscalera(player, tile);
        }
      },
      null,
      this
    );

    // Configurar los controles
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  update() {
    this.jugador.update(this.cursors, this.spaceBar);
  }
}
