var Menu = function() {};
Menu.prototype = {
  init: function() {
    this.start_game();
  },
  start_game: function() {
    this.game.state.start("BuildRoom");
  },
  preload: function() {
  },
  create: function() {
  },
  update: function() {
  },
};
