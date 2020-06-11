class GameScene {
  constructor(game) {
      this.game = game;
      this.debugModEnable = true;
      this.elements = [];
  }

  static new(game) {
      var i = new this(game);
      return i;
  }

  addElement(img) {
    img.scene = this;
    this.elements.push(img);
  }

  addListElement(imgs) {
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].scene = this;
      this.elements.push(imgs[i]);
    }
  }

  clearElement() {
    this.elements = [];
  }

  draw() {
    for (var e of this.elements) {
      e.draw();
    }
  }

  update() {
    if (this.debugModEnable) {
      for (var e of this.elements) {
        e.debug && e.debug();
      }
    }

    for (var i = 0; i < this.elements.length; i++) {
      var e = this.elements[i];
      e.update();
    }
  }
}
