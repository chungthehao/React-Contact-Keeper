const express = require('express')

const app = express()

app.get('/', (req, res) => res.json({ msg: `Welcome to my Contact-Keeper API!` }))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server start on port ${PORT}.`))

