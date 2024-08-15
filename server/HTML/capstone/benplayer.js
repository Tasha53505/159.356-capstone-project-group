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

