const express = require('express')
const cors = require('cors')
const router = require('./router')
const authMiddleware = require('./auth')

const PORT = 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(authMiddleware);
app.use(router)

app.listen(PORT, () => console.log(`Listening on port ${3000}`))