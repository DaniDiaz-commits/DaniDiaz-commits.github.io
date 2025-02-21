export function checkControls({ mario, keys }) {
  const isMarioTouchingFloor = mario.body.touching.down;

  const isLeftKeyDown = keys.left.isDown;
  const isRightKeyDown = keys.right.isDown;
  const isUpKeyKeyDown = keys.up.isDown;


  if (isLeftKeyDown) {
    isMarioTouchingFloor && mario.anims.play("mario-walk", true);
    mario.x -= 2;
    mario.flipX = true;
  } else if (isRightKeyDown) {
    isMarioTouchingFloor && mario.anims.play("mario-walk", true);
    mario.x += 2;
    mario.flipX = false;
  } else if (isMarioTouchingFloor) {
    // this.mario.anims.stop()
    // this.mario.setFrame(0)
    mario.anims.play("mario-idle", true);
  }

  if (isUpKeyKeyDown && isMarioTouchingFloor) {
    mario.setVelocityY(-300);
    mario.anims.play("mario-jump", true);
  }
}
