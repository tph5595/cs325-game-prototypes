"use strict";

var mygame = null;

BasicGame.Game = function(game) {

  //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
  /*
  this.game;      //  a reference to the currently running game (Phaser.Game)
  this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
  this.camera;    //  a reference to the game camera (Phaser.Camera)
  this.cache;     //  the game cache (Phaser.Cache)
  this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
  this.load;      //  for preloading assets (Phaser.Loader)
  this.math;      //  lots of useful common math operations (Phaser.Math)
  this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
  this.stage;     //  the game stage (Phaser.Stage)
  this.time;      //  the clock (Phaser.Time)
  this.tweens;    //  the tween manager (Phaser.TweenManager)
  this.state;     //  the state manager (Phaser.StateManager)
  this.world;     //  the game world (Phaser.World)
  this.particles; //  the particle manager (Phaser.Particles)
  this.physics;   //  the physics manager (Phaser.Physics)
  this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

  //  You can use any of these from any function within this State.
  //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
  */

  // For optional clarity, you can initialize
  // member variables here. Otherwise, you will do it in create().
  this.player = null;
  this.cursors = null;
  this.jumpbutton = null;
  this.score = null;
  this.scoreText = null;
  this.enemies = null;
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
};

BasicGame.Game.prototype = {

  create: function() {
    this.canspin = true;
    this.backflip = false;

    this.back = this.add.sprite(0, 0, 'titlePage');
    this.back.width = 800;
    this.back.height = 600;
    this.back.x = 400;
    this.back.y = 300;
    this.back.anchor.setTo(0.5, 0.5);

    this.playingG = true;

    this.canjump = true;

    mygame = this;

    this.music = this.add.audio('gameMusic');
    this.music.fadeIn(4000);

    this.jump = this.add.audio('jump');
    this.tone = this.add.audio('tone');

    this.border = this.add.sprite(0, 0, 'gameback');
    this.border.x = 400;
    this.border.y = 300;
    this.border.anchor.setTo(0.5, 0.5);

    this.scoreText = this.add.text(60, 32, '0');
    this.scoreText.font = 'VT323';
    this.scoreText.fontSize = 30;
    this.scoreText.fill = "#ffffff";
    this.scoreText.align = "left";
    this.score = 0;

    this.flipped = false;
    this.floor = 540;

    this.player = this.add.sprite(400, 300, 'player-red');
    this.player.y = this.floor;

    this.player.anchor.set(0.5);

    this.physics.arcade.enable(this.player);

    this.player.body.drag.set(750);
    this.player.body.maxVelocity.set(800);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.jumpbutton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    this.keyW = this.input.keyboard.addKey(Phaser.KeyCode.W);
    this.keyA = this.input.keyboard.addKey(Phaser.KeyCode.A);
    this.keyS = this.input.keyboard.addKey(Phaser.KeyCode.S);
    this.keyD = this.input.keyboard.addKey(Phaser.KeyCode.D);

    this.time.events.loop(Phaser.Timer.SECOND, this.scoreUp, this);

    this.time.events.loop(Phaser.Timer.SECOND / 5, this.spawn, this);
    this.time.events.loop(Phaser.Timer.SECOND, this.moveEm, this);

    this.enemies = this.add.group();

    this.enemies.enableBody = true;
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE;

    this.enemyspeed = 10000;

    this.spawnRate = 0.99;


    this.player.body.collideWorldBounds = true;
    this.setupspin = false;
    this.spinning = false;

    //this.player.body.setSize();
  },

  update: function() {

    if (this.playingG === true) {

      if (this.cursors.left.isDown && this.player.x > 50) {
        this.player.x -= 8;
        this.player.angle = 180;
        if (this.flipped === false) {
          this.player.scale.y *= -1;

          this.flipped = true;
        }
      } else if (this.cursors.right.isDown && this.player.x < 750) {
        this.player.x += 8;
        this.player.angle = 0;
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

      if (this.player.body.velocity.y >= 0 && this.player.y != this.floor) {
        this.player.body.velocity.y += 30;
      }

      if (this.canjump && this.jumpbutton.isDown) {
        this.jumping = true;
        this.player.body.velocity.y = -500;
        this.jump.play();
        this.canjump = false;
      } else if (this.canjump == false && this.jumpbutton.isUp && this.player.y >= this.floor) {
        this.canjump = true;
        this.player.body.velocity.y = 0;
        this.player.y = this.floor;
      }

      if (this.player.y > this.floor) {
        this.player.y = this.floor;
        this.player.body.velocity.y = 0;
      }

      if (this.keyA.isDown || this.keyW.isDown || this.keyD.isDown) {

        this.spinning = true;
        this.playingG = false;
        this.start = 0;
        this.enemies.forEach(this.stopEnemy);
        this.enemies.forEach(this.spinEnemy);


        if (this.keyW.isDown && this.canspin) {
          this.turn = 2;
        } else if (this.keyA.isDown && this.canspin) {
          this.turn = 1;
        } else if (this.keyD.isDown && this.canspin) {
          this.turn = 3;
        }
        this.canspin = false;

        if (this.turn == 1 || this.turn == 3) {
          if (this.backflip) {
            mygame.add.tween(this.border).to({
              width: 800,
              height: 600
            }, 1500, "Linear", true, 0);
            mygame.add.tween(this.back).to({
              width: 800,
              height: 600
            }, 1500, "Linear", true, 0);
            this.backflip = false;;
          } else {
            mygame.add.tween(this.border).to({
              width: 600,
              height: 800
            }, 1500, "Linear", true, 0);
            mygame.add.tween(this.back).to({
              width: 600,
              height: 800
            }, 1500, "Linear", true, 0);
            this.backflip = true;
          }
        }
      }

      if (this.keyW.isUp && this.keyA.isUp && this.keyD.isUp) {
        this.canspin = true;
      }

      for (var i = 0; i < this.enemies.length; i++) {
        this.enemies[i];
      }


      this.physics.arcade.overlap(this.player, this.enemies, this.gameOver, null, this);

    } else if (this.spinning == true) {
      if (this.turn == 1) {
        this.border.angle -= 1;
        this.back.angle -= 1;
        this.start++;
        if (this.start == 90) {
          this.spinning = false;
          this.playingG = true;
        }
      } else if (this.turn == 2) {
        this.border.angle += 1;
        this.back.angle += 1;
        this.start++;
        if (this.start == 180) {
          this.spinning = false;
          this.playingG = true;
        }
      } else if (this.turn == 3) {
        this.border.angle += 1;
        this.back.angle += 1;
        this.start++;
        if (this.start == 90) {
          this.spinning = false;
          this.playingG = true;
        }
      }
    }


  },

  spawn: function() {
    if (Math.random() > this.spawnRate) {

      var x = this.world.randomX;
      var y = this.world.randomY / 2;

      var tooClose = 150;

      if (tooClose < Math.abs(this.player.body.x - x)) {
        x += tooClose;
      }
      if (tooClose < Math.abs(this.player.body.y - y)) {
        y += tooClose;
      }
      this.enemies.create(x, y, 'enemy');
    }
  },

  scoreUp: function() {
    this.score += 10;

    this.scoreText.text = this.score;

    this.spawnRate *= 0.99;

    if (this.spawnRate < 0.5) {
      this.spawnRate = 0.5
    }

    console.log(this.spawnRate);

  },

  moveEnemy: function(enemy) {
    mygame.physics.arcade.moveToObject(enemy, mygame.player, 1, mygame.enemyspeed);
    if (Math.random() < 0.25) {
      mygame.tone.play();
      enemy.body.velocity.y *= 5;
      enemy.body.velocity.x *= 5;
    } else {
      enemy.body.velocity.y *= 0;
      enemy.body.velocity.x *= 0;
    }

  },

  moveEm: function() {
    this.enemies.forEach(this.moveEnemy);
  },

  stopEnemy: function(enemy) {
    enemy.body.velocity.x = 0;
    enemy.body.velocity.y = 0;
  },

  spinEnemy: function(enemy) {
    if (mygame.turn == 1) {
      var tmp = enemy.body.x;
      mygame.add.tween(enemy).to({
        x: ((enemy.body.y) / 600.0) * 800,
        y: ((800 - tmp) / 800.0) * 600
      }, 1500, "Linear", true, 0);
    } else if (mygame.turn == 2) {
      mygame.add.tween(enemy).to({
        x: 800 - enemy.body.x,
        y: 600 - enemy.body.y
      }, 3000, "Linear", true, 0);
    } else if (mygame.turn == 3) {
      var tmp = enemy.body.x;
      mygame.add.tween(enemy).to({
        x: ((600 - enemy.body.y) / 600.0) * 800,
        y: ((tmp) / 800.0) * 600
      }, 1500, "Linear", true, 0);
    }
  },

  restart: function() {
    this.time.events.start();
    this.game.state.restart();
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

    this.enemies.forEach(this.stopEnemy);
    this.music.fadeOut(1000);

    var butt = this.add.button(this.world.centerX - 95, 450, 'restartButton', this.restart, this, 2, 1, 0);

    butt.alpha = 0;

    this.add.tween(butt).to({
      alpha: 1
    }, 1000, "Linear", true, 2000);
  }

};
