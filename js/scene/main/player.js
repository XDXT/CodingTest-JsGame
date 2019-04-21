class Player extends GameAnimation {
  constructor(game, standNum, XNum, YNum) {
    super(game, 'idle', standNum)
    this.game = game;
    this.standNum = standNum;
    this.XNum = XNum;
    this.YNum = YNum;
    this.init()
  }

  init() {
    this.actionStatus = 'walk';
    this.moveStatus = 'walkright';
    this.speed = config.player.walkSpeed;
    //add action img
    this.addAnimationImg('walkleft', this.XNum);
    this.addAnimationImg('walkright', this.XNum);
    this.addAnimationImg('walkup', this.YNum);
    this.addAnimationImg('walkdown', this.YNum);
  }

  static new(game, standNum, XNum, YNum) {
      return new this(game, standNum, XNum, YNum);
  }

  setPlayerJugeXY(tplayer, direction) {
    if(isStringInclude(direction, 'left')) {
      tplayer.w /= 2;
    } else if (isStringInclude(direction, 'right')) {
      tplayer.w /= 2;
      tplayer.x += tplayer.w;
    }
    tplayer.y = tplayer.y + tplayer.h / 3 * 2;
    tplayer.h = tplayer.h / 2;
    return tplayer;
  }

  canIMove(bgStopBlocks, direction, num) {
    let tplayer =  Object.assign({}, this);
    tplayer = this.setPlayerJugeXY(tplayer, direction);
    if(direction == 'left'  || direction == 'right') {
      tplayer.x += num;
    } else {
      tplayer.y += num;
    }
    for (var b of bgStopBlocks) {
      if(rectIntersects(tplayer, b) || rectIntersects(b, tplayer)) {
        return false;
      }
    }
    return true;
  }

  setStandAnimation() {
    if(isStringInclude(this.moveStatus, "right")) {
      this.replaceAnimation('stand1', 0, this.standNum/2);
    } else if (isStringInclude(this.moveStatus, "left")) {
      this.replaceAnimation('stand2', this.standNum/2, this.standNum);
    } else {
      this.replaceAnimation(this.moveStatus, 0, 1);
    }
  }

  moveRange() {
    // x range
    if(this.x < 0) {
      this.x = 0;
    } else if(this.x > 540) {
      this.x = 540;
    }
    //y range
    if (this.y < 0) {
        this.y = 0;
    } else if(this.y > 555) {
      this.y = 555;
    }
  }

  move(num, direction, keyStatus) {
    if(keyStatus == 'up') {
      this.setStandAnimation();
    } else {
      this.moveStatus = this.actionStatus + direction;
      if (direction == 'left'  || direction == 'right') {
        this.replaceAnimation(this.moveStatus, 0, this.XNum);
        this.x += num;
      } else {
        this.replaceAnimation(this.moveStatus, 0, this.YNum);
        this.y += num;
      }
      this.moveRange();
    }
  }

  toRun(keyStatus) {
    if(keyStatus == 'up') {
      this.actionStatus = 'walk';
      this.speed = config.player.walkSpeed;
    } else {
      this.speed = config.player.runSpeed;
    }
  }
}
