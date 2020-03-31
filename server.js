const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const cors = require('cors')
const schedular = require('./routes/schedular');

const covidRoutes = require('./routes/covidRoutes');

const port = process.env.PORT || 9095;
const db = require('./config/db');

const path = require('path');

app.use(cors(), bodyParser.json(), bodyParser.urlencoded({ extended: false }))
    // app.use(cors());

mongoose.connect(db.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    else {
        console.log("Database Created");
    }
});
app.use(express.static(__dirname + '/www'));

app.use('/apis', covidRoutes, schedular);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'www/index.html'))
});
app.listen(port, () => {
    console.log('server running on :' + port);
})