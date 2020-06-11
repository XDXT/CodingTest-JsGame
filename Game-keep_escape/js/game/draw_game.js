class DrawGame {
  constructor(fps, images, runCallback) {
      window.fps = fps;
      this.images = images;
      this.runCallback = runCallback;
      this.scene = null;
      this.actions = {};
      this.keyAction = [];
      this.keydowns = {};
      this.canvas = qs('#id-canvas');
      this.context = this.canvas.getContext('2d');
      var self = this;
      window.addEventListener('keydown', event => {
          self.keydowns[event.key] = 'down';
      })
      window.addEventListener('keyup', function(event){
          for (var keyArray of self.keyAction) {
            if(arrayHas(keyArray, event.key)) {
              setAttrList(self.keydowns, keyArray, 'up');
            }
          }
      })
      this.init();
  }

  static instance(...args) {
      this.i = this.i || new this(...args);
      return this.i;
  }

  drawImage(img) {
      this.context.drawImage(img.texture, img.x, img.y);
  }

  update() {
      this.scene.update();
  }

  draw() {
      this.scene.draw();
  }

  registerAction(keyList, callback) {
    this.keyAction.push(keyList);
    for (var i = 0; i < keyList.length; i++) {
      this.actions[keyList[i]] = callback;
    }
  }

  runloop() {
      var g = this;
      var actions = Object.keys(g.actions);
      for (var i = 0; i < actions.length; i++) {
          var key = actions[i];
          var status = g.keydowns[key];
          if(status == 'down') {
              //('down') => callback('down')
              g.actions[key]('down');
          } else if(status == 'up') {
              g.actions[key]('up');
              g.keydowns[key] = null;
          }
      }
      g.update();
      g.context.clearRect(0, 0, g.canvas.width, g.canvas.height);
      g.draw();

      setTimeout(function(){
          g.runloop();
      }, 1000/window.fps)
  }

  runWithScene(scene) {
      var g = this;
      this.scene = scene;
      g.runloop();
  }

  replaceScene(scene) {
      this.scene = scene;
  }

  textureByName(name) {
      var g = this;
      var img = g.images[name];
      return img;
  }

  __start() {
      this.runCallback(this);
  }

  init() {
    var g = this;
    var loads = [];
    var names = Object.keys(g.images);
    for (var i = 0; i < names.length; i++) {
        let name = names[i];
        var path = g.images[name];
        let img = new Image();
        img.src = path;
        img.onload = function() {
            // 存入 g.images 中
            g.images[name] = img;
            loads.push(1);
            if (loads.length == names.length) {
                log('load images', g.images);
                g.__start();
            }
        }
    }
  }
}
