var BuildRoom = function() {};
BuildRoom.prototype = {
  // Are we accepting clicks?
  clickIsActive: false,

  init: function() {
    console.log("Building a room!");
  },
  start_game: function() {
    this.music.play();
  },
  preload: function() {
    this.game.load.image("test", "img/test.png");
    this.game.load.audio("blip", "snd/Blip.wav");
    this.game.load.audio("metronome", "snd/Metronome.wav");
    this.game.load.spritesheet("hammer", "img/Hammer.png", 200, 200);
    this.game.load.image("wood", "img/wood.png");
    this.game.load.image("nail", "img/nail.png");
    this.game.load.audio("music", "snd/Level1.wav");
  },
  create: function() {
    this.music = this.game.add.audio("music"); 
    this.game.time.events.add(428*4, this.loadLevel, this);
    this.start_game();
    this.wood = this.game.add.group();
  },
  

  loadLevel: function() {
    this.wood.removeAll();
    this.wood.x = 0;
    this.currentLevel = levelConfig.levelConfig.splice(0, 1)[0];
    this.wood.create(-400, 400, "wood");
    for (var i in this.currentLevel) {
      if (this.currentLevel[i]) {
        this.wood.create(-(i*100)-30, 320, "nail");
      }
    } 
    // Wait for the demo to play, the move
    t= this.game.add.tween(this.wood).to({x:"+400"}, 428*4*2, "Linear",true, 
                                      428*4*2)
    t.onComplete.add(this.woodFlyAway,this)
    t.onComplete.add(this.woodFinish, this);
    t.start();
  },

  woodFlyAway: function() {
    this.game.add.tween(this.wood).to({x:"+800"}, 400).start();
  },

  woodFinish: function() {
    console.log("OK");
    this.loadLevel();
  },
  update: function() {
  },

  processClick: function() {

  },
};
