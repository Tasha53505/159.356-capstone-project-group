var accordion = document.getElementsByClassName("accordion");
var i;
document.addEventListener('DOMContentLoaded', function () {
    // Handle accordion functionality
    var accordions = document.querySelectorAll('.accordionButton');
    accordions.forEach(function (accordion) {
        accordion.addEventListener('click', function () {
            this.classList.toggle('active');
            var accordionPanel = this.nextElementSibling;
            if (accordionPanel.classList.contains('show')) {
                accordionPanel.classList.remove('show');
            } else {
                accordionPanel.classList.add('show');
            }
        });
    });

    // Handle plugin click functionality
    var plugins = document.querySelectorAll('.pluginExample');
    plugins.forEach(function (plugin) {
        plugin.addEventListener('click', function () {
            console.log("please work");
            var newContainer = document.createElement('div');
            newContainer.classList.add('newPluginContainer');
            
            // Adds back button icon
            newContainer.innerHTML = 
                `<h3>Plugin X</h3>
                <button class="backButton"><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 1024 1024"><path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"/><path fill="#ffffff" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"/></svg>
                    </button>`;
            
            document.body.appendChild(newContainer);
            
            // Fixes error where it may be displayed UNDERNEATH, this gives it a timeout so the DOM waits for the changes to be applied.
            setTimeout(function () {
                newContainer.classList.add('shownewPluginContainer');
            }, 10);

            // Back Button
            newContainer.querySelector('.backButton').addEventListener('click', function () {
                newContainer.classList.remove('shownewPluginContainer');
                setTimeout(function () {
                    newContainer.remove();
                }, 500); // Animation time + back functionality i.e "removes the container" until pressed again.
            });
        });
    });

    // Handle overall playlist and animation button
    var animationMusiclistBtn = document.querySelector('.animationBtn');
    var overallPlaylistContainer = document.querySelector('.overallPlaylistContainer');

    animationMusiclistBtn.addEventListener('click', function () {
        if (overallPlaylistContainer.classList.contains('show')) {
            overallPlaylistContainer.classList.remove('show');
            animationMusiclistBtn.style.bottom = '0';
        } else {
            overallPlaylistContainer.classList.add('show');
            animationMusiclistBtn.style.bottom = '50vh';
        }
    });

    // Media query handling
    function updateAnimationBtnMargin() {
        if (window.matchMedia("(max-width: 800px)").matches) {
            animationMusiclistBtn.style.marginLeft = overallPlaylistContainer.classList.contains('show') ? '60%' : '0';
        } else {
            animationMusiclistBtn.style.marginLeft = overallPlaylistContainer.classList.contains('show') ? '27%' : '0';
        }
    }

    // Initial call
    updateAnimationBtnMargin();

    // Update on window resize
    window.addEventListener('resize', updateAnimationBtnMargin);
});

// // Code to FETCH Music 
// document.getElementById('myMusic').addEventListener('click', function() {
//     fetch('server/HTML/capstone/tashaPlaylistBackend/fetchMusic.pl') // HTTP request to fetch "fetchMusic.pl"
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error.  status is: ${response.status}`);
//         }
//         return response.json();
//     })
//     // Waits for server to respond and converts response data to JSON
//     .then(data => { // The file names (data) if any
//         let musicList = document.getElementById('musicList'); // Gets my musicList ID so it knows where to go
//         musicList.innerHTML = '<ul>'; // Adds an inner Unordered list
//         data.forEach(file => {
//             musicList.innerHTML += `<li>${file}</li>`; // For loop for displaying each file
//         });
//         musicList.innerHTML += `</ul>`; // End of Unordered list
//     })
//     .catch(error => console.log("There was an error grabbing music. Error: ", error)); // If errors were found, console.log them.
// });
