const express = require('express')
const app = express()


//Define routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = app