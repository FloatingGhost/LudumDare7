var Menu = function() {};
Menu.prototype = {
  init: function() {
  },
  start_game: function() {
    this.game.state.start("FurnishRoom");
  },
  preload: function() {
    this.game.load.audio("voice", "snd/menusound.wav");
    this.game.load.image("bg", "img/menubg.png");
    this.game.load.image("but", "img/dothedo.png");
  },
  create: function() {
    this.game.add.audio("voice").play();
    this.game.add.sprite(0,0,"bg");
    var v = this.game.add.sprite(230, 280, "but");
    game.input.onTap.add(this.start_game, this);
  },
  update: function() {
  },
};
