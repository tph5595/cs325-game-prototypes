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
  this.playerRed = null;
  this.playerBlue = null;
  this.weaponRed = null;
  this.weaponBlue = null;
  this.cursors = null;
  this.fireButton = null;
  this.color = null;
  this.changeKey = null;
  this.score = null;
  this.scoreText = null;
  this.enemiesRed = null;
  this.enemiesBlue = null;
  this.enemyspeed = null;
  this.spawnRate = null;
  this.playingG = null;
  this.music = null;
  this.canChange = null;
  this.flipped = null;
  this.laser = null;
  this.canShoot = null;
};

BasicGame.Game.prototype = {

  create: function() {
    this.playingG = true;

    this.canShoot = true;

    mygame = this;

    this.music = this.add.audio('gameMusic');
    this.music.fadeIn(4000);

    this.laser = this.add.audio('laser');
    this.laser.volume = 0.2;

    this.canChange = true;
    this.add.sprite(0, 0, 'gameback');

    this.scoreText = this.add.text(60, 32, '0');
    this.scoreText.font = 'VT323';
    this.scoreText.fontSize = 30;
    this.scoreText.fill = "#ffffff";
    this.scoreText.align = "left";
    this.score = 0;

    this.flipped = false;

    //  Creates 30 bullets, using the 'bullet' graphic
    this.weaponRed = this.add.weapon(10, 'bullet-red');
    this.weaponBlue = this.add.weapon(10, 'bullet-blue');

    //  The bullet will be automatically killed when it leaves the world bounds
    this.weaponRed.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weaponBlue.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  The speed at which the bullet is fired
    this.weaponRed.bulletSpeed = 600;
    this.weaponBlue.bulletSpeed = 600;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.weaponRed.fireRate = 100;
    this.weaponBlue.fireRate = 100;

    this.playerRed = this.add.sprite(400, 300, 'player-red');
    this.playerBlue = this.add.sprite(400, 300, 'player-blue');

    this.playerRed.anchor.set(0.5);
    this.playerBlue.anchor.set(0.5);

    this.physics.arcade.enable(this.playerRed);
    this.physics.arcade.enable(this.playerBlue);

    this.playerRed.body.drag.set(200);
    this.playerRed.body.maxVelocity.set(200);

    this.playerBlue.body.drag.set(200);
    this.playerBlue.body.maxVelocity.set(200);

    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    this.weaponRed.trackSprite(this.playerRed, 0, 0, true);
    this.weaponBlue.trackSprite(this.playerBlue, 0, 0, true);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    this.changeKey = this.input.keyboard.addKey(Phaser.KeyCode.ENTER);

    this.color = 0;
    this.playerBlue.alpha = 0;
    this.weaponBlue.alpha = 0;

    this.time.events.loop(Phaser.Timer.SECOND / 5, this.spawn, this);

    this.enemiesRed = this.add.group();
    this.enemiesBlue = this.add.group();

    this.enemiesRed.enableBody = true;
    this.enemiesRed.physicsBodyType = Phaser.Physics.ARCADE;

    this.enemiesBlue.enableBody = true;
    this.enemiesBlue.physicsBodyType = Phaser.Physics.ARCADE;

    this.enemyspeed = 10000;

    this.spawnRate = 0.98;
  },

  update: function() {

    if (this.playingG === true) {

      if (this.cursors.up.isDown) {
        this.playerRed.y -= 4;
        this.playerBlue.y -= 4;
        this.playerRed.angle = 270;
        this.playerBlue.angle = 270;
        if (this.flipped === true) {
          this.flipped = false;
          this.playerRed.scale.y *= -1;
          this.playerBlue.scale.y *= -1;
        }
      } else if (this.cursors.left.isDown) {
        this.playerRed.x -= 4;
        this.playerBlue.x -= 4;
        this.playerRed.angle = 180;
        this.playerBlue.angle = 180;
        if (this.flipped === false) {
          this.playerRed.scale.y *= -1;
          this.playerBlue.scale.y *= -1;
          this.flipped = true;
        }
      } else if (this.cursors.right.isDown) {
        this.playerRed.x += 4;
        this.playerBlue.x += 4;
        this.playerRed.angle = 0;
        this.playerBlue.angle = 0;
        if (this.flipped === true) {
          this.flipped = false;
          this.playerRed.scale.y *= -1;
          this.playerBlue.scale.y *= -1;
        }
      } else if (this.cursors.down.isDown) {
        this.playerRed.body.y += 4;
        this.playerBlue.body.y += 4;
        this.playerRed.angle = 90;
        this.playerBlue.angle = 90;
        if (this.flipped === true) {
          this.flipped = false;
          this.playerRed.scale.y *= -1;
          this.playerBlue.scale.y *= -1;
        }
      }

      if (this.canShoot && this.fireButton.isDown) {
        if (this.color === 0) {
          this.weaponRed.fire();
        } else {
          this.weaponBlue.fire();
        }
        this.laser.play();
        this.canShoot = false;
      } else if (this.canShoot == false && this.fireButton.isUp) {
        this.canShoot = true;
      }

      if (this.canChange === true && this.changeKey.isDown) {
        if (this.color === 0) {
          this.playerRed.alpha = 0;
          this.weaponRed.alpha = 0;
          this.playerBlue.alpha = 1;
          this.weaponBlue.alpha = 1;
          this.color = 1;
        } else {
          this.playerRed.alpha = 1;
          this.weaponRed.alpha = 1;
          this.playerBlue.alpha = 0;
          this.weaponBlue.alpha = 0;
          this.color = 0;
        }
        this.canChange = false;
      } else if (this.changeKey.isUp) {
        this.canChange = true;
      }

      this.enemiesRed.forEach(this.moveEnemy);

      this.enemiesBlue.forEach(this.moveEnemy);

      this.world.wrap(this.playerRed, 16);
      this.world.wrap(this.playerBlue, 16);

      this.physics.arcade.overlap(this.weaponRed.bullets, this.enemiesRed, this.hitEnemy, null, this);
      this.physics.arcade.overlap(this.weaponBlue.bullets, this.enemiesBlue, this.hitEnemy, null, this);

      this.physics.arcade.overlap(this.playerRed, this.enemiesRed, this.gameOver, null, this);
      this.physics.arcade.overlap(this.playerRed, this.enemiesBlue, this.gameOver, null, this);
    }


  },

  spawn: function() {
    if (Math.random() > this.spawnRate) {

      var x = this.world.randomX;
      var y = this.world.randomY;

      var tooClose = 150;

      if (tooClose < Math.abs(this.playerRed.body.x - x)) {
        x += tooClose;
      }
      if (tooClose < Math.abs(this.playerRed.body.y - y)) {
        y += tooClose;
      }
      this.enemiesRed.create(x, y, 'enemy-red');
    } else if (Math.random() > this.spawnRate) {
      this.enemiesBlue.create(x, y, 'enemy-blue');
    }
  },

  hitEnemy: function(_weapon, _enemy) {

    _enemy.kill();

    this.score += 10;

    this.scoreText.text = this.score;

    this.spawnRate *= 0.99;

    if (this.spawnRate < 0.5) {
      this.spawnRate = 0.5
    }

    console.log(this.spawnRate);

  },

  moveEnemy: function(enemy) {
    mygame.physics.arcade.moveToObject(enemy, mygame.playerRed, 1, mygame.enemyspeed);
  },

  stopEnemy: function(enemy) {
    enemy.body.velocity.x = 0;
    enemy.body.velocity.y = 0;
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

    this.enemiesRed.forEach(this.stopEnemy);
    this.enemiesBlue.forEach(this.stopEnemy);
    this.music.fadeOut(1000);

    var butt = this.add.button(this.world.centerX - 95, 450, 'restartButton', this.restart, this, 2, 1, 0);

    butt.alpha = 0;

    this.add.tween(butt).to({
      alpha: 1
    }, 1000, "Linear", true, 2000);
  }

};
