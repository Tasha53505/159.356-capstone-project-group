const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const os = require('os');
const cors = require('cors');



const app = express();
app.use(cors()); // Allow all origins
app.options('*', cors()); // Preflight requests for all routes



app.use(bodyParser.json());

app.post('/jsonrpc.js', (req, res) => {
    const { params } = req.body;

// ******************************************************************************
//                    ****  Language selection ****
//*******************************************************************************
    // Check if the command is 'pref' and the preference being updated is 'language'
    if (params && params[1][0] === "pref" && params[1][1] === "language") {
        console.log("TEST");
        const newLanguage = params[1][2];
        
        // Update the server.prefs file with file paths for Windows and Linux
        let filePath;
        if (os.platform() === 'win32' || os.platform() === 'win64') {
             filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
        } else if (os.platform() === 'linux') {
            filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
        } else {
            return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
        }


        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return res.status(500).send('Error reading prefs file');
            
            // Replace the language line with the new one
            const updatedData = data.replace(/language:\s*\S+/g, `language: ${newLanguage}`);
            
            // Write the updated data back to the file
            fs.writeFile(filePath, updatedData, (err) => {
                if (err) return res.status(500).send('Error updating prefs file');
                res.json({ result: 'Language updated successfully' });
            });
        });
    }    
    
// ******************************************************************************
//                    ****  Rescan Folder Path Setting  ****
// *******************************************************************************
     if (params && params[1][0] === "pref" && params[1][1] === "mediadirs") {
        // const newMediaDir = params[1][2];
        const newMediaDir = decodeURIComponent(decodeURIComponent(params[1][2])); // Double unescape
        //    const newMediaDir = params[1][2][0];


        let filePath;
        if (os.platform() === 'win32' || os.platform() === 'win64') {
            filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
        } else if (os.platform() === 'linux') {
            filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
        } else {
            return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
        }

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return res.status(500).send('Error reading prefs file');
            console.log("Current prefs file data DEBUG:", data); //  DEBUG

            // Replace the mediadirs line with the new directory
            const updatedData = data.replace(/mediadirs:\s*\[.*?\]/, `mediadirs: ["${newMediaDir}"]`);


            
            
            // Write the updated data back to the file
            fs.writeFile(filePath, updatedData, (err) => {
                if (err) return res.status(500).send('Error updating prefs file');
                console.log("Updated prefs file content:", updatedData); // DEBUG
                res.json({ result: 'Media directory updated successfully' });
                });
            });
        } else {
             res.status(400).send('Invalid request');
        }

// ******************************************************************************
//                    ****  Playlist Folder Path Setting  ****
// *******************************************************************************

if (params && params[1][0] === "pref" && params[1][1] === "playlistdir") {
    // const newMediaDir = params[1][2];
    const newPlaylistPath = decodeURIComponent(decodeURIComponent(params[1][2])); // Double unescape
    //    const newMediaDir = params[1][2][0];


    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replace the mediadirs line with the new directory
        const updatedData = data.replace(/playlistdir:\s*\S+/g, `playlistdir: ["${newPlaylistPath}"]`);


        
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'Playlist directory updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }


// ******************************************************************************
//                    ****  Media Library Name Setting ****
// *******************************************************************************

if (params && params[1][0] === "pref" && params[1][1] === "libraryname") {
    const newLibraryName = params[1][2];
    // const libraryname = decodeURIComponent(decodeURIComponent(params[1][2])); // Double unescape
    //    const newMediaDir = params[1][2][0];


    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replace the mediadirs line with the new directory
        const updatedData = data.replace(/libraryname:\s*\S+/g, `libraryname: ["${newLibraryName}"]`);


        
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'Playlist Library Name updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }


// ******************************************************************************
//                    ****  Browse Artists (Unified Artists) ****
// *******************************************************************************
if (params && params[1][0] === "pref" && params[1][1] === "useUnifiedArtistsList") {
    const newUnifiedArtistsList= params[1][2];
    // const libraryname = decodeURIComponent(decodeURIComponent(params[1][2])); // Double unescape
    //    const newMediaDir = params[1][2][0];


    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replace the mediadirs line with the new directory
        const updatedData = data.replace(/useUnifiedArtistsList:\s*\S+/g, `useUnifiedArtistsList: ["${newUnifiedArtistsList}"]`);


        
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'useUnifiedArtistsList (Browse artists) updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }


// *******************************************************************************
//                    ****  update Ignore Album release types  ****
// *******************************************************************************

if (params && params[1][0] === "pref" && params[1][1] === "ignoreReleaseTypes") {
    const newIgnoreReleaseTypes = params[1][2];


    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replace the mediadirs line with the new directory
        const updatedData = data.replace(/ignoreReleaseTypes:\s*\S+/g, `ignoreReleaseTypes: ["${newIgnoreReleaseTypes}"]`);


        
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'ignoreReleaseTypes (Release Types in Media Library Management) updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }


    // *******************************************************************************
//                    ****  Grouping release types (Release types to include) ****
// ***********************************************************************************

if (params && params[1][0] === "pref" && params[1][1] === "groupArtistAlbumsByReleaseType") {
    const newGroupArtistAlbumsByReleaseType = params[1][2];


    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replace Line
        const updatedData = data.replace(/groupArtistAlbumsByReleaseType:\s*\S+/g, `groupArtistAlbumsByReleaseType: ["${newGroupArtistAlbumsByReleaseType}"]`);


        
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'groupArtistAlbumsByReleaseType (Release Types in Media Library Management) updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }




// *******************************************************************************
//                    ****  update Recognising EPs and Singles  ****
// *******************************************************************************
if (params && params[1].pref === "cleanupReleaseTypes") {
  
    const newCleanupReleaseTypes = params[1].value;
    console.log("New cleanupReleaseTypes value:", newCleanupReleaseTypes);


    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replace the mediadirs line with the new directory
        const updatedData = data.replace(/cleanupReleaseTypes:\s*\S+/g, `cleanupReleaseTypes: ["${newCleanupReleaseTypes}"]`);
        
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'Recognising singles and Eps (Release Types in Media Library Management) updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }



// *******************************************************************************
//                    ****  update Grouping artists and albums  ****
// *******************************************************************************
if (params && params[1][0] === "pref" && params[1][1] === "groupArtistAlbumsByReleaseType") {
    const newGroupArtistAlbumsByReleaseType = params[1][2];
  
    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replace the mediadirs line with the new directory
        const updatedData = data.replace(/groupArtistAlbumsByReleaseType:\s*\S+/g, `groupArtistAlbumsByReleaseType: ["${newGroupArtistAlbumsByReleaseType}"]`);


        
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'Grouping  (Release Types in Media Library Management) updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }




// *******************************************************************************
//                    ****  update Genre Filters  ****
// *******************************************************************************
if (params && params[1][0] === "pref" && params[1][1] === "noGenreFilter") {
    const newNoGenreFilter= params[1][2];
    // const libraryname = decodeURIComponent(decodeURIComponent(params[1][2])); // Double unescape
    //    const newMediaDir = params[1][2][0];


    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replace the mediadirs line with the new directory
        const updatedData = data.replace(/noGenreFilter:\s*\S+/g, `noGenreFilter: ["${newNoGenreFilter}"]`);


        
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'Genre (Filters) updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }



    // *******************************************************************************
//                    ****  update Role Filters  ****
// *******************************************************************************
if (params && params[1][0] === "pref" && params[1][1] === "noRoleFilter") {
    const newNoRoleFilter= params[1][2];
    // const libraryname = decodeURIComponent(decodeURIComponent(params[1][2])); // Double unescape
    //    const newMediaDir = params[1][2][0];


    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replace the mediadirs line with the new directory
        const updatedData = data.replace(/noRoleFilter:\s*\S+/g, `noRoleFilter: ["${newNoRoleFilter}"]`);


        
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'Role (Filters) updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }




    // *******************************************************************************
//                    ****  Tag Format (TPE2  MP3) ****
// ***********************************************************************************

if (params && params[1][0] === "pref" && params[1][1] === "useTPE2AsAlbumArtist") {
    const newUseTPE2AsAlbumArtist = params[1][2];


    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replace Line
        const updatedData = data.replace(/useTPE2AsAlbumArtist:\s*\S+/g, `useTPE2AsAlbumArtist: ["${newUseTPE2AsAlbumArtist}"]`);


        
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'useTPE2AsAlbumArtist (Advanced) updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }



    
// ******************************************************************************
//                    ****  Compilation Name Setting (Various Artists) ****
// *******************************************************************************

if (params && params[1][0] === "pref" && params[1][1] === "variousArtistsString") {
    const newVariousArtistsString = params[1][2];


    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replace the mediadirs line with the new directory
        const updatedData = data.replace(/variousArtistsString:\s*\S+/g, `variousArtistsString: ["${newVariousArtistsString}"]`);
       
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'Playlist Library Name updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }






    // *******************************************************************************
//                    ****  Search Substring (Search Within Words)****
// ***********************************************************************************

if (params && params[1][0] === "pref" && params[1][1] === "searchSubString") {
    const newSearchSubString = params[1][2];


    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replace Line
        const updatedData = data.replace(/searchSubString:\s*\S+/g, `searchSubString: ["${newSearchSubString}"]`);


        
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'searchSubString (Advanced) updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }



    
// *******************************************************************************
//                    ****  Ignored Articles****
// ***********************************************************************************

if (params && params[1][0] === "pref" && params[1][1] === "ignoredarticles") {
    const newIgnoredarticles = params[1][2];


    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replace Line
        const updatedData = data.replace(/ignoredarticles:\s*\S+/g, `ignoredarticles: ["${newIgnoredarticles}"]`);


        
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'ignoredarticles (advanced) updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }
});

app.get('/jsonrpc.js', (req, res) => {
    const display = req.query.display;

    
// ************************************************************************************
//  ****  Age Limit (Number of recent albumbs to display when browsing new music ****
// ***********************************************************************************

if (params && params[1][0] === "pref" && params[1][1] === "browseagelimit") {
    const newAgeLimit = params[1][2];


    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replace Line
        const updatedData = data.replace(/browseagelimit:\s*\S+/g, `browseagelimit: ["${newAgeLimit}"]`);


        
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'browseagelimit updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }

    
    
// ************************************************************************************
//                              ****  Group Discs ****
// ***********************************************************************************

if (params && params[1][0] === "pref" && params[1][1] === "groupdiscs") {
    const newGroupDiscs= params[1][2];
  

    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replaceline 
        const updatedData = data.replace(/groupdiscs:\s*\S+/g, `groupdiscs: ["${newGroupDiscs}"]`);


        
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'groupdiscs (Filters) updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }


    // ************************************************************************************
//                              ****  Playlsit Persistence ****
// ***********************************************************************************

if (params && params[1][0] === "pref" && params[1][1] === "persistPlaylists") {
    const newPersistPlaylists= params[1][2];
  

    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replaceline 
        const updatedData = data.replace(/persistPlaylists:\s*\S+/g, `persistPlaylists: ["${newPersistPlaylists}"]`);


        
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'persistPlaylists (Playlists) updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }

  // ************************************************************************************
//                              ****  Saved Shuffled Playlist ****
// ***********************************************************************************

if (params && params[1][0] === "pref" && params[1][1] === "saveShuffled") {
    const newSavedShuffled = params[1][2];
  

    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replaceline 
        const updatedData = data.replace(/saveShuffled:\s*\S+/g, `saveShuffled: ["${newSavedShuffled}"]`);


        
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'saveShuffled (Playlists) updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }

  // ************************************************************************************
//                              ****  Reshuffle On repeat  ****
// ***********************************************************************************

if (params && params[1][0] === "pref" && params[1][1] === "reshuffleOnRepeat") {
    const newReshuffleOnRepeat= params[1][2];
  

    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replaceline 
        const updatedData = data.replace(/reshuffleOnRepeat:\s*\S+/g, `reshuffleOnRepeat: ["${newReshuffleOnRepeat}"]`);


        
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'pref_reshuffleOnRepeat (Playlists) updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }

});




    
// *******************************************************************************
//                    ****  Skip sentinelm File Names****
// ***********************************************************************************

if (params && params[1][0] === "pref" && params[1][1] === "skipsentinel") {
    const newSkipSentinel = params[1][2];


    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replace Line
        const updatedData = data.replace(/skipsentinel:\s*\S+/g, `skipsentinel: ["${newSkipSentinel}"]`);


        
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'skipsentinel (advanced) updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }


    // *******************************************************************************
//                    ****  Seperator for multiple Items in tags (Split list) ****
// ***********************************************************************************

if (params && params[1][0] === "pref" && params[1][1] === "splitList") {
    const newSplitList = params[1][2];


    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replace Line
        const updatedData = data.replace(/splitList:\s*\S+/g, `splitList: ["${newSplitList}"]`);


        
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'splitList (advanced) updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }

// *******************************************************************************
//                    ****  Disablled audio File extensions ****
// ***********************************************************************************

if (params && params[1][0] === "pref" && params[1][1] === "disabledextensionsaudio") {
    const newDisabledextensionsaudio = params[1][2];


    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replace Line
        const updatedData = data.replace(/disabledextensionsaudio:\s*\S+/g, `disabledextensionsaudio: ["${newDisabledextensionsaudio}"]`);
        
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'disabledextensionsaudio (advanced) updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }



// *******************************************************************************
//                    ****  Disablled audio File extensions ****
// ***********************************************************************************

if (params && params[1][0] === "pref" && params[1][1] === "disabledextensionsaudio") {
    const newDisabledextensionsaudio = params[1][2];


    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replace Line
        const updatedData = data.replace(/disabledextensionsaudio:\s*\S+/g, `disabledextensionsaudio: ["${newDisabledextensionsaudio}"]`);
        
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'disabledextensionsaudio (advanced) updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }



    
// *******************************************************************************
//                    ****  Disablled Playlist File extensions ****
// ***********************************************************************************

if (params && params[1][0] === "pref" && params[1][1] === "disabledextensionsplaylist") {
    const newDisabledextensionsplaylist = params[1][2];


    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replace Line
        const updatedData = data.replace(/disabledextensionsplaylist:\s*\S+/g, `disabledextensionsplaylist: ["${newDisabledextensionsplaylist}"]`);
        
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'disabledextensionsplaylist (advanced) updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }



    // *******************************************************************************
//                    ****  prioritizeNative prioritize Native checkbox ****
// ***********************************************************************************

if (params && params[1][0] === "pref" && params[1][1] === "prioritizeNative") {
    const newPrioritizeNative = params[1][2];


    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        // Replace Line
        const updatedData = data.replace(/prioritizeNative:\s*\S+/g, `prioritizeNative: ["${newPrioritizeNative}"]`);
        
        
        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'prioritizeNative (advanced) updated successfully' });
            });
        });
    } else {
         res.status(400).send('Invalid request');
    }

// *******************************************************************************
//                    ****  Title Format ****
// ***********************************************************************************   
if (params && params[1][0] === "pref" && params[1][1] === "titleFormat") {
    console.log("TEST");
    const customTitleFormat = params[1][2];


    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        console.log("Current prefs file data DEBUG:", data); //  DEBUG

        let updatedData = data.split('\n');
        const titleFormatIndex = updatedData.findIndex(line => line.trim().startsWith("titleFormat:"));
        if(titleFormatIndex != -1){
            const arrayStart = titleFormatIndex + 1;
            let end = arrayStart;
            while(end < updatedData.length && updatedData[end].trim().startsWith('-')){
                end++;
            }
            const titleFormatArray = updatedData.slice(arrayStart, end).map(line => line.replace(/^- /, '').trim());
            if (titleFormatArray.length >= 9) {
                titleFormatArray[8] = customTitleFormat; 
            } else {
                while (titleFormatArray.length < 9) {
                    titleFormatArray.push(""); 
                }
                titleFormatArray[8] = customTitleFormat;
            }
            updatedData.splice(arrayStartIndex, endIndex - arrayStartIndex, ...titleFormatArray.map(entry => `- ${entry}`));

            const newCont = updatedData.join('\n');
            // Write the updated data back to the file
            fs.writeFile(filePath, newCont, (err) => {
                if (err) return res.status(500).send('Error updating prefs file');
                console.log("Updated prefs file content:", newCont); // DEBUG
                res.json({ result: 'titleFormat updated successfully' });
                });
            } else {
                res.status(400).send('titleFormat not found');
            }
            });
    } else {
         res.status(400).send('Invalid request');
    }


// *******************************************************************************
//                    ****  Art Folder ****
// ***********************************************************************************
    let filePath;
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
    } else if (os.platform() === 'linux') {
        filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
    } else {
        return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading prefs file');
        let match;
        if(display === 'artfolder'){
            match = data.match(/artfolder:\s*(\[[^\]]+\]|\"[^\"]+\")/);
        } else if (display === 'coverArt'){
            match = data.match(/coverArt:\s*(\[[^\]]+\]|\"[^\"]+\")/);
        }
        if(match && match[1]){
            const value = match[1];
            res.json({ display, type: 'single', value: value.replace(/"/g, '')});
        } else {
            return res.status(500).send('test');
        }
    });
 





    




