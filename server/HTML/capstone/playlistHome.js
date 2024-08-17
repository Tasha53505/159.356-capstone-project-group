var accordion = document.getElementsByClassName("accordion");
var i;
document.addEventListener('DOMContentLoaded', function () {
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

    var plugins = document.querySelectorAll('.pluginExample');
    plugins.forEach(function (plugin) {
        plugin.addEventListener('click', function () {
            console.log("please work");
            var newContainer = document.createElement('div');
            newContainer.classList.add('newPluginContainer');
            
            // Adds back buttun icon
            newContainer.innerHTML = 
                `<h3>Plugin X</h3>
                <button class="backButton"><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 1024 1024"><path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"/><path fill="#ffffff" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"/></svg>
                    </button>`
            ;
            
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

    var animationMusiclistBtn = document.querySelector('.animationMusiclistBtn');
    var MusiclistContainer = document.querySelector('.MusiclistContainer');

    animationMusiclistBtn.addEventListener('click', function () {
        if (MusiclistContainer.classList.contains('show')) {
            MusiclistContainer.classList.remove('show');
            animationMusiclistBtn.style.bottom = '0';
        } else {
            MusiclistContainer.classList.add('show');
            animationMusiclistBtn.style.bottom = '50vh';
        }
    });

});

document.addEventListener('DOMContentLoaded', function () {
    var overallPlaylistContainer = document.querySelector('.overallPlaylistContainer');
    var overallContainer = document.querySelector('.overallContainer');
    var animationBtn = document.querySelector('.animationBtn');
    
    // Set initial state (only the button should be visible)
    overallContainer.style.display = 'none';  // overallContainer is hidden initially

    overallPlaylistContainer.classList.add('hidden');
    animationBtn.classList.remove('hidden');

    // Event listener for the animation button
    animationBtn.addEventListener('click', function () {
        // Toggle the display of the overallContainer
        if (overallContainer.style.display === 'none') {
            overallContainer.style.display = 'flex';
            setTimeout(function() {
                overallPlaylistContainer.classList.remove('hidden');
            }, 10);  // Delay to ensure flex is applied before animation
        } else {
            overallPlaylistContainer.classList.add('hidden');
            setTimeout(function() {
                overallContainer.style.display = 'none';
            }, 500); // Wait for the animation to finish before hiding
        }

        animationBtn.classList.toggle('hidden');
        updateAnimationBtnMargin();
    });


    // Media query handling
    function updateAnimationBtnMargin() {
        if (window.matchMedia("(max-width: 800px)").matches) {
            animationBtn.style.marginLeft = overallPlaylistContainer.classList.contains('hidden') ? '0' : '60%';
        } else {
            animationBtn.style.marginLeft = overallPlaylistContainer.classList.contains('hidden') ? '0' : '27%';
        }
    }

    // Initial call
    updateAnimationBtnMargin();

    // Update on window resize
    window.addEventListener('resize', updateAnimationBtnMargin);
});

// ------------------------ Code to fetch all Songs ------------------------
document.getElementById('allSongs').addEventListener('click', function() {
    // Create a new container for the songs
    var newAllSongsContainer = document.createElement('div');
    newAllSongsContainer.classList.add('newAllSongsContainer');

    // Add back button and header
    newAllSongsContainer.innerHTML = 
        `<h3>Songs</h3>
        <button class="backButton"><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 1024 1024"><path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"/><path fill="#ffffff" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"/></svg>
            </button>


        <div id="musicList"></div>`; // Container to display the music list from FetchMusic.pl

    document.body.appendChild(newAllSongsContainer);

    // Show the new container
    setTimeout(function () {
        newAllSongsContainer.classList.add('shownewAllSongsContainer');
    }, 10);

    // Fetch music and display in the newSongsContainer
    fetch('tashaPlaylistBackend\\test.html')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error.  Status is: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        let musicList = newAllSongsContainer.querySelector('#musicList');
        musicList.innerHTML = '<ul>';
        data.files.forEach(file => {  // Access the 'files' array within the 'data' object
            musicList.innerHTML += `<li>${file}</li>`;
        });
        musicList.innerHTML += '</ul>';
    })
    .catch(error => console.log("There was an error grabbing music. Error: ", error));


    // Back Button functionality
    newAllSongsContainer.querySelector('.backButton').addEventListener('click', function () {
        newAllSongsContainer.classList.remove('shownewAllSongsContainer');
        setTimeout(function () {
            newAllSongsContainer.remove();
        }, 500); // Animation time + back functionality
    });
});





// // Code to FETCH All 
// document.getElementById('myMusic').addEventListener('click', function() {
//     fetch('server/HTML/capstone/tashaPlaylistBackend/fetchMusic.pl') // HTTP request to fetch "fetchMusic.pl"
//     then(response => {
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
//             musicList.innerHTML += `<li>${file}</li>`; // For loop for displaying rach file
//         });
//         musicList.innerHTML += `</ul>`; // End of Unordered list
//     })
//     .catch(error => console.log("There was an error grabbing music. Error: ", error)); // If errors were found, console.log them.

// }) 


// --------------- Settings Button ------------------------
// Event listener for the settings button
document.getElementById('settingsButton').addEventListener('click', function() {
    var existingContainer = document.querySelector('.settingsContainerClicked');
    
    if (existingContainer) {
        existingContainer.classList.add('showSettings');
        return;
    }

    var settingsContainer = document.createElement('div');
    settingsContainer.classList.add('settingsContainerClicked', 'showSettings');
    
    settingsContainer.innerHTML = `
        <div class="settingsHeader">
            <button class="backButtonSettings">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 1024 1024">
                    <path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"/>
                    <path fill="#ffffff" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"/>
                </svg>
            </button>

            <h2>Settings</h2>
            
            <div class="toggleSwitch">
                <input type="checkbox" id="modeToggle" />
                <label for="modeToggle" class="toggleLabel">
                    <span class="toggleSlider"></span>
                </label>
                <span class="toggleText">Advanced Mode</span>
            </div>
        </div>
        <div class="settingsTabs">
            <button class="tabButton active" data-tab="music">Music</button>
            <button class="tabButton" data-tab="plugins">Plugins</button>
            <button class="tabButton" data-tab="basic-info">Basic Settings | Information</button>
        </div>
        <div class="settingsContent">
            <div class="tabContent" id="music">
                <p class="settingsTextContent"> My Music </p>
                <p class="settingsTextContent"> Itunes </p>
                <p class="settingsTextContent"> Interface and Player</p>
            </div>
            <div class="tabContent" id="plugins">
                <p class="settingsTextContent">Manage Plugins</p>
            </div>
            <div class="tabContent" id="basic-info">
                <p class="settingsTextContent">Basic Settings</p>
                <p class="settingsTextContent">Information (i.e system Information</p>
            </div>
        </div>
    `;

    document.body.appendChild(settingsContainer);

    settingsContainer.querySelector('.backButtonSettings').addEventListener('click', function() {
        settingsContainer.classList.remove('showSettings');
        setTimeout(function() {
            settingsContainer.remove();
        }, 500);
    });

    function updateTabListeners() {
        tabButtons = settingsContainer.querySelectorAll('.tabButton');
        tabContents = settingsContainer.querySelectorAll('.tabContent');

        tabButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
        
                this.classList.add('active');
                document.getElementById(this.getAttribute('data-tab')).classList.add('active');
            });
        });
    }

    updateTabListeners();

    var isAdvancedMode = false;
    var modeToggle = settingsContainer.querySelector('#modeToggle');
    var toggleText = settingsContainer.querySelector('.toggleText');

    modeToggle.addEventListener('change', function() {
        isAdvancedMode = this.checked;
        if (isAdvancedMode) {
            toggleText.textContent = 'Advanced Mode';
            addAdvancedTab();
        } else {
            toggleText.textContent = 'Advanced Mode';
            removeAdvancedTab();
        }
    });

    function addAdvancedTab() {
        if (!document.querySelector('.tabButton[data-tab="advanced"]')) {
            var advancedButton = document.createElement('button');
            advancedButton.classList.add('tabButton');
            advancedButton.setAttribute('data-tab', 'advanced');
            advancedButton.textContent = 'Advanced';

            var tabsContainer = settingsContainer.querySelector('.settingsTabs');
            tabsContainer.appendChild(advancedButton);

            var advancedContent = document.createElement('div');
            advancedContent.classList.add('tabContent');
            advancedContent.id = 'advanced';
            advancedContent.innerHTML = '<p class="settingsTextContent">Advanced settings content</p>';

            var contentContainer = settingsContainer.querySelector('.settingsContent');
            contentContainer.appendChild(advancedContent);

            updateTabListeners();

            advancedButton.click();
        }
    }

    function removeAdvancedTab() {
        var advancedButton = document.querySelector('.tabButton[data-tab="advanced"]');
        if (advancedButton) {
            advancedButton.remove();
            document.getElementById('advanced').remove();
            updateTabListeners();
        }
    }

    document.querySelector('.tabButton[data-tab="music"]').click();
});
