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

// function loadMusicFolder() {
//     const url = "http:localhost:9000/capstone/clixmlbrowser/clicmd=browselibrary+items&linktitle=BROWSE_MUSIC_FOLDER&mode=bmf/?player=10:f6:0a:92:1d:96";
    
//     fetch(url)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.text(); // Or use .json() if the data is JSON
//         })
//         .then(data => {
//             // Display the fetched data inside the songsList div
//             document.querySelector('.songsList').innerHTML = data;
//         })
//         .catch(error => console.error('Error fetching the music folder:', error));
// }





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


// --------------------------- Iframe --------------------------------------
const iframe = document.getElementById('songsIframe');

// Send a message to the iframe once it loads
iframe.onload = function() {
    iframe.contentWindow.postMessage({ color: '#adffc3', font: 'Arial' }, '*');
};

window.addEventListener('message', function(event) {
    document.body.style.backgroundColor = event.data.color; // Set text color
    document.body.style.fontFamily = event.data.font; // Set font family
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
            <button class="tabButton" data-tab="basic-info">Basic Settings</button>
            <button class="tabButton" data-tab="formatting">Formatting</button>
            <button class="tabButton" data-tab="media-library-management">Media Library Management </button>
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
            <div class="tabContent" id="formatting">
                <div class="formatSettingsContent"></div>
            </div>

          <div class="tabContent" id="media-library-management">
                <div class="mediaLibraryManagementContent"></div>

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

        // Add formatting content
        const formatSettingsContent = settingsContainer.querySelector('.formatSettingsContent');
        if(formatSettingsContent){
            const formatSettings = document.querySelector('.formatSettings')?.innerHTML || '';
            formatSettingsContent.innerHTML = formatSettings;
        } else {
            console.error('.formatSettingsContent element not found.');
        }


        // Add the content of `.mediaLibraryManagement` to `.mediaLibraryManagementContent`
        const mediaLibraryManagementContent = settingsContainer.querySelector('.mediaLibraryManagementContent');
            if (mediaLibraryManagementContent) {
                const mediaLibraryManagementSettings = document.querySelector('.mediaLibraryManagementSettings')?.innerHTML || '';
                mediaLibraryManagementContent.innerHTML = mediaLibraryManagementSettings;
            } else {
                console.error('.mediaLibraryManagementSettings element not found.');
            }














        // ------------ Basic Settings -------------

        // Initialize Basic Settings Tab Switching
        const buttonClasses = [
            '.basicSettingsLanguageTabButton',
            '.basicSettingsMediaLibraryTabButton',
            '.basicSettingsMediaFoldersTabButton',
            '.basicSettingsPlaylistsTabButton',
            '.basicSettingsRescanMediaTabButton',
            '.basicSettingsSecurityTabButton'        ];
        const basicSettingsTabsButtons = settingsContainer.querySelectorAll(buttonClasses.join(', '));
    
        const contentClasses = [
            '.basicSettingsLanguageTab',
            '.basicSettingsMediaLibraryTab',
            '.basicSettingsMediaFoldersTab',
            '.basicSettingsPlaylistsTab',
            '.basicSettingsRescanMediaTab',
            '.basicSettingsSecurityTab'
        ];
        const basicSettingsTabsContent = settingsContainer.querySelectorAll(contentClasses.join(', '));

        // ---------- FORMAT SETTINGS ----------
        const buttonClassesFormatting =[
            '.formatSettingsArtworkTabButton',
            '.formatSettingsGuessTagsTabButton'
        ];
        const formatSettingsTabsButtons = settingsContainer.querySelectorAll(buttonClassesFormatting.join(', '));

        const formatContentClasses=[
            '.formatSettingsArtworkTab',
            '.formatSettingsGuessTagsTab'
        ];
        const formatSettingsTabContent = settingsContainer.querySelectorAll(formatContentClasses.join(', '));


        // ------------ Media Library management -------------
        // Initialize Basic Settings Tab Switching  for Media Library management
        const buttonClassesMediaLibraryManagement = [
            '.mediaLibraryManagementBrowseTabButton',
            '.mediaLibraryManagementReleaseTypesTabButton',
            '.mediaLibraryManagementFiltersTabButton',
            '.mediaLibraryManagementPlaylistsTabButton'
        
        ];
        const mediaLibraryManagementTabsButtons = settingsContainer.querySelectorAll(buttonClassesMediaLibraryManagement.join(', '));
    
        const MediaLibraryManagementcontentClasses = [
            '.mediaLibraryManagementBrowseTab',
            '.mediaLibraryManagementReleaseTypesTab',
            '.mediaLibraryManagementFiltersTab',
            '.mediaLibraryManagementPlaylistsTab'


        ];
        const mediaLibraryManagementTabContent = settingsContainer.querySelectorAll(MediaLibraryManagementcontentClasses.join(', '));


        // ------------ Advanced File Type Settings and Advanced Media Library Management settings -------------
        const advancedSettingsButtonClasses  = [
            '.advancedSettingsMediaLibraryManagementTabButton',
            '.advancedSettingsFileTypesTabButton',
        ];
        const advancedSettingsTabsButtons = settingsContainer.querySelectorAll(advancedSettingsButtonClasses.join(', '));

        const advancedSettingsContentClasses = [
            '#advancedSettingsMediaLibraryManagement', // 
            '#advancedFileTypes', //
        ];
        const advancedSettingsTabContent = settingsContainer.querySelectorAll(advancedSettingsContentClasses.join(', '));


    
        // Function to hide all tab contents
        function hideAllTabsContent() {
            basicSettingsTabsContent.forEach(tab => {
                tab.style.display = 'none'; 
                tab.classList.remove('active'); // Remove active class
            });
        }

        // Function to hide all format contents
        function hideAllFormatContent() {
            formatSettingsTabContent.forEach(tab => {
                tab.style.display = 'none'; // Hide tab
                tab.classList.remove('active'); // Remove active class
            });
        }
        
        // Function to hide all Library Management Media
    function hideAllLibraryManagementTabsContent() {
        mediaLibraryManagementTabContent.forEach(tab => {
            tab.style.display = 'none';  // Hide the tab
            tab.classList.remove('active');  // Remove active class
        });
    }

      // Function to hide all Advanced Settings tab contents
      function hideAllAdvancedSettingsTabsContent() {
        advancedSettingsTabContent.forEach(tab => {
            tab.style.display = 'none';  // Hide the tab
            tab.classList.remove('active');  // Remove active class
        });
    }
    
        // Function to show the .basicSettings container
        function showBasicSettings() {
            const basicSettingsContainer = settingsContainer.querySelector('.basicSettings');
            if (basicSettingsContainer) {
                basicSettingsContainer.style.display = 'block';
            } else {
                // console.log('Basic settings container not found.');
            }
        }

        function showFormatSettings(){
            const formatSettingsContainer = settingsContainer.querySelector('.formatSettings');
            if(formatSettingsContainer) {
                formatSettingsContainer.style.display = 'block';
            } else {

            }
        }
    

        // Function to show the Media Library Management container
        function showMediaLibraryManagement() {
            const mediaLibraryManagementContainer = settingsContainer.querySelector('.mediaLibraryManagementSettings');
            if (mediaLibraryManagementContainer) {
                mediaLibraryManagementContainer.style.display = 'block';  // Ensure the container is displayed
            } else {
                // console.error('Media Library Management container not found.');
            }
        }

                // Function to hide the .basicSettings container
        function hideBasicSettings() {
            const basicSettingsContainer = settingsContainer.querySelector('.basicSettings');
            if (basicSettingsContainer) {
                basicSettingsContainer.style.display = 'none';
            } else {
                // console.log('Basic settings container not found.');
            }
        }

        function hideFormatSettings() {
            const formatSettingsContainer = settingsContainer.querySelector('.formatSettings');
            if(formatSettingsContainer) {
                formatSettingsContainer.style.display = 'none';
            }
        }

        // Hide Media Library Management
        function hideMediaLibraryManagementSettings() {
            const mediaLibraryManagementContainer = settingsContainer.querySelector('.mediaLibraryManagementSettings');
            if (mediaLibraryManagementContainer) {
                mediaLibraryManagementContainer.style.display = 'none';
            } else {
                // console.log('Basic settings container not found.');
            }
        }

          // Function to hide all advanced settings tab contents
    function hideAllAdvancedSettingsTabsContent() {
        advancedSettingsTabContent.forEach(tab => {
            tab.style.display = 'none';  // Hide the tab
            tab.classList.remove('active');  // Remove active class
        });
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

        // Add click event listeners to each format tab button
        formatSettingsTabsButtons.forEach(button => {
            button.addEventListener('click', function() {
                showFormatSettings();
                hideAllFormatContent();
                formatSettingsTabsButtons.forEach(btn => btn.classList.remove('active'));
                const selectedTabId = this.getAttribute('data-tab');
                const selectedTabContent = settingsContainer.querySelector(`#formatSettings${selectedTabId}`);
                console.log(selectedTabId);
                if(selectedTabContent){
                    selectedTabContent.style.display = 'block';
                    selectedTabContent.classList.add('active');
                } else {
                    console.error("No content found for tab ID: ", selectedTabId);
                }
                this.classList.add('active');
            });
        });
    
        // Add click event listeners to each media library tab button
        mediaLibraryManagementTabsButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Show Media Library Management container
                showMediaLibraryManagement();
        
                // Hide all tab contents
                hideAllLibraryManagementTabsContent();
        
                // Remove active class from all buttons
                mediaLibraryManagementTabsButtons.forEach(btn => btn.classList.remove('active'));
        
                // Show the selected tab content and add the active class to the clicked button
                const selectedTabId = this.getAttribute('data-tab');
                const selectedTabContent = settingsContainer.querySelector(`#mediaLibraryManagement${selectedTabId.charAt(0).toUpperCase() + selectedTabId.slice(1)}`);
                console.log(selectedTabId);
                if (selectedTabContent) {
                    selectedTabContent.style.display = 'block'; // Show the selected tab content
                    selectedTabContent.classList.add('active'); // Add active class to the selected tab content
                } else {
                    console.error("No content found for tab ID:", selectedTabId); // Error
                }
        
                this.classList.add('active'); // Add active class to the clicked button
            });
        });
        
// Add click event listeners to each advanced settings tab button
advancedSettingsTabsButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Hide all advanced settings tab contents
        hideAllAdvancedSettingsTabsContent();

        // Remove active class from all buttons
        advancedSettingsTabsButtons.forEach(btn => btn.classList.remove('active'));

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

    // Initially hide all advanced settings content
        hideAllAdvancedSettingsTabsContent();
        hideBasicSettings();
        hideMediaLibraryManagementSettings();
        hideFormatSettings();
    
        // Trigger click on the Language tab button to display its content by default
        const languageTabButton = settingsContainer.querySelector('.basicSettingsLanguageTabButton');
        if (languageTabButton) {
            languageTabButton.click();
        }

        // Trigger click on the first tab button to display its content by default 
        const firstAdvancedTabButton = advancedSettingsTabsButtons[0];
        if (firstAdvancedTabButton) {
            firstAdvancedTabButton.click(); // Simulate a click on the first tab button to show its content
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
// Looking into JSON RPC.js
document.addEventListener("DOMContentLoaded", function() {

    let selectedLanguage = document.getElementById("languageSelect").value; 



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





// -------------------------------- Language Selection --------------------------------
function updateLanguageSetting(language) { 
    const data = {
        id: 2,
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

// -------------------------------- Rescan Settings folder --------------------------------

function rescanMediaForm(form) {
    console.log("Rescan button clicked");

    let folderPath = form["pref_mediadirs0"].value;
    console.log("Captured folder path:", folderPath);

   
    if (folderPath) {
        console.log("Rescan put in for folder path:", folderPath);
        updateMediaDirSetting(folderPath);
    } else {
        console.error("Folder path is empty. Please input a valid path.");
    }    
}



function updateMediaDirSetting(folderPath) {
    const formattedPath = [folderPath];

    const data = {
        id: 1,
        method: "slim.request",
        params: [ "", ["pref", "mediadirs", formattedPath]]
    };


    console.log("Sending this data to server:", data); // DEBUG

    fetch("http:localhost:9000/capstone/jsonrpc.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Media directory updated to:", data);
    })
    .catch(error => {
        console.error("Error updating media directory:", error);
    });
}

// --------------------------------  Playlists Directory folder --------------------------------

function playlistsDirectoryForm(form) {
    console.log("playList Direrctor button clicked");


    let folderPath = form["pref_playlistdir0"].value;
    console.log("Captured folder path for playlists:", folderPath);

   
    if (folderPath) {
        console.log("Playlist directory put in for folder path:", folderPath);
        updatePlaylistPath(folderPath);
    } else {
        console.log("Updated to blank, meaning you don't want to save playlists");
        updatePlaylistPath('');

    }    
}



function updatePlaylistPath(folderPath) {

    // const formattedPath = [folderPath];

    const data = {
        id: 3,
        method: "slim.request",
        params: [ "", ["pref", "playlistdir", folderPath]]
    };


    console.log("Sending this data to server:", data); // DEBUG

    fetch("http:localhost:9000/capstone/jsonrpc.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Playlist directory updated to:", data);
    })
    .catch(error => {
        console.error("Error updating playlist directory:", error);
    });
}

// --------------------------------  Media Library Name  --------------------------------

function libraryNameForm(form) {
    console.log("playList Direrctor button clicked");


    let libraryName = form["pref_libraryname0"].value;
    console.log("library Name :", libraryName);

   
    if (libraryName) {
        console.log("Playlist directory put in for folder path:", libraryName);
        updatelibraryName(libraryName);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updatelibraryName('');

    }    
}



function updatelibraryName(libraryName) {

    const data = {
        id: 3,
        method: "slim.request",
        params: [ "", ["pref", "libraryname", libraryName]]
    };


    fetch("http:localhost:9000/capstone/jsonrpc.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Library name updated to:", data);
    })
    .catch(error => {
        console.error("Error updating  Library name:", error);
    });
}

// --------------------------------  Browse Artists (Unified Artists)  --------------------------------

function unifiedArtistsForm(form) {

    let unifiedArtists = form["pref_useUnifiedArtistsList"].value;
    console.log("Unified Artists:", unifiedArtists);

    if (unifiedArtists !== undefined && (unifiedArtists === "0" || unifiedArtists === "1")) {
        console.log("Submitting unified artists preference: (0 or 1)", unifiedArtists);
        updateUnifiedArtists(unifiedArtists);
    } else {
        console.error("Invalid value for unified artists selection");
    }   
}



function updateUnifiedArtists(unifiedArtists) {
    
    const data = {
        id: 4,
        method: "slim.request",
        params: [ "", ["pref", "useUnifiedArtistsList", unifiedArtists]]
    };

    fetch("http:localhost:9000/capstone/jsonrpc.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Browse Artists updated to:", data);
    })
    .catch(error => {
        console.error("Error updating UnifiedArtists name:", error);
    });
}


// --------------------------------  Enabling Release Types for Albums (Or ignorring)  --------------------------------

function ignoreReleaseTypesForm(form) {
    let ignoreReleaseTypes = form["pref_ignoreReleaseTypes"].value;

    console.log("Ignore Release types:", ignoreReleaseTypes);

    if ((ignoreReleaseTypes === "0" || ignoreReleaseTypes === "1")) {
        console.log("Submitting preferences:", { ignoreReleaseTypes });
        updateIgnoreReleaseTypes(ignoreReleaseTypes); 
    } else {
        console.error("Invalid value for genre or role filter selection");

    }
}


function updateIgnoreReleaseTypes(ignoreReleaseTypes) {
    const data = {
        id: 7,
        method: "slim.request",
        params: [ "", ["pref", "ignoreReleaseTypes", ignoreReleaseTypes]]

    };

    fetch("http://localhost:9000/capstone/jsonrpc.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("ignoreReleaseTypes updated:", data);
    })
    .catch(error => {
        console.error("Error updating filters:", error);
    });
}


// --------------------------------  Recognising EPs and singles  --------------------------------
function cleanupReleaseTypesForm(form) {
    const cleanupReleaseTypes = form["pref_cleanupReleaseTypes"].value ? '1' : '0';

    console.log("Recognising Release types:", cleanupReleaseTypes);

    if ((cleanupReleaseTypes === '0' || cleanupReleaseTypes === '1')) {
        updateCleanupReleaseTypes(cleanupReleaseTypes); 
        console.log("Submitting preferences:", { cleanupReleaseTypes });
    } else {
        console.error("Invalid value for Recognising EPs And singles");

    }


}

function updateCleanupReleaseTypes(cleanupReleaseTypes) {
    const data = {
        id: 8,
        method: "slim.request",
        params: ["pref", "cleanupReleaseTypes", cleanupReleaseTypes]
    };

    fetch("http://localhost:9000/capstone/jsonrpc.js", {
        method: "POST",
        headers: {
             "Content-Type": "application/json" 
            },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Cleanup Release Types updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Cleanup Release Types:", error);
    });
}

// --------------------------------  Release Types to Include (Grouping) --------------------------------
function groupArtistAlbumsByReleaseTypeForm(form) {
    let groupReleaseTypes = form["pref_groupArtistAlbumsByReleaseType"].value;

    console.log("groupArtistAlbumsByReleaseType:", groupReleaseTypes);

    if ((groupReleaseTypes === "0" || groupReleaseTypes === "1" || groupReleaseTypes === "2")) {
        console.log("Submitting preferences:", { groupReleaseTypes });
        updateGroupArtistAlbumsByReleaseType(groupReleaseTypes); 
    } else {
        console.error("Invalid value for genre or role filter selection");

    }
}


function updateGroupArtistAlbumsByReleaseType(groupReleaseTypes) {
    const data = {
        id: 11,
        method: "slim.request",
        params: [ "", ["pref", "groupArtistAlbumsByReleaseType", groupReleaseTypes]]

    };

    fetch("http://localhost:9000/capstone/jsonrpc.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("groupArtistAlbumsByReleaseType updated:", data);
    })
    .catch(error => {
        console.error("Error updating filters:", error);
    });
}

// --------------------------------  Tag Format setttings --------------------------------
function tagFormatForm(form) {
    let tagFormat = form["pref_useTPE2AsAlbumArtist"].value;

    console.log("pref_useTPE2AsAlbumArtist:", tagFormat);

    if ((tagFormat === "0" || tagFormat === "1")) {
        console.log("Submitting preferences:", { tagFormat });
        updateTagFormat(tagFormat); 
    } else {
        console.error("Invalid value for genre or role filter selection");

    }
}


function updateTagFormat(tagFormat) {
    const data = {
        id: 11,
        method: "slim.request",
        params: [ "", ["pref", "useTPE2AsAlbumArtist", tagFormat]]

    };

    fetch("http://localhost:9000/capstone/jsonrpc.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("useTPE2AsAlbumArtist updated:", data);
    })
    .catch(error => {
        console.error("Error updating filters:", error);
    });
}
// --------------------------------  Change Compilation Name  --------------------------------

function changeCompilationNameForm(form) {
    let compilationName = form["variousArtistsString"].value;
    console.log("Compialtion  :", compilationName);

   
    if (compilationName) {
        console.log("Compilation Name", compilationName);
        udpateChangeCompilationName(compilationName)
        } else {
        console.log("Updated to blank, meaning iot will be default. Various Artists");
        udpateChangeCompilationName('')
    }    
}



function udpateChangeCompilationName(compilationName) {

    const data = {
        id: 3,
        method: "slim.request",
        params: [ "", ["pref", "variousArtistsString", compilationName]]
    };


    fetch("http:localhost:9000/capstone/jsonrpc.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Compilation name updated to:", data);
    })
    .catch(error => {
        console.error("Error updating  Library name:", error);
    });
}


// --------------------------------  Search within words --------------------------------
function searchWithinWordForm(form) {
    let searchWithinWords = form["pref_searchSubString"].value;

    console.log("searchWithinWords:", searchWithinWords);

    if ((searchWithinWords === "0" || searchWithinWords === "1")) {
        console.log("Submitting preferences:", { searchWithinWords });
        updateSearchWithinWords(searchWithinWords); 
    } else {
        console.error("Invalid value search within words selection");

    }
}


function updateSearchWithinWords(searchWithinWords) {
    const data = {
        id: 13,
        method: "slim.request",
        params: [ "", ["pref", "searchSubString", searchWithinWords]]

    };

    fetch("http://localhost:9000/capstone/jsonrpc.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Search substring updated:", data);
    })
    .catch(error => {
        console.error("Error updating filters:", error);
    });
}



// --------------------------------  Ignored Articles --------------------------------
function ignoreArticlesForm(form) {
    let ignoredarticles = form["pref_ignoredarticles"].value;

    console.log("ignoredarticles:", ignoredarticles);

        console.log("Submitting preferences:", { ignoredarticles });
        updateIgnoredArticles(ignoredarticles); 


}

//ignoredarticles
function updateIgnoredArticles(ignoredarticles) {
    const data = {
        id: 13,
        method: "slim.request",
        params: [ "", ["pref", "ignoredarticles", ignoredarticles]]

    };

    fetch("http://localhost:9000/capstone/jsonrpc.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Search substring updated:", data);
    })
    .catch(error => {
        console.error("Error updating filters:", error);
    });
}

// --------------------------------  Library Filters  --------------------------------

// --------  Genres for Albumms and Tracks  --------
function noGenreFilterForm(form) {
    let noGenreFilter = form["pref_noGenreFilter"].value;

    console.log("No Genre Filter:", noGenreFilter);

    if ((noGenreFilter === "0" || noGenreFilter === "1")) {
        console.log("Submitting preferences:", { noGenreFilter });
        updateGenreLibraryFilter(noGenreFilter); 
    } else {
        console.error("Invalid value for genre or role filter selection");

    }
}


function updateGenreLibraryFilter(noGenreFilter) {
    const data = {
        id: 5,
        method: "slim.request",
        params: [ "", ["pref", "noGenreFilter", noGenreFilter]]

    };

    fetch("http://localhost:9000/capstone/jsonrpc.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("No genre Filter updated:", data);
    })
    .catch(error => {
        console.error("Error updating filters:", error);
    });
}

// --------  Contributor Roles  --------

function noRoleFilterForm(form) {
    console.log("Form received:", form);  // Debug form element


    let noRoleFilter = form["pref_noRoleFilter"].value;
    console.log("Role Filter:", noRoleFilter);

    if ((noRoleFilter === "0" || noRoleFilter === "1")) {
        console.log("Submitting preferences:", { noRoleFilter });
        updateRoleLibraryFilter(noRoleFilter); 
    } else {
        console.error("Invalid value for genre or role filter selection");

    }
}


function updateRoleLibraryFilter(noRoleFilter) {
    const data = {
        id: 6,
        method: "slim.request",
        params: [ "", ["pref", "noRoleFilter", noRoleFilter]]

    };

    fetch("http://localhost:9000/capstone/jsonrpc.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("No Role Filter updated:", data);
    })
    .catch(error => {
        console.error("Error updating filters:", error);
    });
}




// --------  Age Limit (Amount of albums that display) --------
function ageLimitForm(form) {
    let ageLimitFilter = form["pref_browseagelimit"].value;
        console.log("Role Filter:", ageLimitFilter);

   
        updateAgeLimitFilter(ageLimitFilter); 
   
}


function updateAgeLimitFilter(ageLimitFilter) {
    const data = {
        id: 15,
        method: "slim.request",
        params: [ "", ["pref", "browseagelimit", ageLimitFilter]]

    };

    fetch("http://localhost:9000/capstone/jsonrpc.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Age Limit (albums) updated:", data);
    })
    .catch(error => {
        console.error("Error updating filters:", error);
    });
}



// --------  Group Discs --------


function groupDiscsForm(form) {

    let groupDiscs = form["pref_groupdiscs"].value;
    console.log("Group Discs:", groupDiscs);

    if (groupDiscs !== undefined && (groupDiscs === "0" || groupDiscs === "1")) {
        console.log("Submitting unified artists preference: (0 or 1)", groupDiscs);
        updategroupDiscs(groupDiscs);
    } else {
        console.error("Invalid value for unified artists selection");
    }   
}



function updategroupDiscs(groupDiscs) {
    
    const data = {
        id: 17,
        method: "slim.request",
        params: [ "", ["pref", "groupdiscs", groupDiscs]]
    };

    fetch("http:localhost:9000/capstone/jsonrpc.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Group Discs updated to:", data);
    })
    .catch(error => {
        console.error("Error updating groupDiscs:", error);
    });
}




// --------  Playlist Persistence --------


function playlistPersistForm(form) {

    let playlistPersist = form["pref_persistPlaylists"].value;
    console.log("Group Discs:", playlistPersist);

    if (playlistPersist !== undefined && (playlistPersist === "0" || playlistPersist === "1")) {
        updatePlaylistPersist(playlistPersist);
    } else {
        console.error("Invalid value for Playlist Perrsist selection");
    }   
}



function updatePlaylistPersist(playlistPersist) {
    
    const data = {
        id: 18,
        method: "slim.request",
        params: [ "", ["pref", "persistPlaylists", playlistPersist]]
    };

    fetch("http:localhost:9000/capstone/jsonrpc.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("persistPlaylists updated to:", data);
    })
    .catch(error => {
        console.error("Error updating persistPlaylists:", error);
    });
}

// --------  Save Shuffled Playlists --------

function saveShuffledPlaylistForm(form) {

    let saveShuffledPlaylst = form["pref_saveShuffled"].value;
    console.log("Save Shuffled:", saveShuffledPlaylst);

    if (saveShuffledPlaylst !== undefined && (saveShuffledPlaylst === "0" || saveShuffledPlaylst === "1")) {
        updateShuffledPlaylist(saveShuffledPlaylst);
    } else {
        console.error("Invalid value for Playlist Perrsist selection");
    }   
}



function updateShuffledPlaylist(shuffledPlaylist) {
    
    const data = {
        id: 19,
        method: "slim.request",
        params: [ "", ["pref", "saveShuffled", shuffledPlaylist]]
    };

    fetch("http:localhost:9000/capstone/jsonrpc.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("persistPlaylists updated to:", data);
    })
    .catch(error => {
        console.error("Error updating persistPlaylists:", error);
    });
}


// --------  Reshuffle On Repeat --------

function reshuffleOnRepeatForm(form) {

    let reshuffleOnRepeat = form["pref_reshuffleOnRepeat"].value;
    console.log("Save Shuffled:", reshuffleOnRepeat);

    if (reshuffleOnRepeat !== undefined && (reshuffleOnRepeat === "0" || reshuffleOnRepeat === "1")) {
        updateReshuffleOnRepeat(reshuffleOnRepeat);
    } else {
        console.error("Invalid value for pref_reshuffleOnRepeat");
    }   
}



function updateReshuffleOnRepeat(reshuffleOnRepeat) {
    
    const data = {
        id: 20,
        method: "slim.request",
        params: [ "", ["pref", "reshuffleOnRepeat", reshuffleOnRepeat]]
    };

    fetch("http:localhost:9000/capstone/jsonrpc.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("reshuffleOnRepeat updated to:", data);
    })
    .catch(error => {
        console.error("Error updating reshuffleOnRepeat:", error);
    });
}




// ------- BENS SETTINGS FUNCTIONS ------

// ----- Update Coverart ---
function coverArtForm(form) {
    let coverArt = form["pref_coverArt"].value;
    console.log("Cover Art :", coverArt);

   
    if (coverArt) {
        console.log("Cover Artwork default location:", coverArt);
        updateCoverArt(coverArt);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updateCoverArt('');

    }    
}

function updateCoverArt(coverArt) {

    const data = {
        id: 14,
        method: "slim.request",
        params: [ "", ["pref", "coverArt", coverArt]]
    };


    fetch("http:localhost:9000/capstone/jsonrpc.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Cover Art default updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Cover Art:", error);
    });
}

// ----- Update Artwork Folder -----
function artFolderForm(form) {
    let artFolder = form["pref_artfolder"].value;
    console.log("Artwork Folder :", artFolder);

   
    if (artFolder) {
        console.log("Artwork Folder location:", artFolder);
        updateArtFolder(artFolder);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updateArtFolder('');

    }    
}

function updateArtFolder(artFolder) {

    const data = {
        id: 15,
        method: "slim.request",
        params: [ "", ["pref", "artfolder", artFolder]]
    };


    fetch("http:localhost:9000/capstone/jsonrpc.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Artwork Folder updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Artwork Folder:", error);
    });
}




// document.getElementById('allSongs').addEventListener('click', function() {
//     // Create the JSON-RPC request to get the media directories
//     const data = {
//         id: 1,
//         method: "slim.request",
//         params: [0, ["pref", "mediadirs"]] 
//     };

//     fetch("http://161.29.197.94.localhost:9000/capstone/jsonrpc.js", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.result) {
//             const folderPath = data.result; // Get the directory path
//             console.log("Media directory path:", folderPath);
//         } else {
//             console.error("No result found:", data);
//         }
//     })
//     .catch(error => {
//         console.error("Error fetching media directories:", error);
//     });
// });

