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

  app.get('/showfile', (req, res) => {
    const file = path.join(process.cwd(), 'public/images', 'temporary.svg');
    const stringified = fs.readFileSync(file, 'utf8');
    res.status(200).send({
        stringifield: stringified,
        file: file
    })
  })

app.get('/nft', async (req, res) => {
    await pinataProcessing.createSVG();
    const arr = await pinataProcessing.getMetadata();
    res.status(200).send({
        image: arr[0],
        json: arr[1]
    })
});

module.exports = app;