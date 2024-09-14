
// Node JS script to rewrite prefs file - this file is not showing up serverside
const express = require('express');
const fs = require('fs');
const app = express();
const prefsFilePath = 'C:/ProgramData/Squeezebox/prefs/server.prefs';

app.use(express.json());

app.post('/saveLanguage', (req, res) => {
    const newLanguage = req.body.language;

    // Read the prefs file
    fs.readFile(prefsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.json({ success: false, message: 'Oops. Could not read prefs file.' });
        }

        // Replace the language line with the new language
        const updatedPrefs = data.replace(/language: \w+/g, `language: ${newLanguage}`);

        // Write the updated prefs back to the file
        fs.writeFile(prefsFilePath, updatedPrefs, 'utf8', (err) => {
            if (err) {
                return res.json({ success: false, message: 'Oops. Could not update prefs file.' });
            }
            res.json({ success: true });
        });
    });
});

app.post('/updateMediaDirs', (req, res) => {
    const newMediaDir = req.body.mediaDir;

    // Read the prefs file
    fs.readFile(prefsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.json({ success: false, message: 'ERROR: Could not read prefs file.' });
        }

        // Replace the mediaDirs section with the new folder path written from the textbox
        const updatedPrefs = data.replace(/mediadirs:.*\n/, `mediadirs:\n- ${newMediaDir}\n`);

        // Write the updated prefs back to the file
        fs.writeFile(prefsFilePath, updatedPrefs, 'utf8', (err) => {
            if (err) {
                return res.json({ success: false, message: 'Could not update prefs file.' });
            }
            res.json({ success: true });
        });
    });
});



// Cannot use 9000 as thats what clientside is running onm
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
