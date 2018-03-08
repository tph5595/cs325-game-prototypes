"use strict";

var mygame = null;

BasicGame.Game = function(game) {
  this.player = null;
  this.cursors = null;
  this.askButton = null;
  this.serveButton = null;
  this.getButton = null;
  this.score = null;
  this.scoreText = null;
  this.enemies = null;
  this.enemyspeed = null;
  this.spawnRate = null;
  this.playingG = null;
  this.music = null;
  this.canChange = null;
  this.flipped = null;
  this.cust1 = null;
  this.cust2 = null;
  this.cust3 = null;
  this.cust4 = null;
  this.Pkey = null;
  this.Bkey = null;
  this.Skey = null;
  this.Rkey = null;
  this.w1 = null;
  this.w2 = null;
  this.w3 = null;
  this.w4 = null;
  this.type1 = null;
  this.type2 = null;
  this.type3 = null;
  this.type4 = null;
  this.whas = null;
  this.timer = null;
  this.timerTime = null;
  this.keyvalue = -1;
  this.eatingSound = null;
  this.cookingSound = null;
  this.thankyouSound = null;
};

BasicGame.Game.prototype = {

  create: function() {
    this.playingG = true;

    this.canShoot = true;

    mygame = this;

    this.music = this.add.audio('gameMusic');
    this.music.fadeIn(4000);

    this.thankyouSound = this.add.audio('thankyou');
    this.eatingSound = this.add.audio('eating');
    this.cookingSound = this.add.audio('cooking');

    this.canChange = true;
    this.add.sprite(0, 0, 'gameback');

    this.scoreText = this.add.text(600, 510, 'Tips: $0.00');
    this.scoreText.font = 'VT323';
    this.scoreText.fontSize = 30;
    this.scoreText.fill = "#ffffff";
    this.scoreText.align = "left";
    this.score = 0;

    this.timer = this.add.text(20, 510, 'Time till close:\n 100 minutes');
    this.timer.font = 'VT323';
    this.timer.fontSize = 30;
    this.timer.fill = "#ffffff";
    this.timer.align = "left";
    this.timerTime = 100;

    this.flipped = false;

    this.player = this.add.sprite(400, 70, 'player');

    this.w1 = this.add.sprite(300, 70, 'pizza');
    this.w2 = this.add.sprite(300, 70, 'bread');
    this.w3 = this.add.sprite(300, 70, 'sandwich');
    this.w4 = this.add.sprite(300, 70, 'roll');

    this.cust1 = this.add.sprite(400, 20, 'cust');
    this.cust2 = this.add.sprite(265, 20, 'cust');
    this.cust3 = this.add.sprite(130, 20, 'cust');
    this.cust4 = this.add.sprite(0, 20, 'cust');

    this.cust1.alpha = 0;
    this.cust2.alpha = 0;
    this.cust3.alpha = 0;
    this.cust4.alpha = 0;

    this.w1.alpha = 0;
    this.w2.alpha = 0;
    this.w3.alpha = 0;
    this.w4.alpha = 0;

    this.player.anchor.set(0.5);

    this.physics.arcade.enable(this.player);

    this.player.body.drag.set(200);
    this.player.body.maxVelocity.set(200);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.askButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    this.serveButton = this.input.keyboard.addKey(Phaser.KeyCode.ENTER);

    this.Pkey = this.input.keyboard.addKey(Phaser.KeyCode.P); // 1
    this.Ikey = this.input.keyboard.addKey(Phaser.KeyCode.I); // 2
    this.Zkey = this.input.keyboard.addKey(Phaser.KeyCode.Z); // 3, 4
    this.Akey = this.input.keyboard.addKey(Phaser.KeyCode.A); // 5

    this.Bkey = this.input.keyboard.addKey(Phaser.KeyCode.B); // 7
    this.Rkey = this.input.keyboard.addKey(Phaser.KeyCode.R); // 8
    this.Ekey = this.input.keyboard.addKey(Phaser.KeyCode.E); // 9
    this.Akey = this.input.keyboard.addKey(Phaser.KeyCode.A); // 10
    this.Dkey = this.input.keyboard.addKey(Phaser.KeyCode.D); // 11

    this.Skey = this.input.keyboard.addKey(Phaser.KeyCode.S); // 13
    // 14
    this.Nkey = this.input.keyboard.addKey(Phaser.KeyCode.N); // 15
    // 16
    this.Wkey = this.input.keyboard.addKey(Phaser.KeyCode.W); // 17
    // 18
    this.Ckey = this.input.keyboard.addKey(Phaser.KeyCode.C); // 19
    this.Hkey = this.input.keyboard.addKey(Phaser.KeyCode.H); // 20

    // 22
    this.Okey = this.input.keyboard.addKey(Phaser.KeyCode.O); // 23
    this.Lkey = this.input.keyboard.addKey(Phaser.KeyCode.L); // 24, 25

    this.time.events.loop(Phaser.Timer.SECOND * 2, this.spawn, this);
    this.time.events.loop(Phaser.Timer.SECOND, this.timerUpdate, this);

    this.enemies = this.add.group();

    this.enemies.enableBody = true;
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE;

    this.enemyspeed = 10000;

    this.spawnRate = 0.333;

    this.x4 = 50;
    this.y4 = 300;

    this.x3 = 130;
    this.y3 = 300;

    this.x2 = 265;
    this.y2 = 300;

    this.x1 = 400;
    this.y1 = 300;

    this.done1 = true;
    this.done2 = true;
    this.done3 = true;
    this.done4 = true;

    this.whas = -1;
  },

  update: function() {

    if (this.playingG === true) {
      if (this.cursors.left.isDown) {
        this.player.x -= 4;
        this.w1.x = this.player.x + 30;
        this.w2.x = this.player.x + 30;
        this.w3.x = this.player.x + 30;
        this.w4.x = this.player.x + 30;
        this.player.angle = 180;
        if (this.flipped === false) {
          this.player.scale.y *= -1;
          this.flipped = true;
        }
      } else if (this.cursors.right.isDown) {
        this.player.x += 4;
        this.w1.x = this.player.x - 100;
        this.w2.x = this.player.x - 100;
        this.w3.x = this.player.x - 100;
        this.w4.x = this.player.x - 100;
        this.player.angle = 0;
        if (this.flipped === true) {
          this.flipped = false;
          this.player.scale.y *= -1;
        }
      }

      if (this.player.x < 100) {
        this.player.x = 100;
        this.w1.x = 100;
        this.w2.x = 100;
        this.w3.x = 100;
        this.w4.x = 100;
      }

      if (this.player.x > 700) {
        this.player.x = 700;
        this.w1.x = 700;
        this.w2.x = 700;
        this.w3.x = 700;
        this.w4.x = 700;
      }

      if (this.player.x > 420) {
        //======================================================================
        if (this.Pkey.isDown) {
          this.keyvalue = 1;
        } else if (this.Ikey.isDown && this.keyvalue == 1) {
          this.keyvalue = 2;
        } else if (this.Zkey.isDown && this.keyvalue == 2) {
          this.keyvalue = 3;
        } else if (this.Zkey.isDown && this.keyvalue == 3) {
          this.keyvalue = 4;
        } else if (this.Akey.isDown && this.keyvalue == 4) {
          this.keyvalue = 5;
        }
        //======================================================================
        else if (this.Bkey.isDown) {
          this.keyvalue = 7;
        } else if (this.Rkey.isDown && this.keyvalue == 7) {
          this.keyvalue = 8;
        } else if (this.Ekey.isDown && this.keyvalue == 8) {
          this.keyvalue = 9;
        } else if (this.Akey.isDown && this.keyvalue == 9) {
          this.keyvalue = 10;
        } else if (this.Dkey.isDown && this.keyvalue == 10) {
          this.keyvalue = 11;
        }
        //======================================================================
        else if (this.Skey.isDown) {
          this.keyvalue = 13;
        } else if (this.Akey.isDown && this.keyvalue == 13) {
          this.keyvalue = 14;
        } else if (this.Nkey.isDown && this.keyvalue == 14) {
          this.keyvalue = 15;
        } else if (this.Dkey.isDown && this.keyvalue == 15) {
          this.keyvalue = 16;
        } else if (this.Wkey.isDown && this.keyvalue == 16) {
          this.keyvalue = 17;
        } else if (this.Ikey.isDown && this.keyvalue == 17) {
          this.keyvalue = 18;
        } else if (this.Ckey.isDown && this.keyvalue == 18) {
          this.keyvalue = 19;
        } else if (this.Hkey.isDown && this.keyvalue == 19) {
          this.keyvalue = 20;
        }
        //======================================================================
        else if (this.Rkey.isDown && this.keyvalue != 8) {
          this.keyvalue = 22;
        } else if (this.Okey.isDown && this.keyvalue == 22) {
          this.keyvalue = 23;
        } else if (this.Lkey.isDown && this.keyvalue == 23) {
          this.keyvalue = 24;
        } else if (this.Lkey.isDown && this.keyvalue == 24) {
          this.keyvalue = 25;
        }
        //======================================================================

        console.log(this.keyvalue);

        if (this.keyvalue == 5) {
          this.showIt(1);
        } else if (this.keyvalue == 11) {
          this.showIt(2);
        } else if (this.keyvalue == 20) {
          this.showIt(3);
        } else if (this.keyvalue == 25) {
          this.showIt(4);
        }
      }

      if (this.askButton.isDown) {
        this.askClosest();
      } else {
        if (this.food1 != null) {
          this.food1.alpha = 0;
        }
        if (this.food2 != null) {
          this.food2.alpha = 0;
        }
        if (this.food3 != null) {
          this.food3.alpha = 0;
        }
        if (this.food4 != null) {
          this.food4.alpha = 0;
        }
      }

      if (this.serveButton.isDown) {
        this.serveClosest();
      }


      this.enemies.forEach(this.moveEnemy);

      this.physics.arcade.overlap(this.player, this.enemies, this.gameOver, null, this);
    }


  },

  spawn: function() {
    if (Math.random() < this.spawnRate) {
      var num = Math.random() * 4;

      if (num < 1 && this.cust1.alpha != 1) {
        this.cust1.alpha = 1;
        this.done1 = false;
      } else if (num < 2 && this.cust2.alpha != 1) {
        this.cust2.alpha = 1;
        this.done2 = false;
      } else if (num < 3 && this.cust3.alpha != 1) {
        this.cust3.alpha = 1;
        this.done3 = false;
      } else if (this.cust4.alpha != 1) {
        this.cust4.alpha = 1;
        this.done4 = false;
      }
    }
  },

  serveClosest: function() {
    if (this.whas == this.closestFood()) {
      this.killClosest();
      this.score += 10;
      this.scoreText.text = "Tips: $" + this.score + ".00";
      this.whas = 0;
      this.w1.alpha = 0;
      this.w2.alpha = 0;
      this.w3.alpha = 0;
      this.w4.alpha = 0;
      if (Math.random() > 0.5) {
        this.thankyouSound.play();
      } else {
        this.eatingSound.play();
      }
    }
  },

  killClosest: function() {
    var num = this.closest();
    console.log("kill: " + num);
    this.keyvalue = -1;

    if (num == 1) {
      this.cust1.alpha = 0;
      this.done1 = true;
      if (this.food1 != null) {
        this.food1.alpha = 0;
      }
      this.food1 = null;
      this.type1 = -1;
    }
    if (num == 2) {
      this.cust2.alpha = 0;
      this.done2 = true;
      if (this.food2 != null) {
        this.food2.alpha = 0;
      }
      this.food2 = null;
      this.type2 = -1;
    }
    if (num == 3) {
      this.cust3.alpha = 0;
      this.done3 = true;
      if (this.food3 != null) {
        this.food3.alpha = 0;
      }
      this.food3 = null;
      this.type3 = -1;
    }
    if (num == 4) {
      this.cust4.alpha = 0;
      this.done4 = true;
      if (this.food4 != null) {
        this.food4.alpha = 0;
      }
      this.food4 = null;
      this.type4 = -1;
    }
  },

  closestFood: function() {
    var num = this.closest();

    if (num == 1) {
      return this.type1;
    }
    if (num == 2) {
      return this.type2;
    }
    if (num == 3) {
      return this.type3;
    }
    if (num == 4) {
      return this.type4;
    }
  },

  timerUpdate: function() {
    this.timerTime -= 1;
    this.timer.text = "Time till close:\n " + this.timerTime + " minutes";
    if (this.timerTime == 0) {
      this.gameOver();
    }
  },

  closest: function() {
    var num = -1;
    var dist = 999;
    if (Math.abs((this.cust1.x + 50) - this.player.x) < dist) {
      dist = Math.abs((this.cust1.x + 50) - this.player.x);
      num = 1;
    }

    if (Math.abs((this.cust2.x + 50) - this.player.x) < dist) {
      dist = Math.abs((this.cust2.x + 50) - this.player.x);
      num = 2;
    }

    if (Math.abs((this.cust3.x + 50) - this.player.x) < dist) {
      dist = Math.abs((this.cust3.x + 50) - this.player.x);
      num = 3;
    }

    if (Math.abs((this.cust4.x + 50) - this.player.x) < dist) {
      dist = Math.abs((this.cust4.x + 50) - this.player.x);
      num = 4;
    }

    return num;
  },

  askClosest: function() {
    var num = this.closest();

    if ((num == 1 && this.done1) || (num == 2 && this.done2) || (num == 3 && this.done3) || (num == 4 && this.done4)) {
      console.log("already showing");
      if (num == 1 && this.food1 != null) {
        this.food1.alpha = 1;
      }
      if (num == 2 && this.food2 != null) {
        this.food2.alpha = 1;
      }
      if (num == 3 && this.food3 != null) {
        this.food3.alpha = 1;
      }
      if (num == 4 && this.food4 != null) {
        this.food4.alpha = 1;
      }
    } else if (num == 1) {
      this.done1 = true;
      this.showRand(num, this.x1, this.y1);
    } else if (num == 2) {
      this.done2 = true;
      this.showRand(num, this.x2, this.y2);
    } else if (num == 3) {
      this.done3 = true;
      this.showRand(num, this.x3, this.y3);
    } else if (num == 4) {
      this.done4 = true;
      this.showRand(num, this.x4, this.y4);
    }
  },

  showRand: function(num, x, y) {
    console.log("making food");
    var food = Math.random() * 4;
    var tmp;
    var type;

    if (food < 1) {
      tmp = this.add.sprite(x, y, 'pizza');
      type = 1;
    } else if (food < 2) {
      tmp = this.add.sprite(x, y, 'bread');
      type = 2;
    } else if (food < 3) {
      tmp = this.add.sprite(x, y, 'sandwich');
      type = 3;
    } else if (food < 4) {
      tmp = this.add.sprite(x, y, 'roll');
      type = 4;
    }

    if (num == 1) {
      this.food1 = tmp;
      this.type1 = type;
    } else if (num == 2) {
      this.food2 = tmp;
      this.type2 = type;
    } else if (num == 3) {
      this.food3 = tmp;
      this.type3 = type;
    } else {
      this.food4 = tmp;
      this.type4 = type;
    }
  },

  showIt: function(num) {
    this.keyvalue = -1;
    this.cookingSound.play();
    this.w1.alpha = 0;
    this.w2.alpha = 0;
    this.w3.alpha = 0;
    this.w4.alpha = 0;
    if (num == 1) {
      this.w1.alpha = 1;
      this.whas = 1;
    } else if (num == 2) {
      this.w2.alpha = 1;
      this.whas = 2;
    } else if (num == 3) {
      this.w3.alpha = 1;
      this.whas = 3;
    } else if (num == 4) {
      this.w4.alpha = 1;
      this.whas = 4;
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
    this.timer.alpha = 0;

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
