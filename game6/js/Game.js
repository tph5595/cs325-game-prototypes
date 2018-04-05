"use strict";

var mygame = null;

BasicGame.Game = function(game) {
  this.player = null;
  this.cursors = null;
  this.betButton = null;
  this.redrawButton = null;
  this.getButton = null;
  this.score = null;
  this.scoreText = null;
  this.playingG = null;
  this.music = null;
  this.guessValue = null;
  this.guessRound = null;
  this.roundOver = null;
  this.buttonDown = null;
  this.mul1 = null;
  this.mul2 = null;

  this.m10 = null;
  this.m11 = null;
  this.m12 = null;
  this.m13 = null;
  this.m14 = null;
  this.m15 = null;
  this.m16 = null;
  this.m17 = null;
  this.m18 = null;
  this.m19 = null;

  this.m20 = null;
  this.m21 = null;
  this.m22 = null;
  this.m23 = null;
  this.m24 = null;
  this.m25 = null;
  this.m26 = null;
  this.m27 = null;
  this.m28 = null;
  this.m29 = null;
};

BasicGame.Game.prototype = {

  create: function() {
    this.playingG = true;

    this.canShoot = true;

    mygame = this;

    this.music = this.add.audio('gameMusic');
    this.music.fadeIn(4000);

    this.add.sprite(0, 0, 'gameback');

    this.scoreText = this.add.text(600, 530, 'Acorns: 500');
    this.scoreText.font = 'VT323';
    this.scoreText.fontSize = 30;
    this.scoreText.fill = "#ffffff";
    this.scoreText.align = "left";
    this.score = 500;

    this.guessText = this.add.text(350, 530, 'Guess: 1');
    this.guessText.font = 'VT323';
    this.guessText.fontSize = 30;
    this.guessText.fill = "#ffffff";
    this.guessText.align = "left";
    this.guessValue = 1;

    this.realText = this.add.text(50, 530, 'Real Value: ???');
    this.realText.font = 'VT323';
    this.realText.fontSize = 30;
    this.realText.fill = "#ffffff";
    this.realText.align = "left";
    this.realValue = -1;

    this.XText = this.add.text(375, 125, 'X');
    this.XText.font = 'VT323';
    this.XText.fontSize = 75;
    this.XText.fill = "#000000";
    this.XText.align = "left";
    this.XText.alpha = 0;

    this.cursors = this.input.keyboard.createCursorKeys();

    this.betButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    this.redrawButton = this.input.keyboard.addKey(Phaser.KeyCode.ENTER);

    this.guessRound = 0;
    this.roundOver = false;
    this.buttonDown = false;

    this.m10 = this.add.sprite(150, 100, 'acorn');
    this.m11 = this.add.sprite(200, 100, 'acorn');
    this.m12 = this.add.sprite(250, 100, 'acorn');
    this.m13 = this.add.sprite(300, 100, 'acorn');
    this.m14 = this.add.sprite(150, 150, 'acorn');
    this.m15 = this.add.sprite(200, 150, 'acorn');
    this.m16 = this.add.sprite(250, 150, 'acorn');
    this.m17 = this.add.sprite(300, 150, 'acorn');
    this.m18 = this.add.sprite(200, 200, 'acorn');
    this.m19 = this.add.sprite(250, 200, 'acorn');

    this.m20 = this.add.sprite(400 + 50, 100, 'acorn');
    this.m21 = this.add.sprite(450 + 50, 100, 'acorn');
    this.m22 = this.add.sprite(500 + 50, 100, 'acorn');
    this.m23 = this.add.sprite(550 + 50, 100, 'acorn');
    this.m24 = this.add.sprite(400 + 50, 150, 'acorn');
    this.m25 = this.add.sprite(450 + 50, 150, 'acorn');
    this.m26 = this.add.sprite(500 + 50, 150, 'acorn');
    this.m27 = this.add.sprite(550 + 50, 150, 'acorn');
    this.m28 = this.add.sprite(450 + 50, 200, 'acorn');
    this.m29 = this.add.sprite(500 + 50, 200, 'acorn');

    this.m10.alpha = 0;
    this.m11.alpha = 0;
    this.m12.alpha = 0;
    this.m13.alpha = 0;
    this.m14.alpha = 0;
    this.m15.alpha = 0;
    this.m16.alpha = 0;
    this.m17.alpha = 0;
    this.m18.alpha = 0;
    this.m19.alpha = 0;

    this.m20.alpha = 0;
    this.m21.alpha = 0;
    this.m22.alpha = 0;
    this.m23.alpha = 0;
    this.m24.alpha = 0;
    this.m25.alpha = 0;
    this.m26.alpha = 0;
    this.m27.alpha = 0;
    this.m28.alpha = 0;
    this.m29.alpha = 0;

    this.s0 = this.add.sprite(375, 450, 's1');
    this.s1 = this.add.sprite(675, 300, 's2');
    this.s2 = this.add.sprite(525, 300, 's3');
    this.s3 = this.add.sprite(225, 350, 's4');
    this.s4 = this.add.sprite(75, 300, 's5');
    this.s5 = this.add.sprite(500, 400, 's1');
    this.s6 = this.add.sprite(200, 450, 's2');
    this.s7 = this.add.sprite(350, 300, 's3');
    this.s8 = this.add.sprite(100, 400, 's4');
    this.s9 = this.add.sprite(700, 450, 's5');

    this.s0.alpha = 0;
    this.s1.alpha = 0;
    this.s2.alpha = 0;
    this.s3.alpha = 0;
    this.s4.alpha = 0;
    this.s5.alpha = 0;
    this.s6.alpha = 0;
    this.s7.alpha = 0;
    this.s8.alpha = 0;
    this.s9.alpha = 0;
  },

  update: function() {

    if (this.playingG === true) {
      if (this.realValue == -1) {
        this.redraw();
      }
      if (this.cursors.up.isDown && this.guessValue < 100 && this.buttonDown == false) {
        this.guessValue++;
        this.buttonDown = true;
      } else if (this.cursors.down.isDown && this.guessValue > 1 && this.buttonDown == false) {
        this.guessValue--;
        this.buttonDown = true;
      } else if (this.cursors.left.isDown && this.guessValue > 10 && this.buttonDown == false) {
        this.guessValue -= 10;
        this.buttonDown = true;
      } else if (this.cursors.right.isDown && this.guessValue < 91 && this.buttonDown == false) {
        this.guessValue += 10;
        this.buttonDown = true;
      } else if (this.betButton.isDown && this.guessRound == 0 && this.roundOver == false && this.buttonDown == false) {
        this.betPeak();
        this.guessRound = 1;
        this.buttonDown = true;
      } else if (this.betButton.isDown && this.guessRound == 1 && this.roundOver == false && this.buttonDown == false) {
        this.betReveal();
        this.guessRound = 0;
        this.roundOver = true;
        this.buttonDown = true;
      } else if (this.redrawButton.isDown && this.roundOver == true && this.buttonDown == false) {
        this.redraw();
        this.buttonDown = true;
      } else if (this.cursors.up.isUp && this.cursors.down.isUp && this.betButton.isUp && this.redrawButton.isUp && this.cursors.left.isUp && this.cursors.right.isUp) {
        this.buttonDown = false;
      }
      this.showBet(this.guessValue);
      this.refreshValues();

      if (this.score <= 0) {
        this.gameOver();
      } else if (this.score >= 1000) {
        this.gameWin();
      }
    }
  },

  betPeak: function() {
    var r = Math.abs(this.realValue - this.guessValue) / 10.0;
    r = 10 - r;
    r += Math.floor(Math.random() * 4) - 2;
    if (r > 10) {
      r = 10;
    }else if (r < 1) {
      r = 1;
    }
    while (r > 0) {
      this.showRand();
      r--;
    }
    setTimeout(function() {
      mygame.hideSq();
    }, 500);
  },

  betReveal: function() {
    this.realText.text = "Real Value: " + this.realValue;
    if (this.guessValue == this.realValue) {
      this.score += 300;
    } else if (Math.abs(this.guessValue - this.realValue) < 5) {
      this.score += 200;
    } else if (Math.abs(this.guessValue - this.realValue) < 10) {
      this.score += 100;
    } else if (Math.abs(this.guessValue - this.realValue) < 25) {
      this.score += 50;
    } else if (Math.abs(this.guessValue - this.realValue) < 50) {
      this.score -= 100;
    } else {
      this.score -= 250;
    }
  },

  redraw: function() {
    this.realValue = -1;
    this.roundOver = false;
    this.realText.text = "Real Value: ???";

    this.mul1 = Math.floor(Math.random() * 10) + 1;
    this.mul2 = Math.floor(Math.random() * 10) + 1;
    this.realValue = this.mul1 * this.mul2;

    this.showMul1();
    this.showMul2();
    this.XText.alpha = 1;
    setTimeout(function() {
      mygame.clearMul();
    }, 800);
  },

  showMul1: function() {
    while (this.mul1 > 0) {
      this.randomMul1();
      this.mul1--;
    }
  },

  showMul2: function() {
    while (this.mul2 > 0) {
      this.randomMul2();
      this.mul2--;
    }
  },

  randomMul1: function() {
    var good = false;
    while (!good) {
      good = true;
      var rand = Math.floor(Math.random() * 10);
      if (rand == 0 && this.m10.alpha == 0) {
        this.m10.alpha = 1;
      } else if (rand == 1 && this.m11.alpha == 0) {
        this.m11.alpha = 1;
      } else if (rand == 2 && this.m12.alpha == 0) {
        this.m12.alpha = 1;
      } else if (rand == 3 && this.m13.alpha == 0) {
        this.m13.alpha = 1;
      } else if (rand == 4 && this.m14.alpha == 0) {
        this.m14.alpha = 1;
      } else if (rand == 5 && this.m15.alpha == 0) {
        this.m15.alpha = 1;
      } else if (rand == 6 && this.m16.alpha == 0) {
        this.m16.alpha = 1;
      } else if (rand == 7 && this.m17.alpha == 0) {
        this.m17.alpha = 1;
      } else if (rand == 8 && this.m18.alpha == 0) {
        this.m18.alpha = 1;
      } else if (rand == 9 && this.m19.alpha == 0) {
        this.m19.alpha = 1;
      } else{
        good = false;
      }
    }
  },

  randomMul2: function() {
    var good = false;
    while (!good) {
      good = true;
      var rand = Math.floor(Math.random() * 10);
      if (rand == 0 && this.m20.alpha == 0) {
        this.m20.alpha = 1;
      } else if (rand == 1 && this.m21.alpha == 0) {
        this.m21.alpha = 1;
      } else if (rand == 2 && this.m22.alpha == 0) {
        this.m22.alpha = 1;
      } else if (rand == 3 && this.m23.alpha == 0) {
        this.m23.alpha = 1;
      } else if (rand == 4 && this.m24.alpha == 0) {
        this.m24.alpha = 1;
      } else if (rand == 5 && this.m25.alpha == 0) {
        this.m25.alpha = 1;
      } else if (rand == 6 && this.m26.alpha == 0) {
        this.m26.alpha = 1;
      } else if (rand == 7 && this.m27.alpha == 0) {
        this.m27.alpha = 1;
      } else if (rand == 8 && this.m28.alpha == 0) {
        this.m28.alpha = 1;
      } else if (rand == 9 && this.m29.alpha == 0) {
        this.m29.alpha = 1;
      } else {
        good = false;
      }
    }
  },

  clearMul: function() {
    this.XText.alpha = 0;

    this.m10.alpha = 0;
    this.m11.alpha = 0;
    this.m12.alpha = 0;
    this.m13.alpha = 0;
    this.m14.alpha = 0;
    this.m15.alpha = 0;
    this.m16.alpha = 0;
    this.m17.alpha = 0;
    this.m18.alpha = 0;
    this.m19.alpha = 0;

    this.m20.alpha = 0;
    this.m21.alpha = 0;
    this.m22.alpha = 0;
    this.m23.alpha = 0;
    this.m24.alpha = 0;
    this.m25.alpha = 0;
    this.m26.alpha = 0;
    this.m27.alpha = 0;
    this.m28.alpha = 0;
    this.m29.alpha = 0;
  },

  hideSq: function() {
    this.s0.alpha = 0;
    this.s1.alpha = 0;
    this.s2.alpha = 0;
    this.s3.alpha = 0;
    this.s4.alpha = 0;
    this.s5.alpha = 0;
    this.s6.alpha = 0;
    this.s7.alpha = 0;
    this.s8.alpha = 0;
    this.s9.alpha = 0;
  },

  showBet: function(guess) {
    this.guessText.text = "Guess: " + guess;
  },

  refreshValues: function() {
    this.scoreText.text = "Acorns: " + this.score;
  },

  showRand: function() {
    var good = false;
    while (!good) {
      good = true;
      var rand = Math.floor(Math.random() * 10);
      if (rand == 0 && this.s0.alpha == 0) {
        this.s0.alpha = 1;
      } else if (rand == 1 && this.s1.alpha == 0) {
        this.s1.alpha = 1;
      } else if (rand == 2 && this.s2.alpha == 0) {
        this.s2.alpha = 1;
      } else if (rand == 3 && this.s3.alpha == 0) {
        this.s3.alpha = 1;
      } else if (rand == 4 && this.s4.alpha == 0) {
        this.s4.alpha = 1;
      } else if (rand == 5 && this.s5.alpha == 0) {
        this.s5.alpha = 1;
      } else if (rand == 6 && this.s6.alpha == 0) {
        this.s6.alpha = 1;
      } else if (rand == 7 && this.s7.alpha == 0) {
        this.s7.alpha = 1;
      } else if (rand == 8 && this.s8.alpha == 0) {
        this.s8.alpha = 1;
      } else if (rand == 9 && this.s9.alpha == 0) {
        this.s9.alpha = 1;
      } else {
        good = false;
      }
    }
  },

  restart: function() {
    this.time.events.start();
    this.game.state.restart();
  },

  gameOver: function() {
    this.playingG = false;

    var go = this.add.sprite(-75, 0, 'gameover');
    go.alpha = 0;

    this.add.tween(go).to({
      alpha: 1
    }, 2000, "Linear", true);

    this.time.events.stop();

    this.music.fadeOut(1000);

    var butt = this.add.button(this.world.centerX - 95, 450, 'restartButton', this.restart, this, 2, 1, 0);

    butt.alpha = 0;

    this.add.tween(butt).to({
      alpha: 1
    }, 1000, "Linear", true, 2000);
  },

  gameWin: function() {
    this.playingG = false;

    var gw = this.add.sprite(50, 50, 'gamewin');
    gw.alpha = 0;

    this.add.tween(gw).to({
      alpha: 1
    }, 2000, "Linear", true);

    this.time.events.stop();

    this.music.fadeOut(1000);

    var butt = this.add.button(this.world.centerX - 95, 400, 'restartButton', this.restart, this, 2, 1, 0);

    butt.alpha = 0;

    this.add.tween(butt).to({
      alpha: 1
    }, 1000, "Linear", true, 2000);
  }
};
