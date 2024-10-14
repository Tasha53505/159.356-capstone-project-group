// IMAGE CODE
var infoPanelBtn = document.querySelector('.infoPanelBtn');
var infoPanel = document.querySelector('.infoPanel');
var artistPanel = document.querySelector('.infoArtistPanel');
var coverDisplay = document.querySelector('.album');
var artist = true;


// Cover -> Artist -> Cover...
document.querySelector('.album').addEventListener('click', function() {
    if(artist){
        artist = false;
    } else {
        artist = true;
    }
    console.log('artist: ', artist);
    let album = this;
    album.classList.toggle('circle');
    album.style.transform = 'scale(1.1)';
    setTimeout(function(){
        album.style.transform = 'scale(1)';
    }, 200)

    if((artistPanel.classList.contains('active')) || (infoPanel.classList.contains('active'))) {
        artistPanel.classList.toggle('active');
        infoPanel.classList.toggle('active');

    }
});


// ----------------------------------------- //

// -- PROGRESS BAR -- 

new SqueezeJS.UI.PlaytimeProgress('ctrlProgress');
new SqueezeJS.UI.Playtime('ctrlPlaytime');
new SqueezeJS.UI.PlaytimeRemaining('ctrlRemainingTime');


// -- PLAYBACK BUTTONS --

// Actual buttons
new SqueezeJS.UI.Buttons.Rew({ // Rewind
    renderTo: 'prevButton',
    noText: true,
});
new SqueezeJS.UI.Buttons.Fwd({ // Forward
    renderTo: 'nextButton',
    noText: true,
});
var shuffle = new SqueezeJS.UI.Buttons.Shuffle({ // Shuffle
    renderTo: 'shuffleButton',
    noText: true
});

var repeat = new SqueezeJS.UI.Buttons.Repeat({ // Repeat
    renderTo: 'repeatButton',
    noText: true
});

var playPause = document.getElementById("playPause");
var repeatDisplay = document.getElementById("repeatButton");
var shuffleDisplay = document.getElementById("shuffleButton");

function animateButton(button){
    button.classList.add('animatePlay');
    setTimeout(function(){
        button.classList.remove('animatePlay');
    }, 150);
}

// Update play button
function playClicked(){
    SqueezeJS.Controller.togglePause();
    if(SqueezeJS.Controller.isPlaying()){
        console.log("pausing")
        playPause.classList.add('playButton');
        playPause.classList.remove('pauseButton');
    } else {
        console.log("playing")
        playPause.classList.remove('playButton');
        playPause.classList.add('pauseButton');
    }
}

// Function to update the state of the button
function updatePlay(){
    if(SqueezeJS.Controller.isPlaying()){
        console.log("playing");
        if(playPause.classList.contains('playButton')){
            playPause.classList.remove('playButton');
        }
        if(!playPause.classList.contains('pauseButton')){
            playPause.classList.add('pauseButton');
        }
    } else {
        console.log("paused");
        if(playPause.classList.contains('pauseButton')){
            playPause.classList.remove('pauseButton');
        }
        if(!playPause.classList.contains('playButton')){
            playPause.classList.add('playButton');
        }
    }
}

// Updates play button after reload
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(updatePlay, 200);
    setTimeout(updateRepeatState, 200);
});

// Update play button when clicked
document.getElementById('playPause').addEventListener('click', function(){
    animateButton(playPause);
    playClicked();
});

// -- REPEAT -- //
function updateRepeatState(){
    console.log("Repeat: " + repeat.state);
    if(repeat.state == 0){
        // No repeat
        repeatDisplay.classList.add('repeatButtonInactive');
        repeatDisplay.classList.remove('repeatButtonActiveSong');
        repeatDisplay.classList.remove('repeatButtonActivePlaylist');
    } else if(repeat.state == 1){
        // Repeat song
        repeatDisplay.classList.remove('repeatButtonInactive');
        repeatDisplay.classList.add('repeatButtonActiveSong');
        repeatDisplay.classList.remove('repeatButtonActivePlaylist');
    } else if (repeat.state == 2){
        // Repeat playlist
        repeatDisplay.classList.remove('repeatButtonInactive');
        repeatDisplay.classList.remove('repeatButtonActiveSong');
        repeatDisplay.classList.add('repeatButtonActivePlaylist');
    }
}

// Update repeat button
document.getElementById('repeatButton').addEventListener('click', function(){
    animateButton(this);
    setTimeout(updateRepeatState, 200);
});

// Previous and Next
document.getElementById('prevButton').addEventListener('click', function(){
    console.log("previous");
    animateButton(this);
    setTimeout(updatePlay, 200);
});
document.getElementById('nextButton').addEventListener('click', function(){
    console.log("next");
    animateButton(this);
    setTimeout(updatePlay, 200);
});

// -- SHUFFLE -- //
function updateShuffleState(){
    console.log("Shuffle: " + shuffle.state);
    if(shuffle.state == 0){
        // No shuffle
        shuffleDisplay.classList.add('shuffleButtonInactive');
        shuffleDisplay.classList.remove('shuffleButtonSong');
        shuffleDisplay.classList.remove('shuffleButtonPlaylist');
    } else if(shuffle.state == 1){
        // Shuffle song
        shuffleDisplay.classList.remove('shuffleButtonInactive');
        shuffleDisplay.classList.add('shuffleButtonSong');
        shuffleDisplay.classList.remove('shuffleButtonPlaylist');
    } else if (shuffle.state == 2){
        // Shuffle playlist
        shuffleDisplay.classList.remove('shuffleButtonInactive');
        shuffleDisplay.classList.remove('shuffleButtonSong');
        shuffleDisplay.classList.add('shuffleButtonPlaylist');
    }
}

// Update shuffle button
document.getElementById('shuffleButton').addEventListener('click', function(){
    animateButton(this);
    setTimeout(updateShuffleState, 200);
});

// Event listener for slider
const value = document.querySelector("#value");
const input = document.querySelector("#pi_input");
value.textContent = input.value;
input.addEventListener("input", (event) => {
  value.textContent = event.target.value;
});


// ----------------------------------------- //



// STEVES CODE
infoPanelBtn.addEventListener('click', function () {
    if (!infoPanelBtn.classList.contains('active')){
        // hide left bar
        let overallPlaylistContainer = document.querySelector('.overallPlaylistContainer');
        let animationBtn = document.querySelector('.animationBtn');
        let overallContainer = document.querySelector('.overallContainer');
        overallPlaylistContainer.classList.add('hidden');
        animationBtn.classList.add('hidden');
        setTimeout(function() {
            overallContainer.style.display = 'none';
        }, 500); // Wait for the animation to finish before hiding
    
        // hide bottom bar
        let MusiclistContainer = document.querySelector('.MusiclistContainer');
        let animationMusiclistBtn = document.querySelector('.animationMusiclistBtn');
        MusiclistContainer.classList.remove('show');
        animationMusiclistBtn.style.bottom = '0';
    }
    
    if (!(infoPanelBtn.classList.contains('hidden')) && (artist)) {
        infoPanel.classList.toggle('active');
    } else if (!(infoPanelBtn.classList.contains('hidden')) && (!artist)) {
        artistPanel.classList.toggle('active');
    } else {
        //do nothing
    }
});

module.exports = { updateShuffleState };

