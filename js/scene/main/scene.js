class Scene extends GameScene{
  constructor(game) {
    super(game);
    this.setup();
    this.setupInputs();
  }

  static instance(...args) {
      this.i = this.i || new this(...args);
      return this.i;
  }

  setup() {
    var game = this.game;
    this.level = groundMap[0];
    this.loadScene();
  }

  addBg() {
    this.bg = Background.new(this.game, this.level);
    this.addListElement(this.bg.bgAllBlocks);
  }

  addPlayer(bornX, bornY) {
    this.player = Player.new(this.game, 32, 14, 14);
    this.player.x = bornX;
    this.player.y = bornY;
    this.addElement(this.player);
  }

  loadScene() {
    this.addBg();
    this.addPlayer(0, 0);
  }

  changeLevel(num) {
    this.level = groundMap[num-1];
    this.clearElement();
    this.loadScene();
  }

  playerMove(keyStatus, direction, num) {
      if(this.player.canIMove(this.bg.bgStopBlocks, direction, num) && this.bg.canIMove(direction, this.player)) {
        this.player.move(0, direction, keyStatus);
        this.bg.move(direction, num*(-1));
      } else if (this.player.canIMove(this.bg.bgStopBlocks, direction, num) && !this.bg.canIMove(direction, this.player)) {
        this.player.move(num, direction, keyStatus);
      } else {
        this.player.move(0, direction, keyStatus);
      }
  }

  setupInputs() {
    var g = this.game;
    var s = this;
    g.registerAction(['Shift'], function(keyStatus){
      s.player.toRun(keyStatus);
    });
    g.registerAction(['w', 'W', 'ArrowUp'], function(keyStatus){
      s.playerMove(keyStatus, "up", s.player.speed*(-1));
    });
    g.registerAction(['s', 'S', 'ArrowDown'], function(keyStatus){
      s.playerMove(keyStatus, "down", s.player.speed);
    });
    g.registerAction(['a', 'A', 'ArrowLeft'], function(keyStatus){
      s.playerMove(keyStatus, "left", s.player.speed*(-1));
    });
    g.registerAction(['d', 'D', 'ArrowRight'], function(keyStatus){
      s.playerMove(keyStatus, "right", s.player.speed);
    });
    g.registerAction(['k', 'K'], function(keyStatus){
      s.changeLevel(2);
    });
  }

  update() {
      super.update();
  }
}
