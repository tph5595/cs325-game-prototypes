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

};

BasicGame.Game.prototype = {

  create: function() {
    this.playingG = true;

    mygame = this;

    this.music = this.add.audio('gameMusic');
    this.music.fadeIn(4000);

    this.trackN = this.add.audio('trackN');
    this.trainN = this.add.audio('trainN');

    this.backs = this.add.sprite(0, 0, 'gamebacks');
    this.backf = this.add.sprite(0, 0, 'gamebackf');
    this.backf.alpha = 0;

    this.scoreText = this.add.text(600, 530, 'Score: 0');
    this.scoreText.font = 'VT323';
    this.scoreText.fontSize = 30;
    this.scoreText.fill = "#000000";
    this.scoreText.align = "left";
    this.score = 0;

    this.levelText = this.add.text(650, 20, 'Level: 1');
    this.levelText.font = 'VT323';
    this.levelText.fontSize = 30;
    this.levelText.fill = "#000000";
    this.levelText.align = "left";

    this.livesText = this.add.text(50, 20, 'Lives: 3');
    this.livesText.font = 'VT323';
    this.livesText.fontSize = 30;
    this.livesText.fill = "#000000";
    this.livesText.align = "left";
    this.lives = 3;

    this.cursors = this.input.keyboard.createCursorKeys();

    this.sBar = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    this.EKey = this.input.keyboard.addKey(Phaser.KeyCode.ENTER);

    this.buttonDown = false;

    this.img11 = this.add.sprite(75, 315, 's1');
    this.img12 = this.add.sprite(75, 315, 's2');
    this.img13 = this.add.sprite(75, 315, 's3');
    this.img14 = this.add.sprite(75, 315, 's4');

    this.img21 = this.add.sprite(225, 315, 's1');
    this.img22 = this.add.sprite(225, 315, 's2');
    this.img23 = this.add.sprite(225, 315, 's3');
    this.img24 = this.add.sprite(225, 315, 's4');

    this.img31 = this.add.sprite(375, 315, 's1');
    this.img32 = this.add.sprite(375, 315, 's2');
    this.img33 = this.add.sprite(375, 315, 's3');
    this.img34 = this.add.sprite(375, 315, 's4');

    this.img41 = this.add.sprite(525, 315, 's1');
    this.img42 = this.add.sprite(525, 315, 's2');
    this.img43 = this.add.sprite(525, 315, 's3');
    this.img44 = this.add.sprite(525, 315, 's4');

    this.img11.alpha = 1;
    this.img12.alpha = 0;
    this.img13.alpha = 0;
    this.img14.alpha = 0;

    this.img21.alpha = 1;
    this.img22.alpha = 0;
    this.img23.alpha = 0;
    this.img24.alpha = 0;

    this.img31.alpha = 1;
    this.img32.alpha = 0;
    this.img33.alpha = 0;
    this.img34.alpha = 0;

    this.img41.alpha = 1;
    this.img42.alpha = 0;
    this.img43.alpha = 0;
    this.img44.alpha = 0;

    this.t11 = this.add.sprite(50, 300, 't1');
    this.t12 = this.add.sprite(50, 300, 't2');
    this.t13 = this.add.sprite(50, 300, 't3');
    this.t14 = this.add.sprite(50, 300, 't4');

    this.t21 = this.add.sprite(200, 300, 't1');
    this.t22 = this.add.sprite(200, 300, 't2');
    this.t23 = this.add.sprite(200, 300, 't3');
    this.t24 = this.add.sprite(200, 300, 't4');

    this.t31 = this.add.sprite(350, 300, 't1');
    this.t32 = this.add.sprite(350, 300, 't2');
    this.t33 = this.add.sprite(350, 300, 't3');
    this.t34 = this.add.sprite(350, 300, 't4');

    this.t41 = this.add.sprite(500, 300, 't1');
    this.t42 = this.add.sprite(500, 300, 't2');
    this.t43 = this.add.sprite(500, 300, 't3');
    this.t44 = this.add.sprite(500, 300, 't4');

    this.t11.alpha = 1;
    this.t12.alpha = 0;
    this.t13.alpha = 0;
    this.t14.alpha = 0;

    this.t21.alpha = 1;
    this.t22.alpha = 0;
    this.t23.alpha = 0;
    this.t24.alpha = 0;

    this.t31.alpha = 1;
    this.t32.alpha = 0;
    this.t33.alpha = 0;
    this.t34.alpha = 0;

    this.t41.alpha = 1;
    this.t42.alpha = 0;
    this.t43.alpha = 0;
    this.t44.alpha = 0;

    this.a1 = this.add.sprite( 50, 400, 'arrow');
    this.a2 = this.add.sprite(200, 400, 'arrow');
    this.a3 = this.add.sprite(350, 400, 'arrow');
    this.a4 = this.add.sprite(500, 400, 'arrow');

    this.a1.alpha = 1;
    this.a2.alpha = 0;
    this.a3.alpha = 0;
    this.a4.alpha = 0;

    this.level = 1;
    this.shape = 1;
    this.pos = 0;

    this.c1 = false;
    this.c2 = false;
    this.c3 = false;
    this.c4 = false;

    this.train = this.add.sprite(600, 275, 'train');

    mygame.randomTrack();
  },

  update: function() {

    if (this.playingG === true) {
      if (this.lives == 0) {
        this.gameOver();
      }
      if (this.cursors.up.isDown && !this.buttonDown) {
        this.buttonDown = true;
        this.shape = 1;
        this.updateShapes();
      }else if (this.cursors.right.isDown && !this.buttonDown) {
        this.buttonDown = true;
        this.shape = 2;
        this.updateShapes();
      }else if (this.cursors.down.isDown && !this.buttonDown) {
        this.buttonDown = true;
        this.shape = 3;
        this.updateShapes();
      }else if (this.cursors.left.isDown && !this.buttonDown) {
        this.buttonDown = true;
        this.shape = 4;
        this.updateShapes();
      }else if (this.sBar.isDown && !this.buttonDown) {
        this.buttonDown = true;
        this.pos = (this.pos + 1) % 4;
        this.updateArrow();
      }else if (this.EKey.isDown && !this.buttonDown) {
        this.buttonDown = true;
        this.checkTrack();
      }else if (this.cursors.up.isUp && this.cursors.right.isUp && this.cursors.down.isUp && this.cursors.left.isUp && this.sBar.isUp && this.EKey.isUp) {
        this.buttonDown = false;
      }
    }
  },

  randomTrack: function(){
    this.randomTrack1();
    this.randomTrack2();
    this.randomTrack3();
    this.randomTrack4();
  },

  randomTrack1: function(){
    this.t11.alpha = 0;
    this.t12.alpha = 0;
    this.t13.alpha = 0;
    this.t14.alpha = 0;

    var tmp = Math.floor(Math.random() * 4);

    if (tmp == 0) {
      this.t11.alpha = 1;
    }else if (tmp == 1) {
      this.t12.alpha = 1;
    }else if (tmp == 2) {
      this.t13.alpha = 1;
    }else if (tmp == 3) {
      this.t14.alpha = 1;
    }
  },

  randomTrack2: function(){
    this.t21.alpha = 0;
    this.t22.alpha = 0;
    this.t23.alpha = 0;
    this.t24.alpha = 0;

    var tmp = Math.floor(Math.random() * 4);

    if (tmp == 0) {
      this.t21.alpha = 1;
    }else if (tmp == 1) {
      this.t22.alpha = 1;
    }else if (tmp == 2) {
      this.t23.alpha = 1;
    }else if (tmp == 3) {
      this.t24.alpha = 1;
    }
  },

  randomTrack3: function(){
    this.t31.alpha = 0;
    this.t32.alpha = 0;
    this.t33.alpha = 0;
    this.t34.alpha = 0;

    var tmp = Math.floor(Math.random() * 4);

    if (tmp == 0) {
      this.t31.alpha = 1;
    }else if (tmp == 1) {
      this.t32.alpha = 1;
    }else if (tmp == 2) {
      this.t33.alpha = 1;
    }else if (tmp == 3) {
      this.t34.alpha = 1;
    }
  },

  randomTrack4: function(){
    this.t41.alpha = 0;
    this.t42.alpha = 0;
    this.t43.alpha = 0;
    this.t44.alpha = 0;

    var tmp = Math.floor(Math.random() * 4);

    if (tmp == 0) {
      this.t41.alpha = 1;
    }else if (tmp == 1) {
      this.t42.alpha = 1;
    }else if (tmp == 2) {
      this.t43.alpha = 1;
    }else if (tmp == 3) {
      this.t44.alpha = 1;
    }
  },

  checkTrack: function() {
    this.checkTrack1();
    this.checkTrack2();
    this.checkTrack3();
    this.checkTrack4();
    if(this.c1 && this.c2 && this.c3 && this.c4){
      this.levelUp();
    }else {
      this.lives--;
      this.livesText.text = "Lives: " + this.lives;
    }
  },

  checkTrack1: function(){
    this.c1 = false;
    if (this.t11.alpha == 1 && this.img11.alpha == 1) {
      this.c1 = true;
    }else  if (this.t12.alpha == 1 && this.img12.alpha == 1) {
      this.c1 = true;
    }else if (this.t13.alpha == 1 && this.img13.alpha == 1) {
      this.c1 = true;
    }else if (this.t14.alpha == 1 && this.img14.alpha == 1) {
      this.c1 = true;
    }
  },

  checkTrack2: function(){
    this.c2 = false;
    if (this.t21.alpha == 1 && this.img21.alpha == 1) {
      this.c2 = true;
    }else  if (this.t22.alpha == 1 && this.img22.alpha == 1) {
      this.c2 = true;
    }else if (this.t23.alpha == 1 && this.img23.alpha == 1) {
      this.c2 = true;
    }else if (this.t24.alpha == 1 && this.img24.alpha == 1) {
      this.c2 = true;
    }
  },

  checkTrack3: function(){
    this.c3 = false;
    if (this.t31.alpha == 1 && this.img31.alpha == 1) {
      this.c3 = true;
    }else  if (this.t32.alpha == 1 && this.img32.alpha == 1) {
      this.c3 = true;
    }else if (this.t33.alpha == 1 && this.img33.alpha == 1) {
      this.c3 = true;
    }else if (this.t34.alpha == 1 && this.img34.alpha == 1) {
      this.c3 = true;
    }
  },

  checkTrack4: function(){
    this.c4 = false;
    if (this.t41.alpha == 1 && this.img41.alpha == 1) {
      this.c4 = true;
    }else  if (this.t42.alpha == 1 && this.img42.alpha == 1) {
      this.c4 = true;
    }else if (this.t43.alpha == 1 && this.img43.alpha == 1) {
      this.c4 = true;
    }else if (this.t44.alpha == 1 && this.img44.alpha == 1) {
      this.c4 = true;
    }
  },

  updateArrow: function() {
    this.a1.alpha = 0;
    this.a2.alpha = 0;
    this.a3.alpha = 0;
    this.a4.alpha = 0;

    if (mygame.pos == 0) {
      this.a1.alpha = 1;
    }else if (mygame.pos == 1) {
      this.a2.alpha = 1;
    }else if (mygame.pos == 2) {
      this.a3.alpha = 1;
    }else if (mygame.pos == 3) {
      this.a4.alpha = 1;
    }
  },

  updateShapes: function() {
    this.trackN.play();
    if (mygame.pos == 0) {
      mygame.img11.alpha = 0;
      mygame.img12.alpha = 0;
      mygame.img13.alpha = 0;
      mygame.img14.alpha = 0;
      mygame.enable1();
    }else if (mygame.pos == 1) {
      mygame.img21.alpha = 0;
      mygame.img22.alpha = 0;
      mygame.img23.alpha = 0;
      mygame.img24.alpha = 0;
      mygame.enable2();
    }else if (mygame.pos == 2) {
      mygame.img31.alpha = 0;
      mygame.img32.alpha = 0;
      mygame.img33.alpha = 0;
      mygame.img34.alpha = 0;
      mygame.enable3();
    }else if (mygame.pos == 3) {
      mygame.img41.alpha = 0;
      mygame.img42.alpha = 0;
      mygame.img43.alpha = 0;
      mygame.img44.alpha = 0;
      mygame.enable4();
    }
  },

  enable1: function(){
    console.log("enable 1");
    if (mygame.shape == 1) {
      mygame.img11.alpha = 1;
    }else if (mygame.shape == 2) {
      mygame.img12.alpha = 1;
    }else if (mygame.shape == 3) {
      mygame.img13.alpha = 1;
    }else if (mygame.shape == 4) {
      mygame.img14.alpha = 1;
    }
  },

  enable2: function(){
  if (mygame.shape == 1) {
      mygame.img21.alpha = 1;
    }else if (mygame.shape == 2) {
      mygame.img22.alpha = 1;
    }else if (mygame.shape == 3) {
      mygame.img23.alpha = 1;
    }else if (mygame.shape == 4) {
      mygame.img24.alpha = 1;
    }
  },

  enable3: function(){
    if (mygame.shape == 1) {
      mygame.img31.alpha = 1;
    }else if (mygame.shape == 2) {
      mygame.img32.alpha = 1;
    }else if (mygame.shape == 3) {
      mygame.img33.alpha = 1;
    }else if (mygame.shape == 4) {
      mygame.img34.alpha = 1;
    }
  },

  enable4: function(){
    if (mygame.shape == 1) {
      mygame.img41.alpha = 1;
    }else if (mygame.shape == 2) {
      mygame.img42.alpha = 1;
    }else if (mygame.shape == 3) {
      mygame.img43.alpha = 1;
    }else if (mygame.shape == 4) {
      mygame.img44.alpha = 1;
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

    this.music.fadeOut(1000);

    var butt = this.add.button(this.world.centerX - 95, 450, 'restartButton', this.restart, this, 2, 1, 0);

    butt.alpha = 0;

    this.add.tween(butt).to({
      alpha: 1
    }, 1000, "Linear", true, 2000);
  },

  levelUp: function() {
    this.playingG = false;

    this.add.tween(this.backf).to({
      alpha: 1
    }, 500, "Linear", true);
    this.trainN.play();
    setTimeout(function() {
      mygame.add.tween(mygame.train).to({
        x: -600
      }, 3500, "Linear", true);
    }, 500);



    setTimeout(function() {
      mygame.level++;
      mygame.levelText.text = "Level: " + mygame.level;
      mygame.score += 500;
      mygame.scoreText.text = "Score: " + mygame.score;

      mygame.backf.alpha = 0;
      mygame.train.x = 600;
      mygame.playingG = true;

      mygame.img11.alpha = 1;
      mygame.img12.alpha = 0;
      mygame.img13.alpha = 0;
      mygame.img14.alpha = 0;

      mygame.img21.alpha = 1;
      mygame.img22.alpha = 0;
      mygame.img23.alpha = 0;
      mygame.img24.alpha = 0;

      mygame.img31.alpha = 1;
      mygame.img32.alpha = 0;
      mygame.img33.alpha = 0;
      mygame.img34.alpha = 0;

      mygame.img41.alpha = 1;
      mygame.img42.alpha = 0;
      mygame.img43.alpha = 0;
      mygame.img44.alpha = 0;
      mygame.randomTrack();
    }, 5000);


  }
};
