var BuildRoom = function() {};
BuildRoom.prototype = {
  // Are we accepting clicks?
  clickIsActive: false,

  init: function() {
    console.log("Building a room!");
  },
  start_game: function() {
  },
  preload: function() {
    this.game.load.image("test", "img/test.png");
    this.game.load.audio("blip", "snd/Blip.wav");

  },
  create: function() {
    this.testSprite = this.game.add.sprite(100,100,"test");
    this.testSprite.alpha = 0;

    this.beatUtil = new beatProc();
    this.beatUtil.setExpectedTimes([1000, 1000, 1000]);

    this.clickIsActive = false;
    this.demo = true;

    this.blip = this.game.add.audio("blip");
    
    this.countdown = this.game.add.text(0,0,"",{fill:"#ffffff",
                                                font:"65px Arial"})
  },

  activateClick: function() {
    this.clickIsActive = true;
    this.beatUtil.start();
  },
  gogogo: function() {
    setTimeout(function(that){that.activateClick()},
               3000,this);
    setTimeout(function(that){that.setText("2")}, 1000, this.countdown)
    setTimeout(function(that){that.setText("1")}, 2000, this.countdown)
    setTimeout(function(that){that.setText("GO")}, 3000, this.countdown)
  },
  update: function() {
    // Show the user what rhythm to do
    if (this.demo) {
      var nullTween = {x : this.testSprite.x}
      var total = 0;
      var t =null;
      this.beatUtil.getExpectedTimes().forEach(
        (time) => {
          console.log(time);
          // Do nothing for some time, then boop
          t = this.game.add.tween(this.testSprite).to({alpha:1}, 50,
            "Linear", true, total + time - 100)
          .chain(
            this.game.add.tween(this.testSprite).to({alpha:0}, 50)
          );
          setTimeout(function(snd){snd.play()}, total+time-40, this.blip);
          t.start();
          total += time;
        }
      )
      t.onComplete.add(this.gogogo, this);
      
      this.countdown.setText("3")
      this.demo = false;
    }
    else if (this.clickIsActive) {
      if (this.game.input.activePointer.justPressed(25)) {
        console.log(this.beatUtil.registerClick());

        this.testSprite.x = this.game.input.activePointer.pageX;
        this.testSprite.y = this.game.input.activePointer.pageY;
        
        this.game.add.tween(this.testSprite)
        .to({ alpha: 1 }, 50)
        .chain(this.game.add.tween(this.testSprite)
                .to({alpha : 0}, 50))
        .start();
      }

      if (this.beatUtil.doesStop()) {
        console.log("CLICK DISABLED!");
        this.clickIsActive = false;
      }
    }
         
  },
};
