import Phaser from "phaser"

class MainScene extends Phaser.Scene {
  state = {
    thrownMask: false
  }

  preload() {
    this.load.spritesheet("player", "assets/player.png", {
      frameWidth: 16,
      frameHeight: 32
    });
    // this.load.image("mask", "assets/mask.png");
  }

  create() {
    this.player = this.physics.add.sprite(500, 500, "player")
    this.player.setCollideWorldBounds(true)

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player", { start: 6, end: 11 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 12, end: 17 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", { start: 18, end: 23 }),
      frameRate: 10,
      repeat: -1
    })

    this.mask = this.physics.add.sprite(500, 500, "mask")
    this.speed = Phaser.Math.GetSpeed(600, 3)
    this.mask.setCollideWorldBounds(true)
  }

  update(time, delta) {
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      maskOn: Phaser.Input.Keyboard.KeyCodes.ENTER
    })

    // if(this.cursors.maskOn.isDown) {
    //   this.physics.moveTo(this.mask, 500, 100, 60)
    //   // this.mask.x += this.speed * delta
    //   // if (this.mask.x > 864) {
    //   //   this.mask.x = 64
    //   // }
    // }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160)
      this.player.anims.play("left", true)
      if (this.cursors.maskOn.isDown) {
        this.physics.moveTo(this.mask, 500, 100, 180)
      }
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160)
      this.player.anims.play("right", true)
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160)
      this.player.anims.play("up", true)
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160)
      this.player.anims.play("down", true)
    } else if (this.cursors.space.isDown) {
      this.player.setVelocity(0)
    }
  }
}

export const config = {
  width: "100%",
  height: "97%",
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: MainScene
}
