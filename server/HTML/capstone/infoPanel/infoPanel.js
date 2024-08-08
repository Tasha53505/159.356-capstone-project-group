var infoPanelBtn = document.querySelector('.infoPanelBtn');
var infoPanel = document.querySelector('.infoPanel');
var artistPanel = document.querySelector('.infoArtistPanel');
var changeButton = document.querySelector('.changePanelBtn');

changeButton.addEventListener('click', function () {
    if ((artistPanel.classList.contains('active')) || (infoPanel.classList.contains('active'))) {
        artistPanel.classList.toggle('active');
        infoPanel.classList.toggle('active');
        if (changeButton.innerHTML == 'B') {
            changeButton.innerHTML = 'A';
        } else {
            changeButton.innerHTML = 'B';
        }
    }
});

infoPanelBtn.addEventListener('click', function () {
    if (!(infoPanelBtn.classList.contains('hidden')) && (changeButton.innerHTML == 'A')) {
        infoPanel.classList.toggle('active');
    } else if (!(infoPanelBtn.classList.contains('hidden')) && (changeButton.innerHTML == 'B')) {
        artistPanel.classList.toggle('active');
    } else {
        //do nothing
    }
});
