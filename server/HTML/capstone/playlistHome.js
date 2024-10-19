
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
    var musicInfoPanel = document.querySelector('.musicInfoPanel');
    var infoPanelBtn = document.querySelector('.infoPanelBtn');


    infoPanelBtn.addEventListener('click', function () {
        if(!overallPlaylistContainer.classList.contains('hidden')) {
            overallPlaylistContainer.classList.add('hidden');
            animationBtn.classList.add('hidden');
                overallContainer.style.display = 'none';
        }

        if(musicInfoPanel.classList.contains('hidden')) {
            musicInfoPanel.classList.remove('hidden');
        } else {
            musicInfoPanel.classList.add('hidden');
        }
            
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var overallPlaylistContainer = document.querySelector('.overallPlaylistContainer');
    var overallContainer = document.querySelector('.overallContainer');
    var animationBtn = document.querySelector('.animationBtn');
    var musicInfoPanel = document.querySelector('.musicInfoPanel');
    
    // Set initial state (only the button should be visible)
    overallContainer.style.display = 'none';  // overallContainer is hidden initially
   
    overallPlaylistContainer.classList.add('hidden');
    animationBtn.classList.remove('hidden');
    
    musicInfoPanel.classList.add('hidden');

    // Event listener for the animation button
    animationBtn.addEventListener('click', function () {
        // Toggle the display of the overallContainer
        if (overallContainer.style.display === 'none') {
            overallContainer.style.display = 'flex';
            overallPlaylistContainer.classList.remove('hidden');

            // hide right bar

            if(!musicInfoPanel.classList.contains('hidden')) {
                musicInfoPanel.classList.add('hidden');
            }
        } else {
            overallPlaylistContainer.classList.add('hidden');
                overallContainer.style.display = 'none';
        }

        animationBtn.classList.toggle('hidden');

    });
});

// ------------------------ Code to fetch all Songs ------------------------
const allSongsButton = document.getElementById('allSongs');

if (allSongsButton) {
    allSongsButton.addEventListener('click', function() {
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
}





// ------------------------ Code to fetch all Albums ------------------------
const allAlbumsButton = document.getElementById('allAlbums');

if(allAlbumsButton) {
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
}



// ------------------------ Code to fetch all Artists  ------------------------
const allArtistsButton = document.getElementById('allArtists');

if(allArtistsButton) {
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
}

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
        `<h3 class="radioTuneInTitle">Radio Tune In</h3>

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

// ------------------------ Code to fetch all Favourites ------------------------
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('allFavourites').addEventListener('click', function() {
        // Create a new container for the favourites
        var newFavouritesContainer = document.createElement('div');
        newFavouritesContainer.classList.add('newFavouritesContainer');

        var animationBtn = document.querySelector('.animationBtn');
        if (animationBtn) {
            animationBtn.style.display = 'none';
        }

        // Add back button and header
        newFavouritesContainer.innerHTML = 
            `<h3 class="favouritesTitle">Favourites</h3>
            <button class="backButton">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 1024 1024">
                    <path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"/>
                    <path fill="#ffffff" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"/>
                </svg>
            </button>
            <div id="favouritesList"></div>`; 

        // Append the new container to the body
        document.body.appendChild(newFavouritesContainer);

        // Clone the favouritesList element to avoid issues with the original
        var favouritesList = document.querySelector('.favouritesList').cloneNode(true);
        favouritesList.style.display = 'block'; // Display it
        newFavouritesContainer.querySelector('#favouritesList').appendChild(favouritesList);

        // Show the new container
        newFavouritesContainer.style.display = 'block'; // Make sure it's visible
        setTimeout(function () {
            newFavouritesContainer.classList.add('showNewFavouritesContainer');
        }, 10);

        // Back Button functionality
        newFavouritesContainer.querySelector('.backButton').addEventListener('click', function () {
            newFavouritesContainer.classList.remove('showNewFavouritesContainer');
            setTimeout(function () {
                newFavouritesContainer.remove();
                if (animationBtn) {
                    animationBtn.style.display = 'block';
                }
            }, 500); // Animation time + back functionality
        });
    });
});






// // --------------------------- Iframe --------------------------------------
// const iframe = document.getElementById('songsIframe');

// // Send a message to the iframe once it loads
// iframe.onload = function() {
//     iframe.contentWindow.postMessage({ color: '#adffc3', font: 'Arial' }, '*');
// };

// window.addEventListener('message', function(event) {
//     document.body.style.backgroundColor = event.data.color; // Set text color
//     document.body.style.fontFamily = event.data.font; // Set font family
// });



// --------------- Settings Button ------------------------
// Event listener for the settings button
document.addEventListener('DOMContentLoaded', function() {
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
        <!-- Commented out the first 2 as they have been added as their own -->
            <!-- <button class="tabButton active" data-tab="music">Music</button>
            <button class="tabButton" data-tab="plugins">Plugins</button> -->



            <button class="tabButton" data-tab="basic-info">Basic Settings</button>
            <button class="tabButton" data-tab="interface">Interface</button>
            <button class="tabButton" data-tab="media-library-management">Media Library Management </button>
        </div>
        <div class="settingsContent">
            <div class="tabContent" id="music">
                <p class="settingsTextContent">My Music</p>
                <p class="settingsTextContent">Itunes</p>
                <p class="settingsTextContent">Interface and Player</p>
            </div>
            <div class="tabContent" id="plugins">
                <p class="settingsTextContent">Manage Plugins</p>
            </div>
            <div class="tabContent active" id="basic-info">
                <div class="basicSettingsContent"></div>
            </div>
            <div class="tabContent" id="interface">
                <div class="interfaceSettingsContent"></div>
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

                // DISPLAY DATA FUNCTIONS
                getPref('artfolder', 'art-folder');
                getPref('coverArt', 'cover-art');
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


        // Interface Content
        const interfaceSettingsContent = settingsContainer.querySelector('.interfaceSettingsContent');
        if(interfaceSettingsContent){
            const interfaceSettings = document.querySelector('.interfaceSettings')?.innerHTML || '';
            interfaceSettingsContent.innerHTML = interfaceSettings;
        } else {
            console.error('.interfaceSettingsContent element not found.');
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

        // ---------- INTERFACE SETTINGS ----------
        const buttonClassesInterface =[
            '.interfaceSettingsDisplayTabButton',
            '.interfaceSettingsFormatTabButton',
            '.interfaceSettingsTimingTabButton'
        ];
        const interfaceSettingsTabsButtons = settingsContainer.querySelectorAll(buttonClassesInterface.join(', '));

        const interfaceContentClasses=[
            '.interfaceSettingsDisplayTab',
            '.interfaceSettingsFormatTab',
            '.interfaceSettingsTimingTab'
        ];
        const interfaceSettingsTabContent = settingsContainer.querySelectorAll(interfaceContentClasses.join(', '));


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
            '.advancedSettingsFormatTabButton',
            '.advancedSettingsServerStatusTabButton',
            '.advancedSettingsNetworkTabButton',
            '.advancedSettingsPerformanceTabButton',
            '.advancedSettingsSecurityTabButton',
            '.advancedSettingsSoftwareUpdateTabButton'
        ];
        const advancedSettingsTabsButtons = settingsContainer.querySelectorAll(advancedSettingsButtonClasses.join(', '));

        const advancedSettingsContentClasses = [
            '.advancedSettingsMediaLibraryManagementTab', // 
            '.advancedSettingsFileTypesTab',
            '.advancedSettingsFormatTab',
            '.advancedSettingsServerStatusTab',
            '.advancedSettingsNetworkTab', //
            '.advancedSettingsPerformanceTab',
            '.advancedSettingsSecurityTab',
            '.advancedSettingsSoftwareUpdateTab'
        ];
        const advancedSettingsTabContent = settingsContainer.querySelectorAll(advancedSettingsContentClasses.join(', '));
    
        // Function to hide all tab contents
        function hideAllTabsContent() {
            basicSettingsTabsContent.forEach(tab => {
                tab.style.display = 'none'; 
                tab.classList.remove('active'); // Remove active class
            });
        }

        // Function to hide all interface contents
        function hideAllInterfaceContent() {
            interfaceSettingsTabContent.forEach(tab => {
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

        // Show interface container
        function showInterfaceSettings(){
            const interfaceSettingsContainer = settingsContainer.querySelector('.interfaceSettings');
            if(interfaceSettingsContainer) {
                interfaceSettingsContainer.style.display = 'block';
                // get functionTODO 
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

        // Hide interface settings
        function hideInterfaceSettings() {
            const interfaceSettingsContainer = settingsContainer.querySelector('.interfaceSettings');
            if(interfaceSettingsContainer) {
                interfaceSettingsContainer.style.display = 'none';
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

        // Add click event listeners to each interface tab button
        interfaceSettingsTabsButtons.forEach(button => {
            button.addEventListener('click', function() {
                showInterfaceSettings();
                hideAllInterfaceContent();
                interfaceSettingsTabsButtons.forEach(btn => btn.classList.remove('active'));
                const selectedTabId = this.getAttribute('data-tab');
                const selectedTabContent = settingsContainer.querySelector(`#interfaceSettings${selectedTabId}`);
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
        hideInterfaceSettings();
    
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
            
            deleteDuplicates('softwareIframe')
            const softwareIframe = document.getElementById('softwareIframe');
            softwareIframe.src = 'settings/server/software.html'
            softwareIframe.onload = function () {
                // console.log(softwareIframe)
                // console.log('load software iframe')
                let timerId = setInterval(() => {
                    const iframeDocument = softwareIframe.contentDocument || softwareIframe.contentWindow.document;

                    // 获取 body 的高度
                    const bodyHeight = iframeDocument.body.scrollHeight;
                    if (bodyHeight > 0) {
                        // console.log('Iframe 内部 body 的高度:', bodyHeight);
                        softwareIframe.setAttribute('style', 'height: ' + (bodyHeight + 50) + 'px')
                        const elements = iframeDocument.getElementsByClassName('stdclick')
                        console.log(elements)
                        for (let i = 0; i < elements.length; i++) {
                            if (elements[i].name === 'checkForUpdateNow') {
                                targetElement = elements[i];
                                targetElement.style.backgroundColor = '#0456C6';
                                targetElement.style.color = '#ecf0f1'; // Light text color
                                targetElement.style.border = 'none';
                                targetElement.style.borderRadius = '5px';
                                targetElement.style.padding = '0.8em 1.5em';
                                targetElement.style.fontSize = '0.7em';
                                targetElement.style.fontWeight = 'bold';
                                targetElement.style.marginTop = '10px';
                                targetElement.style.width = '100%';
                                targetElement.style.cursor = 'pointer';
                                targetElement.style.transition = 'background-color 0.3s, transform 0.2s';
                                targetElement.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)'; // Soft shadow
                                break
                            }
                        }
                        clearInterval(timerId)
                    }
                }, 100)
            }
        }
    }
    
    function deleteDuplicates(id) {
        const duplicates = document.querySelectorAll('[id="' + id + '"]');
        if (duplicates.length > 1) {
            for (let i = 0; i < duplicates.length - 1; i++)
                duplicates[i].remove();
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
});




// ----------------- Save settings, speciifically Language -----------------
// Looking into JSON RPC.js
document.addEventListener("DOMContentLoaded", function() {

    let selectedLanguage = document.getElementById("languageSelect").value; 

    // security page
    // const securityIframe = document.getElementById('securityIframe');
    // securityIframe.onload = function() {
    //     const outerDiv = document.getElementsByClassName('settingsContainerClicked')[0];
    //     const innerDiv = document.getElementById('security');

    //     const outerRect = outerDiv.getBoundingClientRect();
    //     const outerBottom = outerRect.bottom;

    //     const innerRect = innerDiv.getBoundingClientRect();
    //     const innerTop = innerRect.top;

    //     const distanceToOuterBottom = outerBottom - innerTop;

    //     console.log('内部 div 顶部到外部 div 底部的距离:', distanceToOuterBottom);
    // }
    // securityIframe.src = 'settings/server/security.html';

    

    

    // Event delegation for click events
    document.body.addEventListener('click', function(e) {
        // console.log('clicked', e)
        // Handle language selection change
        let currentActivePage = 'Language'

        // language selection
        if (e.target && e.target.id === "languageSelect") {
            selectedLanguage = e.target.value; // Update variable on change
            console.log("Language select changed to (languageSelect statement):", selectedLanguage);
        }



        // security selections
        function handleInput (type, value) {
            // console.log(type, e.target.value)
            switch (type) {
                case 'username': 
                    username = value
                    break
                case 'password': 
                    password = value
                    break
                case 'allowedHosts': 
                    allowedIPAddresses = value
                    break
                case 'corsAllowedHosts':
                    corsAllowedHosts = value
                    break
            }
        }

        if (e.target && e.target.id === "authorize") {
            passwordProtection = e.target.value;
            console.log("authorize change to ", passwordProtection);
        }
        if (e.target && e.target.id === "username") {
            e.target.removeEventListener('input', handleInput)
            e.target.addEventListener('input', (e) => handleInput('username', e.target.value))
        }
        if (e.target && e.target.id === "password") {
            e.target.removeEventListener('input', handleInput)
            e.target.addEventListener('input', (e) => handleInput('password', e.target.value))
        }
        if (e.target && e.target.id === "filterHosts") {
            blockIncomingConnection = e.target.value;
        }
        if (e.target && e.target.id === "allowedHosts") {
            e.target.removeEventListener('input', handleInput)
            e.target.addEventListener('input', (e) => handleInput('allowedHosts', e.target.value))
        }
        if (e.target && e.target.id === "csrfProtectionLevel") {
            csrfProtectionLevel = e.target.value;
        }
        if (e.target && e.target.id === "corsAllowedHosts") {
            e.target.removeEventListener('input', handleInput)
            e.target.addEventListener('input', (e) => handleInput('corsAllowedHosts', e.target.value))
        }
        if (e.target && e.target.id === "insecureHTTPS") {
            insecureHTTPS = e.target.value;
        }

        // Check if the test button was clicked
        if (e.target && e.target.id === 'testButton') {
            console.log('testButton clicked');
        } 
        
        // Check if the save settings button was clicked
        // if (e.target && e.target.id === 'saveSettings') {
        //     e.preventDefault(); // Prevent default behavior

        //     // check active page
        //     const buttons = document.querySelectorAll('.basicSettingsTabs button');
        //     // console.log(buttons)
        //     buttons.forEach(button => {
        //         if (button.classList.contains('active')) {
        //             // console.log('Active button found:', button);
        //             currentActivePage = button.textContent
        //         }
        //     });

        //     console.log("Save Settings BUTTON CLICKED");
        //     console.log("Selected language inside saveSettings:", selectedLanguage); // Log the selected language

        //     // Send a JSON-RPC request to update the language in the server.prefs file
        //     console.log("current active page", currentActivePage)

        //     switch (currentActivePage) {
        //         case 'Language':
        //             updateLanguageSetting(selectedLanguage);
        //             break
        //         case 'Security':
        //             updateSecuritySetting(passwordProtection, username, password, blockIncomingConnection, allowedIPAddresses, csrfProtectionLevel, corsAllowedHosts, insecureHTTPS)
        //             break
        //     }
            
        // }

    });
});





// -------------------------------- Language Selection --------------------------------


function updateLanguageSettingForm(form) {
    console.log("LanguageSetting Clicked");

    let langauge = form["pref_language"].value;
    console.log("Lnagugae", langauge);
    
    updateLanguageSetting(langauge);
    
}


function updateLanguageSetting(language) { 
    const data = {
        id: 2,
        method: "slim.request",
        params: [0, ["pref", "language", language]] 
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
    .then(response => {
        console.log(response.json())
    })
    .then(data => {
        console.log("Media directory updated to:", data);
    })
    .catch(error => {
        console.error("Error updating media directory:", error);
    });
}

// ------------- Security selection  -------------
function updateSecuritySetting(passwordProtection, username, password, blockIncomingConnection, allowedIPAddresses, csrfProtectionLevel, corsAllowedHosts, insecureHTTPS) { 
    // console.log("now update ",passwordProtection, username, password, blockIncomingConnection, allowedIPAddresses, csrfProtectionLevel, corsAllowedHosts, insecureHTTPS)

    async function updateSecurityData (data) {
        fetch("<http:localhost:9000>/capstone/jsonrpc.js", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(async (response) => {
            console.log(await response.json())
        })
        .then(data => {
            console.log("Security updated:", data);
        })
        .catch(error => {
            console.error("Error updating:", error);
        });
    }

    // console.log('settingData', settingData)
    const passwordProtectionData = {
        id: 2,
        method: "slim.request",
        params: [0, ["pref", "authorize", passwordProtection]] 
    };
    updateSecurityData (passwordProtectionData)
    const usernameData = {
        id: 2,
        method: "slim.request",
        params: [0, ["pref", "username", username]] 
    };
    updateSecurityData (usernameData)
    const passwordData = {
        id: 2,
        method: "slim.request",
        params: [0, ["pref", "password", password]] 
    };
    updateSecurityData (passwordData)
    const blockIncomingConnectionData = {
        id: 2,
        method: "slim.request",
        params: [0, ["pref", "filterHosts", blockIncomingConnection]] 
    };
    updateSecurityData (blockIncomingConnectionData)
    const allowedIPAddressesData = {
        id: 2,
        method: "slim.request",
        params: [0, ["pref", "allowedHosts", allowedIPAddresses]] 
    };
    updateSecurityData (allowedIPAddressesData)
    const csrfProtectionLevelData = {
        id: 2,
        method: "slim.request",
        params: [0, ["pref", "csrfProtectionLevel", csrfProtectionLevel]] 
    };
    updateSecurityData (csrfProtectionLevelData)
    const corsAllowedHostsData = {
        id: 2,
        method: "slim.request",
        params: [0, ["pref", "corsAllowedHosts", corsAllowedHosts]] 
    };
    updateSecurityData (corsAllowedHostsData)
    const insecureHTTPSData = {
        id: 2,
        method: "slim.request",
        params: [0, ["pref", "insecureHTTPS", insecureHTTPS]] 
    };
    updateSecurityData (insecureHTTPSData).then(() => {
        alert("Settings Saved!")
    })
    
}

function playlistsDirectoryForm(form) {
    console.log("playList Directory button clicked");


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
    console.log("playList Directory button clicked");


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




// --------------------------------  Skip Sentinel FileName --------------------------------
function skipSentinelFileNameForm(form) {
    let skipSentinel = form["pref_skipsentinel"].value;

    console.log("skipSentinel:", skipSentinel);

        console.log("Submitting preferences:", { skipSentinel });
        updateSkipSentinel(skipSentinel); 


}

//skipSentinel
function updateSkipSentinel(skipSentinel) {
    const data = {
        id: 13,
        method: "slim.request",
        params: [ "", ["pref", "skipsentinel", skipSentinel]]

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
        console.log("skipsentinel updated:", data);
    })
    .catch(error => {
        console.error("Error updating filters:", error);
    });
}


// --------------------------------  Seperrator for multiple items in tags --------------------------------
function seperatorMultipleItemsTagsForm(form) {
    let seperatorMultipleItemTags = form["pref_splitList"].value;

    console.log("seperator:", seperatorMultipleItemTags);

        console.log("Submitting preferences:", { seperatorMultipleItemTags });
        updateSeperatorMultipleItemTags(seperatorMultipleItemTags); 


}

//seperatorMultipleItemTags
function updateSeperatorMultipleItemTags(seperatorMultipleItemTags) {
    const data = {
        id: 22,
        method: "slim.request",
        params: [ "", ["pref", "splitList", seperatorMultipleItemTags]]

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
        console.log("seperatorMultipleItemTags updated:", data);
    })
    .catch(error => {
        console.error("Error updating filters:", error);
    });
}

// --------------------------------  Advanced File Types - Disable Extension Audio  --------------------------------


function disableExtensionAudioForm(form) {
    let disabledExtensionsAudio = form["disabledextensionsaudio"].value;
    console.log("disabledextensionsaudio  :", disabledExtensionsAudio);

   
    if (disabledExtensionsAudio) {
        console.log("disabledextensionsaudio", disabledExtensionsAudio);
        updateDisableExtensionAudioForm(disabledExtensionsAudio)
        } else {
        console.log("Updated to blank, meaning it will be blank");
        updateDisableExtensionAudioForm('')
    }    
}



function updateDisableExtensionAudioForm(disabledExtensionsAudio) {

    const data = {
        id: 25,
        method: "slim.request",
        params: [ "", ["pref", "disabledextensionsaudio", disabledExtensionsAudio]]
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
        console.log("disabledextensionsaudio  updated to:", data);
    })
    .catch(error => {
        console.error("Error updating disabledextensionsaudio:", error);
    });
}





// --------------------------------  Disabled Playlist File Extensions  --------------------------------

function disableExtensionPlaylistForm(form) {
    let disabledExtensions = form["disabledextensionsplaylist"].value;

    console.log("disabledextensionsplaylist:", disabledExtensions);

        console.log("Submitting preferences:", { disabledExtensions });
        updateDisableExtensionPlaylistForm(disabledExtensions); 


}

function updateDisableExtensionPlaylistForm(disabledExtensions) {
    const data = {
        id: 24,
        method: "slim.request",
        params: [ "", ["pref", "disabledextensionsplaylist", disabledExtensions]]

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
        console.log("disabledextensionsplaylist updated:", data);
    })
    .catch(error => {
        console.error("Error updating filters:", error);
    });
}



// --------------------------------  Prioritise Native  --------------------------------
function checkBoxFileFormatForm(form) {
    const checkboxOrNot = form["pref_prioritizeNative"].value ? '1' : '0';

    console.log("Priortize Native:", checkboxOrNot);

    if ((checkboxOrNot === '1' || checkboxOrNot === '0')) {
        updatePriortizeNative(checkboxOrNot); 
        console.log("Submitting preferences:", { checkboxOrNot });
    } else {
        console.error("Invalid value for prioritize native");

    }


}
function updatePriortizeNative(checkboxOrNot) {
    const data = {
        id: 27,
        method: "slim.request",
        params: ["pref", "prioritizeNative", checkboxOrNot]
    };

    fetch("http://localhost:9000/capstone/jsonrpc.js", {
        method: "POST",
        headers: {
             "Content-Type": "application/json" 
            },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("prioritizeNative updated to:", data);
    })
    .catch(error => {
        console.error("Error updating prioritizeNative:", error);
    });
}


// ----------------- File type Conversions ----------------
function fileFormatConversionsForm(form) {
    let disabledFormats = []

    disabledFormats =     grabAllSelectNames(form);

    console.log("Disabled formats:", disabledFormats);

    // If there are any disabled formats, update the server
    if (disabledFormats.length > 0) {
        updateFileFormatConversion(disabledFormats);
    } else {
        console.log("No disabled formats found.");
    }

   
}



function updateFileFormatConversion(disabledFormats) {
    
    const data = {
        id: 29,
        method: "slim.request",
        params: [ "", ["pref", "disabledformats", disabledFormats]]
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
        console.log("Disabled Formats updated to:", data);
    })
    .catch(error => {
        console.error("Error updating disabled Formats name:", error);
    });
}


function grabAllSelectNames(form) {
    // Initialize an array to store disabled formats
    let disabledFormats = [];

    // Select all <select> elements within the form
    const formSelects = form.querySelectorAll('select');

    // Loop through each <select> element
    formSelects.forEach(select => {
        console.log("Select name:", select.name);
        console.log("Select disabled status:", select.disabled);
        console.log("Select value:", select.value);
        
        // Check if the select element itself is disabled
        if (select.value === "DISABLED") {
            console.log("Disabled format found (via disabled attribute):", select.name);
            // Add the name of the disabled format to the array
            disabledFormats.push(select.name);
        }
      
    });

    // Return the array of disabled formats
    return disabledFormats;
}

// -------- KONRADS SETTINGS FUNCTIONS ------

// --------  Web Proxy ------
function webProxyForm(form) {
    let webProxy = form["pref_webproxy"].value;
    console.log("Web Proxy:", webProxy);

    if (webProxy) {
        console.log("Web Proxy:", webProxy);
        updateWebProxy(webProxy);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updateWebProxy('');
    }
}

function updateWebProxy(webProxy) {
    const data = {
        id: 30,
        method: "slim.request",
        params: [ "", ["pref", "webproxy", webProxy]]
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
        console.log("Web Proxy updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Web Proxy:", error);
    });
}

// -------- PORT NUMBER ------
function portNumberForm(form) {
    let portNumber = form["pref_httpport"].value;
    console.log("Port Number:", portNumber);

    if (portNumber) {
        console.log("Port Number:", portNumber);
        updatePortNumber(portNumber);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updatePortNumber('');
    }
}

function updatePortNumber(portNumber) {
    const data = {
        id: 31,
        method: "slim.request",
        params: [ "", ["pref", "httpport", portNumber]]
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
        console.log("Port Number updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Port Number:", error);
    });
}

// -------- Radio Buffer Seconds ---------
function radioStationBufferSecondsForm(form) {
    let radioBufferSeconds = form["pref_bufferSecs"].value;
    console.log("Radio Buffer Seconds:", radioBufferSeconds);

    if (radioBufferSeconds) {
        console.log("Radio Buffer Seconds:", radioBufferSeconds);
        updateRadioBufferSeconds(radioBufferSeconds);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updateRadioBufferSeconds('');
    }
}

function updateRadioBufferSeconds(radioBufferSeconds) {
    const data = {
        id: 32,
        method: "slim.request",
        params: [ "", ["pref", "bufferSecs", radioBufferSeconds]]
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
        console.log("Radio Buffer Seconds updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Radio Buffer Seconds:", error);
    });
}

// -------- Remote Stream Timeout ---------
function radioStationTimeoutForm(form) {
    let radioTimeout = form["pref_remotestreamtimeout"].value;
    console.log("Radio Timeout:", radioTimeout);

    if (radioTimeout) {
        console.log("Radio Timeout:", radioTimeout);
        updateRadioTimeout(radioTimeout);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updateRadioTimeout('');
    }
}

function updateRadioTimeout(radioTimeout) {
    const data = {
        id: 33,
        method: "slim.request",
        params: [ "", ["pref", "remotestreamtimeout", radioTimeout]]
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
        console.log("Radio Timeout updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Radio Timeout:", error);
    });
}

// -------- max WMA Bitrate ---------
function maximumWMAStreamBitrateForm(form) {
    let maxWMAStreamBitrate = form["pref_maxWMArate"].value;
    console.log("Max WMA Bitrate:", maxWMAStreamBitrate);

    if (maxWMAStreamBitrate) {
        console.log("Max WMA Bitrate:", maxWMAStreamBitrate);
        updateMaxWMAStreamBitrate(maxWMAStreamBitrate);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updateMaxWMAStreamBitrate('');
    }
}

function updateMaxWMAStreamBitrate(maxWMAStreamBitrate) {
    const data = {
        id: 34,
        method: "slim.request",
        params: [ "", ["pref", "maxWMArate", maxWMAStreamBitrate]]
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
        console.log("Max WMA Bitrate updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Max WMA Bitrate:", error);
    });
}

// -------- max MP3 Stream Bitrate ---------
function syncStartDelayForm(form) {
    let syncStartDelay = form["pref_syncStartDelay"].value;
    console.log("Sync Start Delay:", syncStartDelay);

    if (syncStartDelay) {
        console.log("Sync Start Delay:", syncStartDelay);
        updateSyncStartDelay(syncStartDelay);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updateSyncStartDelay('');
    }
}

function updateSyncStartDelay(syncStartDelay) {
    const data = {
        id: 36,
        method: "slim.request",
        params: [ "", ["pref", "syncStartDelay", syncStartDelay]]
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
        console.log("Sync Start Delay updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Sync Start Delay:", error);
    });
}


// -------- TCP Read Maximum ---------
function tcpReadMaximumForm(form) {
    let tcpReadMaximum = form["pref_tcpReadMaximum"].value;
    console.log("TCP Read Maximum:", tcpReadMaximum);

    if (tcpReadMaximum) {
        console.log("TCP Read Maximum:", tcpReadMaximum);
        updateTCPReadMaximum(tcpReadMaximum);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updateTCPReadMaximum('');
    }
}

function updateTCPReadMaximum(tcpReadMaximum) {
    const data = {
        id: 37,
        method: "slim.request",
        params: [ "", ["pref", "tcpReadMaximum", tcpReadMaximum]]
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
        console.log("TCP Read Maximum updated to:", data);
    })
    .catch(error => {
        console.error("Error updating TCP Read Maximum:", error);
    });
}

// -------- TCP Write Maximum ---------
function tcpWriteMaximumForm(form) {
    let tcpWriteMaximum = form["pref_tcpWriteMaximum"].value;
    console.log("TCP Write Maximum:", tcpWriteMaximum);

    if (tcpWriteMaximum) {
        console.log("TCP Write Maximum:", tcpWriteMaximum);
        updateTCPWriteMaximum(tcpWriteMaximum);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updateTCPWriteMaximum('');
    }
}

function updateTCPWriteMaximum(tcpWriteMaximum) {
    const data = {
        id: 38,
        method: "slim.request",
        params: [ "", ["pref", "tcpWriteMaximum", tcpWriteMaximum]]
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
        console.log("TCP Write Maximum updated to:", data);
    })
    .catch(error => {
        console.error("Error updating TCP Write Maximum:", error);
    });
}


// -------- UDP Chunk Size ---------
function udpChunkSizeForm(form) {
    let udpChunkSize = form["pref_udpChunkSize"].value;
    console.log("UDP Chunk Size:", udpChunkSize);

    if (udpChunkSize) {
        console.log("UDP Chunk Size:", udpChunkSize);
        updateUDPChunkSize(udpChunkSize);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updateUDPChunkSize('');
    }
}

function updateUDPChunkSize(udpChunkSize) {
    const data = {
        id: 39,
        method: "slim.request",
        params: [ "", ["pref", "udpChunkSize", udpChunkSize]]
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
        console.log("UDP Chunk Size updated to:", data);
    })
    .catch(error => {
        console.error("Error updating UDP Chunk Size:", error);
    });
}


// -------- HTTP Streaming Mode ---------
function streamingModeForm(form) {
    let streamingMode = form["pref_useEnhancedHTTP"].value;
    console.log("Streaming Mode:", streamingMode);

    if (streamingMode) {
        console.log("Streaming Mode:", streamingMode);
        updateStreamingMode(streamingMode);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updateStreamingMode('');
    }
}

function updateStreamingMode(streamingMode) {
    const data = {
        id: 35,
        method: "slim.request",
        params: [ "", ["pref", "useEnhancedHTTP", streamingMode]]
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
        console.log("Streaming Mode updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Streaming Mode:", error);
    });
}


// -------- PERFORMANCE SETTINGS --------

// -------- Database Memory Configuration ---------
function databaseMemoryConfigForm(form) {
    let databaseMemoryConfig = form["pref_dbhighmem"].value;
    console.log("Database Memory Configuration:", databaseMemoryConfig);

    if (databaseMemoryConfig) {
        console.log("Database Memory Configuration:", databaseMemoryConfig);
        updateDatabaseMemoryConfig(databaseMemoryConfig);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updateDatabaseMemoryConfig('');
    }
}

function updateDatabaseMemoryConfig(databaseMemoryConfig) {
    const data = {
        id: 40,
        method: "slim.request",
        params: [ "", ["pref", "dbhighmem", databaseMemoryConfig]]
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
        console.log("Database Memory Configuration updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Database Memory Configuration:", error);
    });
}

// -------- Trigger Scan on Preference Change ---------
function triggerScanOnPreferenceChangesForm(form) {
    let triggerScanOnPreferenceChanges = form["pref_dontTriggerScanOnPrefChange"].value;
    console.log("Trigger Scan on Preference Change:", triggerScanOnPreferenceChanges);

    if (triggerScanOnPreferenceChanges) {
        console.log("Trigger Scan on Preference Change:", triggerScanOnPreferenceChanges);
        updateTriggerScanOnPreferenceChanges(triggerScanOnPreferenceChanges);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updateTriggerScanOnPreferenceChanges('');
    }
}

function updateTriggerScanOnPreferenceChanges(triggerScanOnPreferenceChanges) {
    const data = {
        id: 41,
        method: "slim.request",
        params: [ "", ["pref", "dontTriggerScanOnPrefChange", triggerScanOnPreferenceChanges]]
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
        console.log("Trigger Scan on Preference Change updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Trigger Scan on Preference Change:", error);
    });
}

// -------- Shuffle Method ---------
function shuffleMethodForm(form){
    let shuffleMethod = form["pref_useBalancedShuffle"].value;
    console.log("Shuffle Method:", shuffleMethod);

    if (shuffleMethod) {
        console.log("Shuffle Method:", shuffleMethod);
        updateShuffleMethod(shuffleMethod);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updateShuffleMethod('');
    }
}

function updateShuffleMethod(shuffleMethod) {
    const data = {
        id: 42,
        method: "slim.request",
        params: [ "", ["pref", "useBalancedShuffle", shuffleMethod]]
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
        console.log("Shuffle Method updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Shuffle Method:", error);
    });
}

// -------- Disable Library Statistics
function libraryStatisticsForm(form) {
    let libraryStatistics = form["pref_disableStatistics"].value;
    console.log("Library Statistics:", libraryStatistics);

    if (libraryStatistics) {
        console.log("Library Statistics:", libraryStatistics);
        updateLibraryStatistics(libraryStatistics);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updateLibraryStatistics('');
    }
}

function updateLibraryStatistics(libraryStatistics) {
    const data = {
        id: 43,
        method: "slim.request",
        params: [ "", ["pref", "disableStatistics", libraryStatistics]]
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
        console.log("Library Statistics updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Library Statistics:", error);
    });
}

// -------- Precache Artworks ---------
function artworkPreCachingForm(form) {
    let artworkPreCaching = form["pref_precacheArtwork"].value;
    console.log("Artwork PreCaching:", artworkPreCaching);

    if (artworkPreCaching) {
        console.log("Artwork PreCaching:", artworkPreCaching);
        updateArtworkPreCaching(artworkPreCaching);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updateArtworkPreCaching('');
    }
}

function updateArtworkPreCaching(artworkPreCaching) {
    const data = {
        id: 44,
        method: "slim.request",
        params: [ "", ["pref", "precacheArtwork", artworkPreCaching]]
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
        console.log("Artwork PreCaching updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Artwork PreCaching:", error);
    });
}

// -------- Artwork Resizing ---------
function artworkResizingForm(form) {
    let artworkResizing = form["pref_useLocalImageproxy"].value;
    console.log("Artwork Resizing:", artworkResizing);

    if (artworkResizing) {
        console.log("Artwork Resizing:", artworkResizing);
        updateArtworkResizing(artworkResizing);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updateArtworkResizing('');
    }
}

function updateArtworkResizing(artworkResizing) {
    const data = {
        id: 45,
        method: "slim.request",
        params: [ "", ["pref", "useLocalImageproxy", artworkResizing]]
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
        console.log("Artwork Resizing updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Artwork Resizing:", error);
    });
}

// -------- Server Priority ---------
function serverPriorityForm(form) {
    let serverPriority = form["pref_serverPriority"].value;
    console.log("Server Priority:", serverPriority);

    if (serverPriority) {
        console.log("Server Priority:", serverPriority);
        updateServerPriority(serverPriority);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updateServerPriority('');
    }
}

function updateServerPriority(serverPriority) {
    const data = {
        id: 46,
        method: "slim.request",
        params: [ "", ["pref", "serverPriority", serverPriority]]
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
        console.log("Server Priority updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Server Priority:", error);
    });
}

// -------- Scanner Priority ---------
function scannerPriorityForm(form) {
    let serverPriority = form["pref_scannerPriority"].value;
    console.log("Scanner Priority:", scannerPriority);

    if (scannerPriority) {
        console.log("Scanner Priority:", scannerPriority);
        updateScannerPriority(scannerPriority);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updateScannerPriority('');
    }
}

function updateScannerPriority(scannerPriority) {
    const data = {
        id: 46,
        method: "slim.request",
        params: [ "", ["pref", "scannerPriority", scannerPriority]]
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
        console.log("Scanner Priority updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Scanner Priority:", error);
    });
}

// -------- Auto Rescan ---------
function autoRescanForm(form) {
    let autoRescan = form["pref_autorescan"].value;
    console.log("Auto Rescan:", autoRescan);

    if (autoRescan) {
        console.log("Auto Rescan:", autoRescan);
        updateAutoRescan(autoRescan);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updateAutoRescan('');
    }
}

function updateAutoRescan(autoRescan) {
    const data = {
        id: 47,
        method: "slim.request",
        params: [ "", ["pref", "autorescan", autoRescan]]
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
        console.log("Auto Rescan updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Auto Rescan:", error);
    });
}

// -------- Auto Rescan Interval ---------
function autoRescanStatIntervalForm(form) {
    let autoRescanStatInterval = form["pref_autorescan_stat_interval"].value;
    console.log("Auto Rescan Stat Interval:", autoRescanStatInterval);

    if (autoRescanStatInterval) {
        console.log("Auto Rescan Stat Interval:", autoRescanStatInterval);
        updateAutoRescanStatInterval(autoRescanStatInterval);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updateAutoRescanStatInterval('');
    }
}

function updateAutoRescanStatInterval(autoRescanStatInterval) {
    const data = {
        id: 48,
        method: "slim.request",
        params: [ "", ["pref", "autorescan_stat_interval", autoRescanStatInterval]]
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
        console.log("Auto Rescan Stat Interval updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Auto Rescan Stat Interval:", error);
    });
}

// -------- Max Playlist length ---------
function maxPlaylistLengthForm(form) {
    let maxPlaylistLength = form["pref_maxPlaylistLength"].value;
    console.log("Max Playlist Length:", maxPlaylistLength);

    if (maxPlaylistLength) {
        console.log("Max Playlist Length:", maxPlaylistLength);
        updateMaxPlaylistLength(maxPlaylistLength);
    } else {
        console.log("Updated to blank, meaning it will not have a name");
        updateMaxPlaylistLength('');
    }
}

function updateMaxPlaylistLength(maxPlaylistLength) {
    const data = {
        id: 49,
        method: "slim.request",
        params: [ "", ["pref", "maxPlaylistLength", maxPlaylistLength]]
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
        console.log("Max Playlist Length updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Max Playlist Length:", error);
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

// --- UPDATE SHOW ARTIST ---
function showArtistForm(form){
    let showArtist = form["pref_showArtist"].value;
    console.log("Show Artists: ", showArtist);
    updateShowArtist(showArtist);
}

function updateShowArtist(showArtist){
    const data = {
        id: 16,
        method: "slim.request",
        params: [ "", ["pref", "showArtist", showArtist]]
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
        console.log("Show Artist updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Show Artist:", error);
    });
}

// --- UPDATE SHOW YEAR ---
function showYearForm(form){
    let showYear = form["pref_showYear"].value;
    console.log("Show Year: ", showYear);
    updateShowYear(showYear);
}

function updateShowYear(showYear){
    const data = {
        id: 16,
        method: "slim.request",
        params: [ "", ["pref", "showYear", showYear]]
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
        console.log("Show Year updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Show Year:", error);
    });
}


// ---- SLIDER ---- ///
/*
document.addEventListener("DOMContentLoaded", function(){
    document.body.addEventListener('input', function(e){
        if(e.target && e.target.id == "itemsPerPage"){
            console.log(e.target.value);
            const perPageValue = document.querySelector("#itemsPerPageValue");
            if(perPageValue){
                console.log("Exists");
            } else {
                console.log("Doesnt");
            }
            console.log(perPageValue.textContent);
            perPageValue.textContent = e.target.value;
        }
    });
    const perPageInput = document.querySelector("#itemsPerPage");
    const perPageValue = document.querySelector("#itemsPerPageValue");
    perPageValue.textContent = perPageInput.value;
});*/

// -- UPDATE ITEMS PER PAGE -- //
function perPageForm(form) {
    let perPage = Number(form["pref_itemsPerPage"].value);
    if (perPage < 10) updatePerPage(10);
    else if(perPage > 500) updatePerPage(500);
    else {
        if(perPage) updatePerPage(perPage);
    }
}

function updatePerPage(perPage) {
    const data = {
        id: 16,
        method: "slim.request",
        params: [ "", ["pref", "itemsPerPage", perPage]]
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
        console.log("Items per page updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Items Per Page:", error);
    });
}


// -- TITLE FORMAT WEB -- //
function titleFormatWebForm(form) {
    let titleFormatWeb = form["pref_titleFormatWeb"].value;
    console.log("Selected Title Format Value: ", titleFormatWeb);
    updateTitleFormatWeb(titleFormatWeb);
}

function updateTitleFormatWeb(titleFormatWeb) {
    const data = {
        id: 17,
        method: "slim.request",
        params: [ "", ["pref", "titleFormatWeb", titleFormatWeb]]
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
        console.log("Title format updated to index:", data);
    })
    .catch(error => {
        console.error("Error updating Title Format:", error);
    });
}

// -- CUSTOM TITLE FORMAT -- //
function titleFormatForm(form) {
    let titleFormat = form["pref_titleFormat"].value;
    console.log("New Title Format: ", titleFormat);
    updateTitleFormat(titleFormat);
}

function updateTitleFormat(titleFormat) {
    const data = {
        id: 18,
        method: "slim.request",
        params: [ "", ["pref", "titleFormat", titleFormat]]
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
        console.log("Title format updated to index:", data);
    })
    .catch(error => {
        console.error("Error updating Title Format:", error);
    });
    updateTitleFormatWeb(9); // Changes the index to the newly created custom index in the array
}

// -- THUMBNAIL SIZE -- //
function thumbSizeForm(form) {
    let thumbSize = Number(form["pref_thumbSize"].value);
    if (thumbSize < 25) updateThumbSize(25);
    else if(thumbSize > 250) updateThumbSize(250);
    else {
        if(thumbSize) updateThumbSize(thumbSize);
    }
}

function updateThumbSize(thumbSize) {
    const data = {
        id: 19,
        method: "slim.request",
        params: [ "", ["pref", "thumbSize", thumbSize]]
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
        console.log("Thumbnail size updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Thumbnail Size:", error);
    });
}

// -- REFRESH RATE -- //
function refreshRateForm(form) {
    let refreshRate = Number(form["pref_refreshRate"].value);
    if (refreshRate < 2) updateRefreshRate(2);
    else if(refreshRate > 300) updateRefreshRate(300);
    else {
        if(refreshRate) updateRefreshRate(refreshRate);
    }
}

function updateRefreshRate(refreshRate) {
    const data = {
        id: 20,
        method: "slim.request",
        params: [ "", ["pref", "refreshRate", refreshRate]]
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
        console.log("Refresh Rate updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Refresh Rate:", error);
    });
}

// -- TEXT TIMEOUT -- 
function displaytexttimeoutForm(form) {
    let displaytexttimeout = Number(form["pref_displaytexttimeout"].value);
    if (displaytexttimeout < 1) updatedisplaytexttimeout(1);
    else if(displaytexttimeout > 100) updatedisplaytexttimeout(100);
    else {
        if(displaytexttimeout) updatedisplaytexttimeout(displaytexttimeout);
    }
}

function updatedisplaytexttimeout(displaytexttimeout) {
    const data = {
        id: 21,
        method: "slim.request",
        params: [ "", ["pref", "displaytexttimeout", displaytexttimeout]]
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
        console.log("Text Entry Timing updated to:", data);
    })
    .catch(error => {
        console.error("Error updating Text Entry Timing:", error);
    });
}

// --- DISPLAY DATA --- //
function getPref(display, listElementId){
    fetch(`http://localhost:9000/capstone/jsonrpc.js?display=${display}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        //const listElement = document.getElementById(listElementId);
        //listElement.innerHTML = '';
        console.log(data.value);
    })
    .catch(error => {
        console.error(`Error fetching ${display}:`, error);
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






// ADJUSTED ANIMATRIOINS


