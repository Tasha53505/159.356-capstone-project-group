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
});


// Play Songs
function playSong(url) {

    fetch(url)
      .then(response => response.text())
      .then(data => {
        console.log("Song playback started");

      })
      .catch(error => console.error("Error playing song:", error));
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
                }
            });
        });

        // Add the content of `.basicSettings` to `.basicSettingsContent`
        const basicSettingsContent = settingsContainer.querySelector('.basicSettingsContent');
        const basicSettings = document.querySelector('.basicSettings').innerHTML;
        basicSettingsContent.innerHTML = basicSettings;
        
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
// Taken from basic.html
// function initSettingsForm() {
//     // Try to redirect all form submissions by return key to the default submit button
//     // Listen for keypress events on all form elements except submit
//     document.querySelectorAll('.settingsContainer input, .settingsContainer select').forEach(function(ele) {
//         if (ele.type != 'submit') {
//             ele.addEventListener('keypress', function(e) {
//                 var cKeyCode = e.keyCode || e.which;
//                 if (cKeyCode == 13) {  // Enter key
//                     e.preventDefault();  // Prevent default form submission
//                     document.getElementById('saveSettings').click();  // Trigger Save Settings button click
//                 }
//             });
//         }
//     });
// }

// function saveLanguageSetting() {
//     var selectedLanguage = document.getElementById('languageSelect').value;  // Get the selected language dynamically

//     const request = new XMLHttpRequest();
//     request.open('POST', '/save-language', true);
//     request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    
//     request.onreadystatechange = function () {
//         if (this.readyState === 4 && this.status === 200) {
//             // Language saved successfully, refresh or update content
//             location.reload();  // Reload the page to apply the new language settings
//         }
//     };
    
//     request.send(JSON.stringify({
//         language: selectedLanguage,
//         playerId: myClientState.id  // Assuming you need the player ID
//     }));
// }



document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('saveSettings').addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default form submission

        const selectedLanguage = document.getElementById('languageSelect').value;

        // Prepare the data to send
        const data = new URLSearchParams();
        data.append('language', selectedLanguage);

        // Make the AJAX request
        fetch('/run-script', {
            method: 'POST',
            body: data
        })
        .then(response => response.text())
        .then(result => {
            console.log('Success:', result);
            // Optionally, you can provide feedback to the user
            alert('Settings saved and script executed!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to save settings or execute script.');
        });
    });
});



// - should go to the server.js and update the .prefs files in ProgramData/Squeezebox/Prefs for where media is held.
document.querySelector('.rescanButton').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default form submission

    const selectedFolder = document.getElementById('mediadirs0').value;

    // Send the folder input to the backend via an AJAX request
    fetch('http://localhost:3000/updateMediaDirs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mediaDir: selectedFolder })
    })
    
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Media folder updated successfully.');
        } else {
            alert('Failed to update media folder.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});


