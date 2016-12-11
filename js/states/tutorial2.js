var Tut2 = function() {};
Tut2.prototype = {
  init: function() {
  },
  start_game: function() {
    this.game.state.start("FurnishRoom");
  },
  preload: function() {
    this.game.load.image("t1", "img/Phase2Tut1.png");
    this.game.load.image("t2", "img/Phase2Tut2.png");
  },
  create: function() {
    this.game.add.sprite(0,0,"t1");
    this.game.input.onTap.add(this.next, this);
  },

  next: function() {
    this.game.add.sprite(0,0,"t2");
    this.game.input.onTap.removeAll();
    this.game.input.onTap.add(this.start_game, this);
  },

  update: function() {
  },
};
