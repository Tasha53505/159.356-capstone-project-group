// Change from rounded square (album cover) to circle (artist) and vice versa

var infoPanelBtn = document.querySelector('.infoPanelBtn');
var infoPanel = document.querySelector('.infoPanel');
var artistPanel = document.querySelector('.infoArtistPanel');
var coverDisplay = document.querySelector('.album');

document.querySelector('.album').addEventListener('click', function() {
    let album = this;
    album.classList.toggle('circle');
    album.style.transform = 'scale(1.1)';
    if(album.textContent === "cover"){
        album.textContent = "artist";
    } else {
        album.textContent = "cover";
    }
    setTimeout(function(){
        album.style.transform = 'scale(1)';
    }, 200)

    if((artistPanel.classList.contains('active')) || (infoPanel.classList.contains('active'))) {
        artistPanel.classList.toggle('active');
        infoPanel.classList.toggle('active');

    }
});

// PLAYBACK BUTTONS

var audio = new Audio('okcomputer/04 - Exit Music (For A Film).mp3');

function animateButton(button){
    button.classList.add('animatePlay');
    setTimeout(function(){
        button.classList.remove('animatePlay');
    }, 150);
}

document.getElementById('playPause').addEventListener('click', function(){
    let button = this;
    animateButton(button);
    if(audio.paused){
        button.classList.add('playButton');
        button.classList.remove('pauseButton');
        audio.play();
    } else {
        button.classList.remove('playButton');
        button.classList.add('pauseButton');
        audio.pause();
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
    if (!(infoPanelBtn.classList.contains('hidden')) && (coverDisplay.textContent == 'cover')) {
        infoPanel.classList.toggle('active');
    } else if (!(infoPanelBtn.classList.contains('hidden')) && (coverDisplay.textContent == 'artist')) {
        artistPanel.classList.toggle('active');
    } else {
        //do nothing
    }
});

