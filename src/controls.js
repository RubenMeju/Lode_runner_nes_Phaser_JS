// controls.js
export function handleHorizontalMovement(player, cursors) {
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
    if (!player.canClimb) {
      player.anims.stop();
    }
  }
}

export function handleVerticalMovement(player, cursors) {
  if (player.canClimb) {
    if (cursors.up.isDown) {
      climb(player, -player.velocidad);
    } else if (cursors.down.isDown) {
      climb(player, player.velocidad);
    } else {
      player.setVelocityY(0);
      player.anims.pause();
    }
  } else {
    player.body.allowGravity = true;
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
