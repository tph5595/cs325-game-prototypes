"use strict";

var mygame = null;

BasicGame.Game = function(game) {

  // For optional clarity, you can initialize
  // member variables here. Otherwise, you will do it in create().
  this.player = null;
  this.cursors = null;
  this.jumpbutton = null;
  this.score = null;
  this.scoreText = null;
  this.iceCubes = null;
  this.enemyspeed = null;
  this.spawnRate = null;
  this.playingG = null;
  this.music = null;
  this.flipped = null;
  this.jump = null;
  this.canjump = null;
  this.back = null;
  this.floor = null;
  this.border = null;
  this.setupspin = null;
  this.turn = null;
  this.spinning = null;
  this.backflip = null;
  this.canspin = null;
  this.tone = null;
  this.crank = null;
  this.maxIceY = null;
  this.maxIceCopy = null;
  this.iceCubesStopped = null;
};

BasicGame.Game.prototype = {

  create: function() {
    this.floor = 540;

    this.back = this.add.sprite(0, 0, 'titlePage');
    this.back.width = 800;
    this.back.height = 600;
    this.back.x = 400;
    this.back.y = 300;
    this.back.anchor.setTo(0.5, 0.5);

    this.iceCubes = this.add.group();
    this.iceCubesStopped = this.add.group();

    this.player = this.add.sprite(400, this.floor, 'player-red');
    this.player.y = this.floor;

    this.player.anchor.set(0.5);

    this.physics.arcade.enable([this.world, this.back, this.iceCubes, this.iceCubesStopped, this.player], true);

    this.iceCubes.enableBody = true;
    this.iceCubesStopped.enableBody = true;
    this.iceCubes.physicsBodyType = Phaser.Physics.ARCADE;
    this.iceCubesStopped.physicsBodyType = Phaser.Physics.ARCADE;

    this.back.body.allowGravity = false;
    this.player.body.allowGravity = false;

    this.physics.arcade.gravity.y = 400;


    this.canspin = true;
    this.backflip = false;

    this.playingG = true;

    this.canjump = true;

    mygame = this;

    this.music = this.add.audio('gameMusic');
    this.music.fadeIn(4000);

    this.scoreText = this.add.text(60, 32, '50000');
    this.scoreText.font = 'VT323';
    this.scoreText.fontSize = 30;
    this.scoreText.fill = "#ffffff";
    this.scoreText.align = "left";
    this.score = 50000;

    this.sun1 = this.add.sprite(50, 50, 'sun1');
    this.sun2 = this.add.sprite(250, 50, 'sun2');
    this.sun3 = this.add.sprite(450, 50, 'sun3');
    this.sun4 = this.add.sprite(650, 50, 'sun4');

    this.block1 = this.add.sprite(50, 150, 'bar1');
    this.block2 = this.add.sprite(250, 150, 'bar2');
    this.block3 = this.add.sprite(450, 150, 'bar3');
    this.block4 = this.add.sprite(650, 150, 'bar4');

    this.flipped = false;


    this.cursors = this.input.keyboard.createCursorKeys();

    this.jumpbutton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    this.keyA = this.input.keyboard.addKey(Phaser.KeyCode.A);
    this.keyS = this.input.keyboard.addKey(Phaser.KeyCode.S);
    this.keyD = this.input.keyboard.addKey(Phaser.KeyCode.D);
    this.keyF = this.input.keyboard.addKey(Phaser.KeyCode.F);

    this.time.events.loop(Phaser.Timer.SECOND, this.scoreUpdate, this);

    this.time.events.loop(Phaser.Timer.SECOND, this.showSun, this);

    this.time.events.loop(Phaser.Timer.SECOND * 2, this.spawn, this);

    this.enemyspeed = 10000;

    this.spawnRate = 0;


    this.player.body.collideWorldBounds = true;

    this.block1.alpha = 0;
    this.block2.alpha = 0;
    this.block3.alpha = 0;
    this.block4.alpha = 0;

    this.sun1.alpha = 0;
    this.sun2.alpha = 0;
    this.sun3.alpha = 0;
    this.sun4.alpha = 0;

    this.bad = 0;

    this.maxIceY = 1000;
  },

  update: function() {

    if (this.playingG == true) {

      this.iceCubesStopped.setAll("body.velocity.y", 0);
      this.iceCubesStopped.setAll("body.allowGravity", false);
      this.iceCubesStopped.setAll("body.moves", false);
      this.iceCubesStopped.setAll("body.immovable", true);

      if (this.cursors.left.isDown && this.player.x > 50) {
        this.player.x -= 8;
        this.player.angle = 180;
        this.iceCubesStopped.forEach(this.moveIceLeft);
        if (this.flipped === false) {
          this.player.scale.y *= -1;

          this.flipped = true;
        }
      } else if (this.cursors.right.isDown && this.player.x < 750) {
        this.player.x += 8;
        this.player.angle = 0;
        this.iceCubesStopped.forEach(this.moveIceRight);
        if (this.flipped === true) {
          this.flipped = false;
          this.player.scale.y *= -1;

        }
      }

      if (this.player.x < 50) {
        this.player.x = 50;
      }
      if (this.player.x > 750) {
        this.player.x = 750;
      }

      if (this.player.y > this.floor) {
        this.player.y = this.floor;
        this.player.body.velocity.y = 0;
      }

      if (this.keyA.isDown) {
        this.block1.alpha = 1;
        this.block2.alpha = 0;
        this.block3.alpha = 0;
        this.block4.alpha = 0;
      } else if (this.keyS.isDown) {
        this.block1.alpha = 0;
        this.block2.alpha = 1;
        this.block3.alpha = 0;
        this.block4.alpha = 0;
      } else if (this.keyD.isDown) {
        this.block1.alpha = 0;
        this.block2.alpha = 0;
        this.block3.alpha = 1;
        this.block4.alpha = 0;
      } else if (this.keyF.isDown) {
        this.block1.alpha = 0;
        this.block2.alpha = 0;
        this.block3.alpha = 0;
        this.block4.alpha = 1;
      }

      if (this.block1.alpha == 0 && this.sun1.alpha == 1) {
        this.bad++;
      }
      if (this.block2.alpha == 0 && this.sun2.alpha == 1) {
        this.bad++;
      }
      if (this.block3.alpha == 0 && this.sun3.alpha == 1) {
        this.bad++;
      }
      if (this.block4.alpha == 0 && this.sun4.alpha == 1) {
        this.bad++;
      }

      if (this.bad >= 100) {
        this.melt();
        this.bad = 0;
      }

      this.iceCubes.forEach(this.outIce);

      if (this.keyA.isUp && this.keyS.isUp && this.keyD.isUp && this.keyF.isUp) {
        this.block1.alpha = 0;
        this.block2.alpha = 0;
        this.block3.alpha = 0;
        this.block4.alpha = 0;
      }
      this.iceCubesStopped.forEach(this.maxIce);

      if (this.maxIceY <= 100) {
        mygame.win();
      } else if (this.score <= 0) {
        mygame.gameOver();
      }

      this.physics.arcade.collide(this.player, this.iceCubes, null, this.hitPaddle, this);
      this.physics.arcade.collide(this.iceCubesStopped, this.iceCubes, null, this.hitIce, this);

    }
  },

  spawn: function() {
    if (Math.random() > this.spawnRate) {

      var x = this.world.randomX;
      var y = -100;

      if (x < 200) {
        x = 50;
      } else if (x < 400) {
        x = 250;
      } else if (x < 600) {
        x = 450;
      } else {
        x = 650;
      }
      this.iceCubes.create(x, y, 'enemy');
    }
  },

  showSun: function() {

    this.sun1.alpha = 0;
    this.sun2.alpha = 0;
    this.sun3.alpha = 0;
    this.sun4.alpha = 0;

    var x = this.world.randomX;
    var y = 500;

    if (x < 200) {
      this.sun1.alpha = 1;
      this.sun = 1;
    } else if (x < 400) {
      this.sun2.alpha = 1;
      this.sun = 2;
    } else if (x < 600) {
      this.sun3.alpha = 1;
      this.sun = 3;
    } else {
      this.sun4.alpha = 1;
      this.sun = 4;
    }
    this.hasSun = true;
  },

  scoreUpdate: function() {
    this.score -= 100;

    this.scoreText.text = this.score;
    this.spawnRate *= .99;

  },

  restart: function() {
    this.time.events.start();
    this.game.state.restart();
  },

  moveIceLeft: function(current) {
    current.x -= 8;
  },

  moveIceRight: function(current) {
    current.x += 8;
  },

  hitPaddle: function(paddle, iceCube) {
    this.iceCubesStopped.create(iceCube.x, iceCube.y + 10, 'enemy');
    this.iceCubesStopped.setAll("body.velocity.y", 0);
    this.iceCubesStopped.setAll("body.allowGravity", false);
    this.iceCubesStopped.setAll("body.moves", false);
    this.iceCubesStopped.setAll("body.immovable", true);
    iceCube.destroy();
  },

  hitIce: function(icestoped, iceCube) {
    this.iceCubesStopped.create(iceCube.x, iceCube.y + 10, 'enemy');
    this.iceCubesStopped.setAll("body.velocity.y", 0);
    this.iceCubesStopped.setAll("body.allowGravity", false);
    this.iceCubesStopped.setAll("body.moves", false);
    this.iceCubesStopped.setAll("body.immovable", true);
    iceCube.destroy();
  },

  melt: function() {
    this.maxIceCopy = null;
    this.iceCubesStopped.forEach(this.maxIce);
    if (this.maxIceCopy != null) {
      this.maxIceCopy.destroy();
    }
  },

  outIce: function(current) {
    if (current.y > 600) {
      current.destroy();
      mygame.score -= 500;
      mygame.scoreText.text = mygame.score;
    }
  },

  maxIce: function(current) {
    mygame.maxIceY = 1000;
    if (current.y < mygame.maxIceY) {
      mygame.maxIceCopy = current;
      mygame.maxIceY = current.y;
    }
  },

  gameOver: function() {
    this.player.body.velocity.y = 0;
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

  win: function() {
    this.player.body.velocity.y = 0;
    this.playingG = false;

    var go = this.add.sprite(50, 100, 'winimage');
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
  }

};
