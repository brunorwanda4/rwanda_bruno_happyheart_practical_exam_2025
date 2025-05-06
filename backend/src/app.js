const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Welcome to hell ⛑️")
})

app.listen(3001, () => {
    console.log(`Server running on port 3001`)
})