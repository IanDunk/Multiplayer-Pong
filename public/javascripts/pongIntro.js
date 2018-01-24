// =============================================================================
// Pong Intro Game State
// =============================================================================


let PongIntroState = function(game) {
  this.backgroundImage
  this.pong2K

  this.introMusic

  this.bubbleBuddy

  this.newGameInstructions_text

}

PongIntroState.prototype = {

  preload: function() {
    game.load.image('background', 'public/assets/image/pongGalaxy2.png');

    game.load.bitmapFont('2P', 'public/assets/font/PressStart2P/2P.png', 'public/assets/font/PressStart2P/2P.xml');

    game.load.audio('success', ['public/assets/sound/success.ogg', 'public/assets/sound/success.mp3']);

    this.game.load.spritesheet('bubbleBuddy', 'public/assets/image/bubbs_animated_green_huge.png', 288, 288, 36);

  },

  create: function() {

    this.createGraphics();

    this.enterGame = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    this.gamesPresents_text = game.add.bitmapText(game.world.centerX - 10, 410, '2P', gameText.gamePresents, 30);
    this.gamesPresents_text.anchor.x = 0.5;

    game.time.events.add(Phaser.Timer.SECOND * 2, this.playSound, this);

    game.time.events.add(Phaser.Timer.SECOND * 5, this.endGame, this);

    this.bubbleBuddy = this.game.add.sprite(game.world.centerX - 160, game.world.centerY - 150, 'bubbleBuddy');
    this.bubbleBuddy.animations.add('wobble', [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 8, true);
    this.bubbleBuddy.animations.play('wobble');
  },

  createGraphics: function() {
    this.introMusic = game.add.audio('success', 1, true);

    this.backgroundImage = game.add.image(game.world.centerX, game.world.centerY, 'background').anchor.set(0.5);
  },

  update: function() {
      if (this.enterGame.isDown) {
        game.state.start('playerSelect');
      }
  },

  playSound: function () {
      this.introMusic.play('', 0, 1, false);
  },

  endGame: function () {
    this.game.state.start('playerSelect');
  }

}

// =============================================================================
// Game Entry Point
// =============================================================================

let game = new Phaser.Game(properties.screenWidth, properties.screenHeight, Phaser.AUTO, 'game');
game.state.add('pongIntro', PongIntroState);
game.state.add('playerSelect', PlayerSelectState);
game.state.add('main', MainStateInstance);
game.state.add('matchRecordSelect', MatchRecordSelectState);
game.state.start('pongIntro');
