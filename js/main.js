var gameMain = function(game){
    musics = [];
    musicButtons = [];
    musicText = [];
    textsMusicText = [ // text for each music button
    	'Afro', 'Techno', 'March'
    ];
    
    MUSIC_BUTTONS_N = textsMusicText.length;
    
    theSound = null;
};

gameMain.prototype = {
    create: function(){
		loadSounds();

        bg = this.add.image(0, 0, 'bg');
        bg.alpha = 0.6;
        
        bgPink = this.add.image(0, 0, 'pink');
        bgPink.alpha = 0;
        
        sfxPeretz1 = game.add.audio('peretz');

    	soundButton = game.add.sprite(0, 0, 'button');
    	soundButton.scale.set(3, 3);
    	
    	soundButton.x = WIDTH / 2 - soundButton.width / 2;
    	soundButton.y = HEIGHT / 2 - soundButton.height / 2;
    	
    	soundButton.inputEnabled = true;
		soundButton.events.onInputDown.add(playSound, this);

    	text = game.add.text(0, 0, 'CONVERT NOW!', {
        	font: '28px', fill: 'white', align: 'center', stroke:'grey', strokeThickness: 1
   		});
   		
   		text.x = soundButton.x + soundButton.width / 2 - text.width / 2;
   		text.y = soundButton.y + soundButton.height / 2 - text.height / 2;
	    
        createMusicBtns();

		setTimeout(function(){
			try{
                StatusBar.hide;
            } catch(e){} 
	        try{
	            window.plugins.insomnia.keepAwake();
	        } catch(e){}   
		}, 2000);
		
		//initAd();
    }, 
    update: function(){

    }
};

function soundStopped(){
   soundButton.frame = 0;
   soundButton.tint = 0xffffff;
   
   text.font = '29px';
   text.fill = 'white';
   text.text = 'CONVERT NOW!';
   
   text.x = soundButton.x + soundButton.width / 2 - text.width / 2;
   text.y = soundButton.y + soundButton.height / 2 - text.height / 2;	
   
   	if (bgPink.alpha == 1){
		game.add.tween(bgPink).to( { alpha: 0 }, sfxPeretz1.durationMS, "Linear", true);
	}
	else if(bgPink.alpha == 0){
		game.add.tween(bgPink).to( { alpha: 1 }, sfxPeretz1.durationMS, "Linear", true);
	} 
}

function playSound(){
	sfxPeretz1.play();
	
	try{
		clearTimeout(stopSound);
	} catch(e){}
	
	soundButton.frame = 1;
    soundButton.tint = 0xe3dfff;
   
	
    text.font = '27px';
    text.fill = 'lightgrey';
    text.text = 'converting...';
	
	text.x = soundButton.x + soundButton.width / 2 - text.width / 2;
	text.y = soundButton.y + soundButton.height / 2 - text.height / 2;
	
	if (bgPink.alpha == 1){
		game.add.tween(bgPink).to( { alpha: 0 }, sfxPeretz1.durationMS, "Linear", true);
	}
	else if(bgPink.alpha == 0){
		game.add.tween(bgPink).to( { alpha: 1 }, sfxPeretz1.durationMS, "Linear", true);
	}
	
	stopSound = setTimeout(function(){
		soundStopped();
	}, sfxPeretz1.durationMS);
}

function playMusic(item){
	var place = musicButtons.indexOf(item);
	
	var sprite = musicButtons[place];
	var music = musics[place];
	
	if (!musics[place].isPlaying){
   	 	musics[place].play();
   	 	sprite.tint = 0xcc33ff;
   	 	
   	 	for (m=0; m<musics.length; m++){
   	 		if (musics[m].isPlaying && m != place){
   	 			musics[m].stop();
   	 			musicButtons[m].tint = 0xffffff;
   	 		}
   	 	}
    }
    else{
    	musics[place].stop();
    	sprite.tint = 0xffffff;
    }
}

function createMusicBtns(){
	musicBtnsGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
	
    for(m = 0; m < MUSIC_BUTTONS_N; m++){
    	musicButtons[m] = musicBtnsGroup.create(15 + (280 * m), 960, 'musicBtn');
    	musicButtons[m].alpha = 0.85;
    	musicButtons[m].inputEnabled = true;
    	musicButtons[m].scale.set(1, 0.8);

    	musicButtons[m].events.onInputDown.add(playMusic, this);        
    }
 
    for(t = 0; t < MUSIC_BUTTONS_N; t++){
    	musicText[t] = game.add.text(0, 0, textsMusicText[t], {
        	font: '56px ' + font, fill: 'maroon', align: 'center', stroke:'red', strokeThickness: 1
   		});
   		
   		musicText[t].x = musicButtons[t].x + musicButtons[t].width / 2 - musicText[t].width / 2;
   		musicText[t].y = musicButtons[t].y + musicButtons[t].height / 2 - musicText[t].height / 2 + 10;
    }
    
	musicAddText = game.add.text(145, 900, 'ADD CONVERSION MUSIC:', {
		font: '48px ' + font, fill: 'black', align: 'center', stroke:'white', strokeThickness: 3
	});
}

function loadSounds(){
    sfxMusic = game.add.audio('musicSfx', 0.7, true);
    sfxMusic2 = game.add.audio('musicSfx2', 0.7, true);
    sfxMusic3 = game.add.audio('musicSfx3', 0.7, true);
    
    musics = [sfxMusic, sfxMusic2, sfxMusic3];
}

function initAd(){
 	if(AdMob) AdMob.createBanner({
  	  	adId: 'ca-app-pub-9795366520625065/7045597764',
  	  	position: AdMob.AD_POSITION.TOP_CENTER,
  	  	autoShow: true
  	});
}
