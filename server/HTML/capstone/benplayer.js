// Change from rounded square (album cover) to circle (artist) and vice versa

var infoPanelBtn = document.querySelector('.infoPanelBtn');
var infoPanel = document.querySelector('.infoPanel');
var artistPanel = document.querySelector('.infoArtistPanel');
var coverDisplay = document.querySelector('.album');
var artist = true;

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

// PLAYBACK BUTTONS

function animateButton(button){
    button.classList.add('animatePlay');
    setTimeout(function(){
        button.classList.remove('animatePlay');
    }, 150);
}

// Update play button
var playPause = document.getElementById("playPause");
function updatePlay(){
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
document.getElementById('playPause').addEventListener('click', function(){
    animateButton(playPause);
    updatePlay();
});

function initialPlay(){
    if(SqueezeJS.Controller.isPlaying()){
        console.log("playing")
        playPause.classList.add('pauseButton');
    } else {
        console.log("paused")
        playPause.classList.add('playButton');
    }
}
initialPlay();


// Update repeat button
document.getElementById('repeatButton').addEventListener('click', function(){
    animateButton(this);
})

// Previous and Next
document.getElementById('prevButton').addEventListener('click', function(){
    animateButton(this);
})
document.getElementById('nextButton').addEventListener('click', function(){
    animateButton(this);
})

// Update shuffle button
document.getElementById('shuffleButton').addEventListener('click', function(){
    animateButton(this);
    updatePlay();
})

// changeButton.addEventListener('click', function () {
//     if ((artistPanel.classList.contains('active')) || (infoPanel.classList.contains('active'))) {
//         artistPanel.classList.toggle('active');
//         infoPanel.classList.toggle('active');
//         if (changeButton.innerHTML === 'B') {
//             changeButton.innerHTML = 'A';
//         } else {
//             changeButton.innerHTML = 'B';
//         }
//     }
// });

infoPanelBtn.addEventListener('click', function () {
    if (!(infoPanelBtn.classList.contains('hidden')) && (artist)) {
        infoPanel.classList.toggle('active');
    } else if (!(infoPanelBtn.classList.contains('hidden')) && (!artist)) {
        artistPanel.classList.toggle('active');
    } else {
        //do nothing
    }
});

