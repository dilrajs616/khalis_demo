const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/homepage', {layout: "layouts/layout.ejs"});
});

router.post('/transcript', (req,res) => {
    const { audioData } = req.body;

    if (!audioData) {
        console.log('error');
        return res.status(400).json({ error: 'Audio data is required' });
    }

    res.status(200).json({ message: 'Audio received successfully' });
});

module.exports = router;