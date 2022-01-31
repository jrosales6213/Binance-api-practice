const express = require('express');
const {google} = require('googleapis');
const { async } = require('q');

const app = express();

app.get('/', async (req, res) => {
    
    const auth = new google.auth.GoogleAuth({
        keyFile : "credentials.json",
        scopes : 'https://www.googleapis.com/auth/speadsheets',
    });

    //create client instance for auth
    const client = await auth.getClient();

    //Instance of googlesheet api
    const googleSheets = google.sheets({version : 'v4', auth: client});

    const speadsheetID = '1lzD6t-idEpmq6VVLKr1E3csuc9vc-vkPD3psr7VDJpY';

    //get metadata about speadsheet
    const metaData = await googleSheets.spreadsheets.get({
        auth, 
        speadsheetID,
    })
    res.send(metaData);
});

app.listen(3000, (req, res) => console.log('running on port 3000'));