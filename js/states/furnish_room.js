var FurnishRoom = function() {};
FurnishRoom.prototype = {
  clickEnabled: false, 

  init: function() {

  },
  start_game: function() {

  },
  preload: function() {
    if (localStorage.getItem("fullyBuilt")) {
      var bg = this.game.load.image("bg", "img/homeBG.png");
      this.game.load.audio("snd", "snd/Level2.wav");
    } else {
      this.game.load.image("bg", "img/homeBGBroked.png");
      this.game.load.audio("snd","snd/wind.wav");
    }
    this.game.load.image("boxman", "img/ManWithABox.png");
    this.game.load.audio("count1", "snd/countofone.wav");
    this.game.load.audio("count2", "snd/countoftwo.wav");
    this.game.load.audio("count3", "snd/onthecountofthree.wav");
  },
  create: function() {
    var bg = this.game.add.sprite(0,0,"bg");
    
    bg.animations.add("wiggle").play(10, true);
    this.boxman = this.game.add.sprite(450, 200, "boxman");
    this.c1 = this.game.add.audio("count1");
    this.c2 = this.game.add.audio("count2");
    this.c3 = this.game.add.audio("count3");
    this.c1.onStop.add(this.enable, this);
    this.c2.onStop.add(this.enable,this);
    this.c3.onStop.add(this.enable,this);
    this.game.add.audio("snd").play();
    this.levels = [3, 3, 2, 3, 1, 2, 1, 1];
    this.game.input.onTap.add(this.processClick, this);
    this.loadLevel();
  },

  processClick: function() {
    if (this.clickEnabled) {
      console.log("OKAY!");
      this.clickEnabled = false;
      this.game.add.tween(this.boxman)
      .to({x:"-50"}, 300)
      .start();
    }
  },

  enable: function() {
    this.clickEnabled = true;
    this.game.time.events.add(500, this.disable, this);
  },

  disable: function() {
    this.clickEnabled = false;
    this.loadLevel();
  },

  loadLevel: function() {
    var l = this.levels.splice(0,1)[0];
    if (!l) { this.game.state.start("Exit") }
    switch (l) {
      case 1:
        this.c1.play();
        break;
      case 2:
        this.c2.play();
        break;
      case 3:
        this.c3.play();
        break;
      default:
        console.log("The fuck is a ", l);
    }
  },

  update: function() {
  
  },
};
