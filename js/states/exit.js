var Exit = function() {};
Exit.prototype = {
  init: function() {
  },
  start_game: function() {
  },
  preload: function() {
    this.game.load.image("bg", "img/Exit.png");
  },
  create: function() {
    this.game.add.sprite(0,0,"bg");
  },
  update: function() {
  },
};
