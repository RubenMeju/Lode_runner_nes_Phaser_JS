export function handleHorizontalMovement(player, cursors) {
  // Evitar movimiento horizontal si el jugador está en el aire (cayendo) y no está escalando
  if (!player.body.blocked.down && !player.isClimbing) {
    return; // Salir de la función si está cayendo
  }

  if (cursors.left.isDown) {
    player.setVelocityX(-player.velocidad);
    player.flipX = false;
    player.anims.play("walk", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(player.velocidad);
    player.flipX = true;
    player.anims.play("walk", true);
  } else {
    player.setVelocityX(0);
  }
}

export function handleVerticalMovement(player, cursors) {
  if (player.isClimbing) {
    if (cursors.up.isDown) {
      climb(player, -player.velocidad);
    } else if (cursors.down.isDown) {
      climb(player, player.velocidad);
    } else {
      player.setVelocityY(0);
      player.anims.pause();
    }

    // Verificar si el jugador ha llegado a la parte superior de la escalera
    if (player.body.blocked.up || player.body.blocked.down) {
      player.isClimbing = false; // Deja de escalar si está en la parte superior
      player.body.allowGravity = true; // Reactivar la gravedad
    }
  } else {
    player.body.allowGravity = true;

    // Verificar si el jugador no está tocando el suelo y no está escalando
    if (!player.body.blocked.down && !player.isClimbing) {
      console.log("El jugador no está colisionando.");
      player.setVelocity(0, player.velocidad);
      player.anims.play("caer", true);
    } else if (player.body.blocked.down) {
      console.log(
        "El jugador está colisionando con bloques en la parte inferior."
      );
    }

    if (player.body.velocity.x === 0 && player.body.velocity.y === 0) {
      player.anims.stop();
    }
  }
}

function climb(player, velocity) {
  player.setVelocityY(velocity);
  player.body.allowGravity = false;

  if (player.anims.currentAnim?.key !== "escalera_up_down") {
    player.anims.play("escalera_up_down", true);
  } else {
    player.anims.resume();
  }
}
