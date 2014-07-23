var game = new Phaser.Game(400, 600, Phaser.AUTO, "");
// Basic pre game state
var mainState = {
    preload: function(){
    },
    create: function(){
    },
    update: function(){},  
};
// Create the main game state
var mainMenu = {    
    
    
    preload: function () {
        game.load.image('ball', 'assets/ball.png')
        
        for(var i=1; i <=5; i++){
            game.load.image('ball'+i, 'assets/'+i+'.png');
        }
      game.load.image('strt', 'assets/bnt_start.png');  
    },
    
    
    
    create: function () { 
        //  Set the background colour
        game.stage.backgroundColor = '#000'
        
        this.poggles = game.add.group();
        
        this.poggles.createMultiple(4, 'ball'+1);
        this.poggles.createMultiple(4, 'ball'+2);
        this.poggles.createMultiple(4, 'ball'+3);
        this.poggles.createMultiple(4, 'ball'+4);
        this.poggles.createMultiple(4, 'ball'+5);
        
       game.time.events.loop(800, this.addPoggle, this);
        
                this.btnStart = game.add.button(
            game.world.centerX, 
            game.world.centerY, 
            'strt', 
            function(){
                game.state.start('mainState');
            });
        this.btnStart.anchor.setTo(0.5);
        this.btnStart.scale.setTo(1,1);
        game.add.tween(this.btnStart.scale).to({ x: 1.04, y: 1.04 }, 1000, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);
       /* // Randomly create a cirlce
       
       this was the test circle
       
        this.ball = game.add.sprite(this.rndPoint(game.world.width-16), this.rndPoint(game.world.height-16), 'ball', 0, false);
        this.ball.anchor.setTo(0.5);
        this.ball.alpha = 0;
        game.add.tween(this.ball).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 0, true);*/
    },
    
    
    
    update: function () {},    
    
    
    rndPoint: function(max){
        var min= 16;
        return Math.random() * (max-min)+ min;
    },
    
    
    
    addPoggle: function(){
        var poggle = this.poggles.getRandom();
        // fade in timer for each circle. 
        var fader = 8000;
        
        if(poggle.alive){
            poggle = this.poggles.getFirstDead();
        }else if(!poggle){
            return;
        }
        
        poggle.scale.setTo(0.1);
        poggle.anchor.setTo(0.5);
        poggle.reset(this.rndPoint(game.world.width-16), this.rndPoint(game.world.height-16));
        poggle.alpha = 0;
        game.add.tween(poggle).to({alpha: 0.85}, fader/2, Phaser.Easing.Linear.None, true, 0, 0, true);
        
        game.time.events.add(fader+10, function(){
                                poggle.kill();
                            }, poggle);
        
        
        
    },
};
game.state.add('mainState', mainState);
game.state.add('mainMenu', mainMenu);
game.state.start('mainMenu');