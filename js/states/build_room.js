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
    this.game.load.spritesheet("bg", "img/HouseBuilding.png", 640, 480);
  },
  create: function() {
    this.house = this.game.add.sprite(0,0,"bg");
    this.house.animations.add("build");
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.music = this.game.add.audio("music"); 
    this.music.onPlay.add(this.loadLevel, this);
    this.hammer = this.game.add.sprite(100, 300, "hammer");
    this.hammer.animations.add("hit");
    this.game.physics.p2.enable(this.hammer);
    this.hammer.body.onBeginContact.add(this.hammerHit, this);
    this.hammer.body.collideWorldBounds = false;
    this.game.input.onDown.add(this.hit, this);
    this.start_game();
    this.wood = this.game.add.group();
    this.hitCount = 0;
  },

  hammerHit: function(body, bodyB, shapeA, shapeB, eqn) {
    console.log("HITTY!");
  },
  
  hit: function() {
    this.hammer.animations.play("hit");
    this.wood.forEach(
      (item) => { 
        if (item.DOTHETHING) {
          console.log(item);
          console.log(item.world.x);
          if (item.world.x > 20 && item.world.x < 70) {
            item.DOTHETHING = false;
            this.hitCount += 1;
            if (this.hitCount %2 == 0 && this.house.frame < 7)
              this.house.frame++;
            
           
            this.game.add.tween(item)
            .to({y:"+30"}, 300, "Linear", true, 300).start()
          } 
        }
      }
    )
  },

  loadLevel: function() {
    this.wood = this.game.add.group();
    this.wood.x = 0;
    this.currentLevel = levelConfig.levelConfig.splice(0, 1)[0];
    if (! this.currentLevel ) {
      this.game.state.start("FurnishRoom");
    }
    for (var i in this.currentLevel) {
      if (this.currentLevel[i]) {
        var w =this.wood.create(-(i*100)+15, 330, "nail");
        w.DOTHETHING=1;
      }
    } 

    var w = this.wood.create(-350, 400, "wood");
    // Wait for the demo to play, the move
    t= this.game.add.tween(this.wood).to({x:"+400"}, 428*4*2, "Linear",true, 
                                      428*4*2)
    t.onComplete.add(this.woodFlyAway,this)
    t.onComplete.add(this.woodFinish, this);
    t.start();
  },

  woodFlyAway: function() {
    this.game.add.tween(this.wood).to({x:"+800"}, 400, "Linear", true,100).start();
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
