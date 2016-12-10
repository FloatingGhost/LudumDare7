var BuildRoom = function() {};
BuildRoom.prototype = {
  // Are we accepting clicks?
  clickIsActive: false,
  // Is the hammer demo playing with no input?
  demo: false,
  // Is the hammer playing and accepting input?
  startHammer: false,

  init: function() {
    console.log("Building a room!");
  },
  start_game: function() {
  },
  preload: function() {
    this.game.load.image("test", "img/test.png");
    this.game.load.audio("blip", "snd/Blip.wav");
    this.game.load.audio("metronome", "snd/Metronome.wav");
    this.game.load.spritesheet("hammer", "img/Hammer.png", 200, 200);
    this.game.load.spritesheet("demohammer", "img/DemoHammer.png", 200, 200);
    this.game.load.image("wood", "img/wood.png");
  },
  create: function() {
    this.testSprite = this.game.add.sprite(100,100,"test");
    this.testSprite.alpha = 0;

    this.beatUtil = new beatProc();

    this.clickIsActive = false

    this.blip = this.game.add.audio("blip");
    this.metronome = this.game.add.audio("metronome");  
    this.countdown = this.game.add.text(0,0,"",{fill:"#ffffff",
                                               font:"65px Arial"})
    this.game.input.onDown.add(this.processClick, this);

    this.hammer = this.game.add.sprite(0, 200, "hammer");
    this.hammer.animations.add("hit");

    this.demoHammer = this.game.add.sprite(500, 100, "demohammer");
    this.demoHitAnim = this.demoHammer.animations.add("hit");
    this.demoHammer.scale.setTo(0.8);
    this.game.time.events.loop(500, this.playMetronome, this)
    this.loadLevel();
   
  },

  loadLevel: function() {
    this.beatUtil.setExpectedTimes(levelConfig.levelConfig.splice(0,1)[0]);
    if (!this.beatUtil.getExpectedTimes()) {
      console.log("EXIT!")
    }
    this.demo = true;
  },

  activateClick: function() {
    console.log("CLICK ENABLED")
    this.clickIsActive = true;
    this.beatUtil.start();
    this.startHammer = true;
  },
  gogogo: function() {
    this.game.time.events.add(3000,this.activateClick, this);
    this.game.time.events.add(1000,this.setCountdownText, this,"2")
    this.game.time.events.add(2000,this.setCountdownText,this,"1")
    this.game.time.events.add(3000,this.setCountdownText,this,"GO")
  },
  playMetronome: function() { this.metronome.play(); },
  setCountdownText: function(a) { this.countdown.setText(a); },
  playDemoHammer: function() { this.demoHitAnim.play(); },
  playBlip: function() { this.blip.play() },
  
  update: function() {
    // Show the user what rhythm to do
    if (this.demo || (this.clickIsActive && this.startHammer)) {
      var nullTween = {x : this.testSprite.x}
      var total = 0;
      var t =null;
      for (var i in this.beatUtil.getExpectedTimes()) {
        var time = this.beatUtil.getExpectedTimes()[i];  
          console.log(time);
          // Do nothing for some time, then boop
          this.game.time.events.add(time+total, 
                                    this.playDemoHammer,
                                    this);  
          this.game.time.events.add(total+time, this.playBlip, this);
          total += time;
      }
      if (this.demo) {
        console.log("DEMO SET");
        this.game.time.events.add(4000, this.gogogo, this); 
        this.countdown.setText("3")
        this.demo = false;
      }
      if (this.startHammer) { this.startHammer = false }
    } 
    if (this.beatUtil.doesStop() && this.clickIsActive) {
      console.log("CLICK DISABLED!");
      this.setCountdownText("WATCH -->")
      this.clickIsActive = false;
      this.loadLevel();
    }
             
  },

  processClick: function() {
    if (this.clickIsActive) {
      this.hammer.animations.play("hit");
      console.log(this.beatUtil.registerClick());
    }

  },
};
