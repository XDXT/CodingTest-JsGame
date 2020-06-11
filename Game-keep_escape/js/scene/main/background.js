class Background {
  constructor(game, bgLevel) {
    this.game = game;
    this.level = bgLevel;
    this.setup();
  }

  static new(game, bgLevel) {
      return new this(game, bgLevel);
  }

  setup() {
    this.bgCountX = 0;
    this.bgStopBlocks = [];
    this.bgAllBlocks = [];
    this.farBlocks = [0, 0, 0, 0]
    this.sceneStartX = 9999;
    this.sceneEndX = -9999;
    this.sceneStartY = 9999;
    this.sceneEndY = -9999;
    this.createBg()
  }

  analysisLevelInfo(leveInfo, coutY) {
    var info = [];
    info.push(this.bgCountX*50);
    info.push(coutY*50);
    let material = materialTable[leveInfo][0];
    let canIRun = (materialTable[leveInfo][1] != 0);
    info.push(material);
    info.push(canIRun);
    return info;
  }

  initSceneXY(block) {
    if(this.sceneStartX > block.x) {
      this.sceneStartX = block.x;
      this.farBlocks[0] = block;
    }
    if(this.sceneEndX < block.x) {
      this.sceneEndX = block.x;
      this.farBlocks[1] = block;
    }
    if(this.sceneStartY > block.y) {
      this.sceneStartY = block.y;
      this.farBlocks[2] = block;
    }
    if(this.sceneEndY < block.y) {
      this.sceneEndY = block.y;
      this.farBlocks[3] = block;
    }
  }

  createBgBlock(leveInfo, coutY) {
    for (var i = 0; i < leveInfo[1]; i++) {
      let blockInfo = this.analysisLevelInfo(leveInfo[0], coutY);
      let tempBlock = BGBlock.new(this.game, blockInfo);
      this.initSceneXY(tempBlock);
      if(!tempBlock.canRun) {
        this.bgStopBlocks.push(tempBlock);
      }
      this.bgAllBlocks.push(tempBlock);
      this.bgCountX++;
    }
  }

  createBg() {
    for (var i = 0; i < this.level.length; i++) {
      for (var j = 0; j < this.level[i].length; j++) {
        this.createBgBlock(this.level[i][j], i);
      }
      this.bgCountX = 0;
    }
  }

  canIMove(direction, player) {
    if(isStringInclude(direction, 'up')) {
      return (this.farBlocks[2].y < 0 && player.y < 80);
    } else if (isStringInclude(direction, 'down')) {
      return (this.farBlocks[3].y > 600 && player.y > 400);
    } else if(isStringInclude(direction, 'left')) {
      return (this.farBlocks[0].x < 0 && player.x < 130);
    } else if(isStringInclude(direction, 'right')) {
      return (this.farBlocks[1].x > 600 && player.x > 400);
    }
  }

  move(direction, num) {
    for (var b of this.bgAllBlocks) {
      if(isStringInclude(direction, 'up')  || isStringInclude(direction, 'down')) {
        b.moveY(num);
      } else {
        b.moveX(num);
      }
    }
  }
}
