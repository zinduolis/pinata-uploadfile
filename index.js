const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const pinataProcessing = require('./src/pinataProcessing');

const app = express();
const PORT = 3001;

app.use(cors());

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }

    console.log("Server is running");
} )

app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
  })

  app.get('/showfiles', (req, res) => {
    fs.readdir('/tmp', function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file); 
    });
    });
    res.status(200).send({
        stringifield: stringified,
        file: file
    })
  })

app.get('/nft', async (req, res) => {
    const f = await pinataProcessing.createSVG();
    const arr = await pinataProcessing.getMetadata();
    res.status(200).send({
        image: arr[0],
        json: arr[1],
        file: f
    })
});

module.exports = app;