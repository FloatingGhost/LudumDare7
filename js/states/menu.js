var Menu = function() {};
Menu.prototype = {
  init: function() {
  },
  start_game: function() {
    this.game.state.start("Tut1");
  },
  preload: function() {
    this.game.load.audio("voice", "snd/menusound.wav");
    this.game.load.image("bg", "img/menubg.png");
  },
  create: function() {
    this.game.add.audio("voice").play();
    this.game.add.sprite(0,0,"bg");
    game.input.onTap.add(this.start_game, this);
  },
  update: function() {
  },
};
