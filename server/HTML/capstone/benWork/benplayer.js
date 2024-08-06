// Change from rounded square (album cover) to circle (artist) and vice versa
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
});
