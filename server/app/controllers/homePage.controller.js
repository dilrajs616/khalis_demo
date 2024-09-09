const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const util = require('util');

router.get('/', (req, res) => {
    res.send("This is the home page");
});

router.post('/transcript', (req,res) => {
    const { audioData } = req.body;

    if (!audioData) {
        console.log('error');
        return res.status(400).json({ error: 'Audio data is required' });
    }
    const apiKey = process.env.GOOGLE_API_KEY;
    const endpoint = `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`

    const body = {
        "audio": {
            "content": audioData
        },
        "config": {
            "enableAutomaticPunctuation": true,
            "encoding": "LINEAR16",
            "languageCode": "pa-IN",
            "model": "default"
        }
    }

    axios.post(endpoint, body)
    .then(response => {
        console.log('Response from Google Speech-to-Text API:', response.data);

        // Define the file path and name
        const filePath = path.join(__dirname, 'full_response.txt');

        // Serialize the entire response object, including circular references
        const fullResponse = util.inspect(response.data, { depth: null, showHidden: true });

        // Write the entire response object to a file
        fs.writeFile(filePath, fullResponse, (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            } else {
                console.log('Full response (with circular references) saved to file:', filePath);
            }
        });
    })
    .catch(error => {
        console.error('Error sending request to Google Speech-to-Text API:', error);
    });

    res.status(200).json({ message: 'Audio received successfully' });
});

module.exports = router;