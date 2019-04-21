class GameAnimation {
  constructor(game, nameIdle, animationNum) {
    this.game = game;
    this.anName = nameIdle;
    this.animationNumber = animationNum;
    this.setup();
  }

  update() {
    this.frameCount--;
    if(this.isMoveStatusChange()) {
      this.frameCount = config.animation_cooldown.value;
      this.frameIndex = this.startCout;
    } else if(this.frameCount == 0) {
      this.frameCount = config.animation_cooldown.value;
      let index = (this.frameIndex + 1) %  this.endCout;
      if(index <  this.startCout) {
        index += this.startCout;
      }
      this.frameIndex = index;
    }
    this.texture = this.frames()[this.frameIndex];
  }

  frames() {
    return this.animations[this.anName];
  }

  addAnimationImg(anName, animationNumber) {
    this.animations[anName] = [];
    for (var i = 1; i <= animationNumber; i++) {
      let name = anName + String(i);
      let img = this.game.textureByName(name);
      this.animations[anName].push(img);
    }
  }

  setup() {
    this.animations = {
      idle: [],
    };
    //add idle
    this.addAnimationImg(this.anName, this.animationNumber);
    this.texture = this.frames()[0];
    this.w = this.texture.width;
    this.h = this.texture.height;
    this.nowStatus = 'stand1';
    this.fStatus = this.nowStatus;
    this.startCout = 0;
    this.endCout = this.animationNumber/2;
    this.frameIndex = this.startCout;
    this.frameCount = config.animation_cooldown.value;
  }

  setAnimationNameByDirect(moveStatus) {
    if (isStringInclude(moveStatus, 'stand')) {
      this.anName = 'idle';
    } else {
      this.anName = moveStatus;
    }
  }

  replaceAnimation(moveStatus, startNum, endNum) {
    this.setAnimationNameByDirect(moveStatus);
    this.startCout = startNum;
    this.endCout = endNum;
    this.nowStatus = moveStatus;
  }

  isMoveStatusChange() {
    if(this.fStatus != this.nowStatus) {
      this.fStatus = this.nowStatus;
      return true;
    } else {
      return false;
    }
  }

  draw() {
    this.game.drawImage(this);
  }
}
