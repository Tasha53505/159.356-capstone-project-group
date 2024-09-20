// From strings.txt

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

    var overallPlaylistContainer = document.querySelector('.overallPlaylistContainer');
    var overallContainer = document.querySelector('.overallContainer');
    var animationBtn = document.querySelector('.animationBtn');
    var animationMusiclistBtn = document.querySelector('.animationMusiclistBtn');
    var MusiclistContainer = document.querySelector('.MusiclistContainer');

    animationMusiclistBtn.addEventListener('click', function () {
        if (MusiclistContainer.classList.contains('show')) {
            MusiclistContainer.classList.remove('show');
            animationMusiclistBtn.style.bottom = '0';
        } else {
            MusiclistContainer.classList.add('show');
            animationMusiclistBtn.style.bottom = '50vh';

            // hide left bar
            overallPlaylistContainer.classList.add('hidden');
            animationBtn.classList.add('hidden');
            setTimeout(function() {
                overallContainer.style.display = 'none';
            }, 500); // Wait for the animation to finish before hiding

            // hide right bar
            // infoPanelBtn.classList.add('hidden')
            infoPanel.classList.remove('active')
        }
    });

});

document.addEventListener('DOMContentLoaded', function () {
    var overallPlaylistContainer = document.querySelector('.overallPlaylistContainer');
    var overallContainer = document.querySelector('.overallContainer');
    var animationBtn = document.querySelector('.animationBtn');
    var MusiclistContainer = document.querySelector('.MusiclistContainer');
    var animationMusiclistBtn = document.querySelector('.animationMusiclistBtn');
    
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

            // hide bottom bar
            MusiclistContainer.classList.remove('show');
            animationMusiclistBtn.style.bottom = '0';

            // hide right bar
            infoPanel.classList.remove('active')
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

    var animationBtn = document.querySelector('.animationBtn');
    animationBtn.style.display ='none';

    // Add back button and header
    newAllSongsContainer.innerHTML = 
        `<h3>Songs</h3>

        <button class="backButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 1024 1024">
                <path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"/>
                <path fill="#ffffff" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"/>
            </svg>
        </button>
        <div id="musicList"></div>`; 

    // Append the new container to the body
    document.body.appendChild(newAllSongsContainer);

    // Clone the songsList element to avoid issues with the original
    var songsList = document.querySelector('.songsList').cloneNode(true);
    songsList.style.display = 'block'; // Display it
    newAllSongsContainer.querySelector('#musicList').appendChild(songsList);

    // Show the new container
    setTimeout(function () {
        newAllSongsContainer.classList.add('shownewAllSongsContainer');
    }, 10);

    // Back Button functionality
    newAllSongsContainer.querySelector('.backButton').addEventListener('click', function () {
        newAllSongsContainer.classList.remove('shownewAllSongsContainer');
        setTimeout(function () {
            newAllSongsContainer.remove();
            animationBtn.style.display = 'block';
        }, 500); // Animation time + back functionality
    });

//     // Use event delegation to handle dynamic content // THIS IS the code that made testButton trigger its event inside a popup code
// document.body.addEventListener('click', function(event) {
//     if (event.target && event.target.id === 'testButton') {
//         console.log('testButton clicked');
//     }
// });
});

function loadMusicFolder() {
    const url = "http://161.29.197.94.localhost:9000/capstone/clixmlbrowser/clicmd=browselibrary+items&linktitle=BROWSE_MUSIC_FOLDER&mode=bmf/?player=10:f6:0a:92:1d:96";
    
    fetch(url)
        .then(response => response.text()) 
        .then(data => {
            document.getElementById('songsList').innerHTML = data;
        })
        .catch(error => console.error('Error fetching the music folder:', error));
}



// Play Songs
function playSong(url) {

    fetch(url)
      .then(response => response.text())
      .then(data => {
        console.log("Song playback started");

      })
      .catch(error => console.error("Error playing song:", error));
  }

  // Add song to queue
  function addToQueue(url) {
    fetch(url)
      .then(response => response.text())
      .then(data => {
        console.log("Song added to queue");
      })
      .catch(error => console.error("Error adding song to queue:", error));
}





// ------------------------ Code to fetch all Albums ------------------------
document.getElementById('allAlbums').addEventListener('click', function() {
    // Create a new container for the songs
    var newAllAlbumsContainer = document.createElement('div');
    newAllAlbumsContainer.classList.add('newAllAlbumsContainer');
    
    var animationBtn = document.querySelector('.animationBtn');

    animationBtn.style.display ='none';

    // Add back button and header
    newAllAlbumsContainer.innerHTML = 
        `<h3>Albums</h3>

        <button class="backButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 1024 1024">
                <path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"/>
                <path fill="#ffffff" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"/>
            </svg>
        </button>
        <div id="musicList"></div>`; 

    // Append the new container to the body
    document.body.appendChild(newAllAlbumsContainer);

    // Clone the songsList element to avoid issues with the original
    var albumsList = document.querySelector('.albumsList').cloneNode(true);
    albumsList.style.display = 'block'; // Display it
    newAllAlbumsContainer.querySelector('#musicList').appendChild(albumsList);

    // Show the new container
    setTimeout(function () {
        newAllAlbumsContainer.classList.add('shownewAllAlbumsContainer');
    }, 10);

    // Back Button functionality
    newAllAlbumsContainer.querySelector('.backButton').addEventListener('click', function () {
        newAllAlbumsContainer.classList.remove('shownewAllAlbumsContainer');
        setTimeout(function () {
            newAllAlbumsContainer.remove();
            animationBtn.style.display = 'block';

        }, 500); // Animation time + back functionality
    });
});



// ------------------------ Code to fetch all Artists  ------------------------
document.getElementById('allArtists').addEventListener('click', function() {
    // Create a new container for the songs
    var newAllArtistsContainer = document.createElement('div');
    newAllArtistsContainer.classList.add('newAllArtistsContainer');
    var animationBtn = document.querySelector('.animationBtn');

    animationBtn.style.display ='none';

    // Add back button and header
    newAllArtistsContainer.innerHTML = 
        `<h3>Artists</h3>

        <button class="backButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 1024 1024">
                <path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"/>
                <path fill="#ffffff" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"/>
            </svg>
        </button>
        <div id="musicList"></div>`; 

    // Append the new container to the body
    document.body.appendChild(newAllArtistsContainer);

    // Clone the songsList element to avoid issues with the original
    var artistsList = document.querySelector('.artistsList').cloneNode(true);
    artistsList.style.display = 'block'; // Display it
    newAllArtistsContainer.querySelector('#musicList').appendChild(artistsList);

    // Show the new container
    setTimeout(function () {
        newAllArtistsContainer.classList.add('shownewAllArtistsContainer');
    }, 10);

    // Back Button functionality
    newAllArtistsContainer.querySelector('.backButton').addEventListener('click', function () {
        newAllArtistsContainer.classList.remove('shownewAllArtistsContainer');
        setTimeout(function () {
            newAllArtistsContainer.remove();
            animationBtn.style.display ='block';

        }, 500); // Animation time + back functionality
    });
});

// // ------------------------ Radio Tune in ------------------------
document.addEventListener('DOMContentLoaded', function() {
    
document.getElementById('radioTuneInTitle').addEventListener('click', function() {
    // Create a new container for the radioTuneIn
    var newRadioTuneInContainer = document.createElement('div');
    newRadioTuneInContainer.classList.add('newRadioTuneInContainer');
    var animationBtn = document.querySelector('.animationBtn');

    // Hide the animation button 
    animationBtn.style.display = 'none';

    // Add back button and header
    newRadioTuneInContainer.innerHTML = 
        `<h3>Radio Tune In</h3>

        <button class="backButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 1024 1024">
                <path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"/>
                <path fill="#ffffff" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"/>
            </svg>
        </button>
        <div id="radioTuneInContent"></div>`; 

    // Append the new container to the body
    document.body.appendChild(newRadioTuneInContainer);

    // Clone the radioTuneIn element to avoid issues with the original
    var radioTuneIn = document.querySelector('.radioTuneIn').cloneNode(true);
    radioTuneIn.style.display = 'block'; // Display it
    newRadioTuneInContainer.querySelector('#radioTuneInContent').appendChild(radioTuneIn);

    // Show the new container with animation
    setTimeout(function () {
        newRadioTuneInContainer.classList.add('shownewRadioTuneInContainer');
    }, 10);

    // Back Button functionality
    newRadioTuneInContainer.querySelector('.backButton').addEventListener('click', function () {
        newRadioTuneInContainer.classList.remove('shownewRadioTuneInContainer');
        setTimeout(function () {
            newRadioTuneInContainer.remove();
            animationBtn.style.display = 'block';
        }, 500); // Animation time + back functionality
    });
});


});


// --------------- Settings Button ------------------------
// Event listener for the settings button
document.getElementById('settingsButton').addEventListener('click', function() {
    var existingContainer = document.querySelector('.settingsContainerClicked');
    
    // Hide "Home"  Music button when settings container is clicked
    const animationBtn = document.querySelector('.animationBtn');
    animationBtn.style.display = 'none'; // Hide the button



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
            <div class="tabContent active" id="music">
                <p class="settingsTextContent">My Music</p>
                <p class="settingsTextContent">Itunes</p>
                <p class="settingsTextContent">Interface and Player</p>
            </div>
            <div class="tabContent" id="plugins">
                <p class="settingsTextContent">Manage Plugins</p>
            </div>
            <div class="tabContent" id="basic-info">
                <div class="basicSettingsContent"></div>
            </div>
        </div>
    `;

    document.body.appendChild(settingsContainer);

    settingsContainer.querySelector('.backButtonSettings').addEventListener('click', function() {
        settingsContainer.classList.remove('showSettings');
        setTimeout(function() {
            settingsContainer.remove();
            animationBtn.style.display = 'block'; // Show the button again when back button is clicked

        }, 500);
    });

    function updateTabListeners() {
        const tabButtons = settingsContainer.querySelectorAll('.tabButton');
        const tabContents = settingsContainer.querySelectorAll('.tabContent');
    
        tabButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                // Remove the active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
    
                // Add the active class to the clicked button
                this.classList.add('active');
    
                // Show the corresponding tab content
                const activeTab = document.getElementById(this.getAttribute('data-tab'));
                if (activeTab) {
                    activeTab.classList.add('active');
                } else {
                    console.error("No content found for tab ID:", this.getAttribute('data-tab'));
                }
            });
        });
    
        // Add the content of `.basicSettings` to `.basicSettingsContent`
        const basicSettingsContent = settingsContainer.querySelector('.basicSettingsContent');
        if (basicSettingsContent) {
            const basicSettings = document.querySelector('.basicSettings')?.innerHTML || '';
            basicSettingsContent.innerHTML = basicSettings;
        } else {
            console.error('.basicSettingsContent element not found.');
        }
    
        // Initialize Basic Settings Tab Switching
        const buttonClasses = [
            '.basicSettingsLanguageTabButton',
            '.basicSettingsMediaLibraryTabButton',
            '.basicSettingsMediaFoldersTabButton',
            '.basicSettingsPlaylistsTabButton',
            '.basicSettingsRescanMediaTabButton'
        ];
        const basicSettingsTabsButtons = settingsContainer.querySelectorAll(buttonClasses.join(', '));
    
        const contentClasses = [
            '.basicSettingsLanguageTab',
            '.basicSettingsMediaLibraryTab',
            '.basicSettingsMediaFoldersTab',
            '.basicSettingsPlaylistsTab',
            '.basicSettingsRescanMediaTab'
        ];
        const basicSettingsTabsContent = settingsContainer.querySelectorAll(contentClasses.join(', '));
    
        // Function to hide all tab contents
        function hideAllTabsContent() {
            basicSettingsTabsContent.forEach(tab => {
                tab.style.display = 'none'; 
                tab.classList.remove('active'); // Remove active class
            });
        }
    
        // Function to show the .basicSettings container
        function showBasicSettings() {
            const basicSettingsContainer = settingsContainer.querySelector('.basicSettings');
            if (basicSettingsContainer) {
                basicSettingsContainer.style.display = 'block';
            } else {
                console.error('Basic settings container not found.');
            }
        }
    
        // Function to hide the .basicSettings container
        function hideBasicSettings() {
            const basicSettingsContainer = settingsContainer.querySelector('.basicSettings');
            if (basicSettingsContainer) {
                basicSettingsContainer.style.display = 'none';
            } else {
                console.error('Basic settings container not found.');
            }
        }
    
        // Add click event listeners to each tab button
        basicSettingsTabsButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Show .basicSettings container
                showBasicSettings();
    
                // Hide all tab contents
                hideAllTabsContent();
    
                // Remove active class from all buttons
                basicSettingsTabsButtons.forEach(btn => btn.classList.remove('active'));
    
                // Show the selected tab content and add the active class to the clicked button
                const selectedTabId = this.getAttribute('data-tab');
                const selectedTabContent = settingsContainer.querySelector(`#${selectedTabId}`);
                if (selectedTabContent) {
                    selectedTabContent.style.display = 'block'; // Show the selected tab content
                    selectedTabContent.classList.add('active'); // Add active class to the selected tab content
                } else {
                    console.error("No content found for tab ID:", selectedTabId); // Error
                }
                
                this.classList.add('active'); // Add active class to the clicked button
            });
        });
    
        hideBasicSettings();
    
        // Trigger click on the Language tab button to display its content by default
        const languageTabButton = settingsContainer.querySelector('.basicSettingsLanguageTabButton');
        if (languageTabButton) {
            languageTabButton.click();
        }
    }
    
    
    // Initialize the tab listeners after the container is added
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
            advancedContent.classList.add('active'); // Make sure it's shown when added
    
            // Create a new div to hold the content of `.advancedSettingsPlugin`
            var advancedSettingsPluginContent = document.createElement('div');
            advancedSettingsPluginContent.classList.add('advancedSettingsPlugin');
            
            // Add the advancedSettingsPlugin content to the new div
            var originalAdvancedSettingsPlugin = document.querySelector('.advancedSettingsPlugin');
            if (originalAdvancedSettingsPlugin) {
                // Clone the original content to avoid removing it from its original place
                advancedSettingsPluginContent.innerHTML = originalAdvancedSettingsPlugin.innerHTML;
            }
    
            advancedContent.appendChild(advancedSettingsPluginContent);
    
            var contentContainer = settingsContainer.querySelector('.settingsContent');
            contentContainer.appendChild(advancedContent);
    
            // Set the display style to block
            advancedSettingsPluginContent.style.display = 'block';
    
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


// ----------------- Save settings, speciifically Language -----------------
document.addEventListener("DOMContentLoaded", function() {
    let selectedLanguage = document.getElementById("languageSelect").value; // Initialize variable

    // Event delegation for click events
    document.body.addEventListener('click', function(e) {
        // Handle language selection change
        if (e.target && e.target.id === "languageSelect") {
            selectedLanguage = e.target.value; // Update variable on change
            console.log("Language select changed to (languageSelect statement):", selectedLanguage);
        }

        // Check if the test button was clicked
        if (e.target && e.target.id === 'testButton') {
            console.log('testButton clicked');
        } 
        
        // Check if the save settings button was clicked
        if (e.target && e.target.id === 'saveSettings') {
            e.preventDefault(); // Prevent default behavior

            console.log("Save Settings BUTTON CLICKED");
            console.log("Selected language inside saveSettings:", selectedLanguage); // Log the selected language

            // Send a JSON-RPC request to update the language in the server.prefs file
            updateLanguageSetting(selectedLanguage);    
        }
    });
});

function updateLanguageSetting(language) { 
    const data = {
        id: 1,
        method: "slim.request",
        params: [0, ["pref", "language", language]] 
    };

    fetch("<http:localhost:9000>/capstone/jsonrpc.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Language updated:", data);
    })
    .catch(error => {
        console.error("Error updating language:", error);
    });
}



