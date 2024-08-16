import { createAnimations } from "../animations.js";
import { Bloque } from "../objects/Bloque.js";
import { Player } from "../objects/Player.js";
import { Oro } from "../objects/Oro.js";
import { Escalera } from "../objects/Escalera.js";

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

    this.load.spritesheet("player", "assets/sprites_player1.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
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

    // Crear las capas
    this.escalerasLayer = this.mapa.createLayer("escalerass", tileset, 0, 0);
    this.escalerasLayer.setScale(this.escalado);
    this.oroLayer = this.mapa.createLayer("oroo", tileset, 0, 0);
    this.oroLayer.setScale(this.escalado);

    // Crear el jugador
    this.jugador = new Player(this, 548, 348, "player", 0);
    this.physics.add.collider(this.jugador, this.bloques.solidos);

    // Instanciar Oro y Escalera
    this.oro = new Oro(this, this.oroLayer);
    this.escalera = new Escalera(this, this.escalerasLayer);

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
