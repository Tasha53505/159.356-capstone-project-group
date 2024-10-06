document.body.innerHTML = `
    <div id="allAlbums"></div>
    <div id="allSongs"></div>
    <div id="allArtists"></div>
    <div class="animationBtn" style="display: block;"></div>
    <div class="albumsList" style="display: none;"></div>
    <div class="songsList" style="display: none;"></div>
    <div class="artistsList" style="display: none;"></div>
`;

require('./playlistHome.js'); 

describe('Music Container Event Listeners', () => {
    afterEach(() => {
        // Cleanup the document body after each test
        document.body.innerHTML = `
            <div id="allAlbums"></div>
            <div id="allSongs"></div>
            <div id="allArtists"></div>
            <div class="animationBtn" style="display: block;"></div>
            <div class="albumsList" style="display: none;"></div>
            <div class="songsList" style="display: none;"></div>
            <div class="artistsList" style="display: none;"></div>
        `;
    });

    test('should create and display a new container for all albums', () => {
        const allAlbumsButton = document.getElementById('allAlbums');
        allAlbumsButton.click();

        const newContainer = document.querySelector('.newAllAlbumsContainer');
        expect(newContainer).not.toBeNull();
        expect(newContainer).toBeVisible();
        expect(document.querySelector('.animationBtn').style.display).toBe('none');
    });

    test('should create and display a new container for all songs', () => {
        const allSongsButton = document.getElementById('allSongs');
        allSongsButton.click();

        const newContainer = document.querySelector('.newAllSongsContainer');
        expect(newContainer).not.toBeNull();
        expect(newContainer).toBeVisible();
        expect(document.querySelector('.animationBtn').style.display).toBe('none');
    });

    test('should create and display a new container for all artists', () => {
        const allArtistsButton = document.getElementById('allArtists');
        allArtistsButton.click();

        const newContainer = document.querySelector('.newAllArtistsContainer');
        expect(newContainer).not.toBeNull();
        expect(newContainer).toBeVisible();
        expect(document.querySelector('.animationBtn').style.display).toBe('none');
    });

    test('should remove the container and show the animation button when back button is clicked (Albums)', () => {
        const allAlbumsButton = document.getElementById('allAlbums');
        allAlbumsButton.click();

        const backButton = document.querySelector('.newAllAlbumsContainer .backButton');
        backButton.click();

        const newContainer = document.querySelector('.newAllAlbumsContainer');
        expect(newContainer).toBeNull();
        expect(document.querySelector('.animationBtn').style.display).toBe('block');
    });

    test('should remove the container and show the animation button when back button is clicked (Songs)', () => {
        const allSongsButton = document.getElementById('allSongs');
        allSongsButton.click();

        const backButton = document.querySelector('.newAllSongsContainer .backButton');
        backButton.click();

        const newContainer = document.querySelector('.newAllSongsContainer');
        expect(newContainer).toBeNull();
        expect(document.querySelector('.animationBtn').style.display).toBe('block');
    });

    test('should remove the container and show the animation button when back button is clicked (Artists)', () => {
        const allArtistsButton = document.getElementById('allArtists');
        allArtistsButton.click();

        const backButton = document.querySelector('.newAllArtistsContainer .backButton');
        backButton.click();

        const newContainer = document.querySelector('.newAllArtistsContainer');
        expect(newContainer).toBeNull();
        expect(document.querySelector('.animationBtn').style.display).toBe('block');
    });
});
