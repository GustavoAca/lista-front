const fs = require('fs');
const path = require('path');
require('dotenv').config();

const filePath = path.join(__dirname, './auth/authFetch.js');
const apiUrl = process.env.API_URL;

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }
    const result = data.replace(/{{API_URL}}/g, apiUrl);

    fs.writeFile(filePath, result, 'utf8', (err) => {
        if (err) return console.log(err);
    });
});
