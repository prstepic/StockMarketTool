const express = require("express")
const mongodb = require("mongodb")

const app = express()
const port = 9090

app.listen(port, () => {
    console.log('server running on port ' + port)
})

app.get('/', (req, res) => {
    res.send("Hello, the server is up")
})
