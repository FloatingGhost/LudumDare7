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
  },
  create: function() {
    this.testSprite = this.game.add.sprite(100,100,"test");
    this.testSprite.alpha = 0;

    this.beatUtil = new beatProc();
    this.beatUtil.setExpectedTimes([1000, 1000, 1000]);

    this.beatUtil.start();

    this.clickIsActive = true;
  },
  update: function() {
    if (this.clickIsActive) {
      if (this.game.input.activePointer.justPressed(25)) {
        this.beatUtil.registerClick();

        this.game.add.tween(this.testSprite)
        .to({ alpha: 1 }, 50)
        .chain(this.game.add.tween(this.testSprite)
                .to({alpha : 0}, 50))
        .start();
      }

      if (this.beatUtil.doesStop()) {
        console.log("CLICK DISABLED!");
        this.clickIsActive = false;
        var variance = this.beatUtil.processClicks();
        console.log(variance);
      }
    }
         
  },
};
