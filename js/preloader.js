var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
    	progressTxt = this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '0%',{
             font: '25px', fill: 'white', fontWeight: 'normal', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);
  
        loadingTxt = this.add.text(this.game.world.centerX - 37,  this.game.world.centerY - 150, "Loading...", {
            font: '18px', fill: 'lightgrey', fontWeight: 'normal', align: 'center'
        });
        
        this.game.load.image("bg", "assets/bibi/images/peretz.jpg");
        this.game.load.spritesheet("button", "assets/bibi/images/button.png", 240/2, 130);
        this.game.load.image("musicBtn", "assets/bibi/images/musicBtn.png");
        this.game.load.image("pink", "assets/bibi/images/pink.jpg");

        this.game.load.audio('peretz', 'assets/bibi/audio/peretz.mp3');

        this.game.load.audio('musicSfx', 'assets/bibi/audio/music1.ogg');
        this.game.load.audio('musicSfx2', 'assets/bibi/audio/music2.ogg');
        this.game.load.audio('musicSfx3', 'assets/bibi/audio/music3.ogg');
    },
    
    create: function(){
        this.game.state.start("Game"); 
    }
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text = progress+"%";
};