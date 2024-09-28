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
//                    ****  update ALL release types  ****
// *******************************************************************************
if (params && params[1]) {
    let updatedPrefs = {};
    params[1].forEach(([key, value]) => {
        if (key === "pref") {
            updatedPrefs[value[0]] = value[1];
        }
    });

    const { cleanupReleaseTypes, groupArtistAlbumsByReleaseType, ignoreReleaseTypes } = updatedPrefs; // Destructure ignoreReleaseTypes

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
        console.log("Current prefs file data DEBUG:", data); // DEBUG

        // Replace cleanupReleaseTypes, groupArtistAlbumsByReleaseType, and ignoreReleaseTypes lines
        const updatedData = data
            .replace(/cleanupReleaseTypes:\s*\S+/g, `cleanupReleaseTypes: ["${cleanupReleaseTypes}"]`)
            .replace(/groupArtistAlbumsByReleaseType:\s*\S+/g, `groupArtistAlbumsByReleaseType: ["${groupArtistAlbumsByReleaseType}"]`)
            .replace(/ignoreReleaseTypes:\s*\S+/g, `ignoreReleaseTypes: ["${ignoreReleaseTypes}"]`); 

        // Write the updated data back to the file
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) return res.status(500).send('Error updating prefs file');
            console.log("Updated prefs file content:", updatedData); // DEBUG
            res.json({ result: 'Release Types settings updated successfully' });
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



// // *******************************************************************************
// //                    ****  update Album release types  ****
// // *******************************************************************************
// if (params && params[1][0] === "pref" && params[1][1] === "ignoreReleaseTypes") {
//     const ignoreReleaseTypes = params[1][2];

//     let filePath;
//     if (os.platform() === 'win32' || os.platform() === 'win64') {
//         filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
//     } else if (os.platform() === 'linux') {
//         filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
//     } else {
//         return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
//     }

//     fs.readFile(filePath, 'utf8', (err, data) => {
//         if (err) return res.status(500).send('Error reading prefs file');
//         console.log("Current prefs file data:", data); 

//         // Update ignoreReleaseTypes in the prefs file
//         let updatedData = data.replace(/ignoreReleaseTypes:\s*\S+/g, `ignoreReleaseTypes: "${ignoreReleaseTypes}"`);

//         // Write the updated data back to the file
//         fs.writeFile(filePath, updatedData, (err) => {
//             if (err) return res.status(500).send('Error updating prefs file');
//             console.log("Updated prefs file content:", updatedData); 
//             res.json({ result: 'Release types updated successfully' });
//         });
//     });
// } else {
//     res.status(400).send('Invalid request');
// }


        
// ******************************************************************************
//                    ****  Fetch Songs   ****
// *******************************************************************************
// if (params && params[0] === "get" && params[1] === "mediadirs") {
//     if (params && params[1][0] === "pref" && params[1][1] === "mediadirs") {

//     let filePath;
//     if (os.platform() === 'win32' || os.platform() === 'win64') {
//         filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
//     } else if (os.platform() === 'linux') {
//         filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
//     } else {
//         return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
//     }

//     console.log("MAYBE failed to read FIle path to read:", filePath);


//     fs.readFile(filePath, 'utf8', (err, data) => {
//         if (err) return res.status(500).send('Error reading prefs file: ', err);
    
//         // Find any mediadirs line
//         const mediadirsLine = data.split('\n').find(line => line.includes('mediadirs:'));
//         if (mediadirsLine) {
//             console.log("Found mediadirs line:", mediadirsLine);
//             res.json({ result: mediadirsLine });
//         } else {
//             res.status(404).send('mediadirs not found');
//         }
//     });
// } else {
//     res.status(400).send('Invalid request');
// }
    
});












// app.listen(3000, () => {
//     console.log('Server listening on port 3000');
// });

