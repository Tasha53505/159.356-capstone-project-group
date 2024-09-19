// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());

// app.post('/jsonrpc.js', (req, res) => {
//     const { params } = req.body;

//     // Check if the command is 'pref' and the preference being updated is 'language'
//     if (params && params[1][0] === "pref" && params[1][1] === "language") {
//         const newLanguage = params[1][2];
        
//         // Update the server.prefs file
//         const filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');
//         fs.readFile(filePath, 'utf8', (err, data) => {
//             if (err) return res.status(500).send('Error reading prefs file');
            
//             // Replace the language line with the new one
//             const updatedData = data.replace(/language:\s*\S+/g, `language: ${newLanguage}`);
            
//             // Write the updated data back to the file
//             fs.writeFile(filePath, updatedData, (err) => {
//                 if (err) return res.status(500).send('Error updating prefs file');
//                 res.json({ result: 'Language updated successfully' });
//             });
//         });
//     } else {
//         res.status(400).send('Invalid request');
//     }
// });

// app.listen(3000, () => {
//     console.log('Server listening on port 3000');
// });


const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/jsonrpc.js', (req, res) => {
    const newLanguage = 'FR'; // AS A TEST
    const filePath = path.join('C:', 'ProgramData', 'Squeezebox', 'prefs', 'server.prefs');

    ffs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading prefs file:', err);
            return res.status(500).send('Error reading prefs file');
        }
    
        console.log('Original Data:', data); // Log original data
    
        const updatedData = data.replace(/language:\s*\S+/g, `language: ${newLanguage}`);
        console.log('Updated Data:', updatedData); // Log updated data
    
        fs.writeFile(filePath, updatedData, (err) => {
            if (err) {
                console.error('Error updating prefs file:', err);
                return res.status(500).send('Error updating prefs file');
            }
            res.json({ result: 'Language updated to FR successfully' });
        });
    });
});
    
