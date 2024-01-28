const express = require('express')
const router = new express.Router()

router.get('/', (req, res) => {
    res.json({ message: 'hello world' })
})  

module.exports = router
