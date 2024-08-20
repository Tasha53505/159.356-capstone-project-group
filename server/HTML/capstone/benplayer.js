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

document.getElementById('playPause').addEventListener('click', function(){
    let button = this;
    animateButton(button);
    if(this.classList.contains('pauseButton')){
        button.classList.add('playButton');
        button.classList.remove('pauseButton');
    } else {
        button.classList.remove('playButton');
        button.classList.add('pauseButton');
    }
})

document.getElementById('repeatButton').addEventListener('click', function(){
    animateButton(this);
})
document.getElementById('prevButton').addEventListener('click', function(){
    animateButton(this);
})
document.getElementById('nextButton').addEventListener('click', function(){
    animateButton(this);
})
document.getElementById('shuffleButton').addEventListener('click', function(){
    animateButton(this);
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

