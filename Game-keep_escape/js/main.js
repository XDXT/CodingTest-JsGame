var enableDebugGame = enable => {
    if(!enable) {
        return;
    }
    window.paused = false;
    window.addEventListener('keydown', event => {
      if(event.key == 'p') {
        window.paused = !window.paused;
      }
    })
}

var __main = function() {
  //draw game on canvas
  var game = DrawGame.instance(60, gameImages, function(g){
    let s = Scene.new(g)
    g.runWithScene(s);
  })

  enableDebugGame(true);
}

__main();
