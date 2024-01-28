const express = require('express')
const router = new express.Router()
const { adjustPA } = require('./pa-api-calls')

router.post('/api/adjust-pa.json', async (req, res) => {
    if (!req.body || !req.body.text || !req.body.pa) {
        return res.status(400).send('Missing data');
    }
    const textData = req.body.text
    const passiveAggressiveness = req.body.pa

    chatResponse = await adjustPA(textData, passiveAggressiveness);
    res.json({ message: removeQuotes(chatResponse) })
})  

function removeQuotes(text) {
    if (text.startsWith('"')) {
        text = text.slice(1)
    }
    if (text.endsWith('"')) {
        text = text.slice(0, -1)
    }
    return text
}

module.exports = router