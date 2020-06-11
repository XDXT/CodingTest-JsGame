class BGBlock extends GameImage {
  // blockInfo = [x, y, Material, canRun]
  constructor(game, blockInfo) {
    super(game, blockInfo[2]);
    this.x = blockInfo[0];
    this.y = blockInfo[1];
    this.canRun = blockInfo[3];
  }

  moveX(num) {
    this.x += num
  }

  moveY(num) {
    this.y += num
  }

  moveRange() {}
  update() {}
}
