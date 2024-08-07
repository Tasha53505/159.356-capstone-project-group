var infoPanelBtn = document.querySelector('.infoPanelBtn');
var infoPanel = document.querySelector('.infoPanel');

infoPanelBtn.addEventListener('click', function () {
    infoPanel.classList.toggle('hidden');
    infoPanelBtn.classList.toggle('hidden');
});