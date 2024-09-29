const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const os = require('os');


const app = express();
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

// ******************************************************************************
//                    ****  Security selection ****
//*******************************************************************************
    // Check if the command is 'pref' and the preference being updated is 'security'
    if (params && params[1][0] === "pref" && params[1][1] === "security") {
        const settingData = params[1][2];

        // Update the server.prefs file with file paths for Windows and Linux
        let filePath;
        if (os.platform() === 'win32' || os.platform() === 'win64') {
             filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
        } else if (os.platform() === 'linux') {
            filePath = '/var/lib/squeezeboxserver/prefs/server.prefs';
        } else {
            return res.status(500).send('Unsupported OS - This has only been coded for Windows and Linux');
        }

        let passwordProtection = settingData.passwordProtection
        let username = settingData.username
        let password = settingData.password
        let blockIncomingConnection = settingData.blockIncomingConnection
        let allowedIPAddresses = settingData.allowedIPAddresses
        let csrfProtectionLevel = settingData.csrfProtectionLevel
        let corsAllowedHosts = settingData.corsAllowedHosts
        let insecureHTTPS = settingData.insecureHTTPS

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return res.status(500).send('Error reading prefs file');
            
            // Replace the security line with the new one
            let updatedData = data.replace(/authorize:\s*\S+/g, `authorize: ${passwordProtection}`);
            updatedData = data.replace(/username:\s*\S+/g, `username: ${username}`);
            updatedData = data.replace(/password:\s*\S+/g, `authorize: ${password}`);
            updatedData = data.replace(/filterHosts:\s*\S+/g, `filterHosts: ${blockIncomingConnection}`);
            updatedData = data.replace(/allowedHosts:\s*\S+/g, `allowedHosts: ${allowedIPAddresses}`);
            updatedData = data.replace(/csrfProtectionLevel:\s*\S+/g, `csrfProtectionLevel: '${csrfProtectionLevel}'`);
            updatedData = data.replace(/corsAllowedHosts:\s*\S+/g, `corsAllowedHosts: '${corsAllowedHosts}'`);
            updatedData = data.replace(/insecureHTTPS:\s*\S+/g, `insecureHTTPS: ${insecureHTTPS}`);
            
            // Write the updated data back to the file
            fs.writeFile(filePath, updatedData, (err) => {
                if (err) return res.status(500).send('Error updating prefs file');
                res.json({ result: 'security updated successfully' });
            });
        });
    }    

});












// app.listen(3000, () => {
//     console.log('Server listening on port 3000');
// });

