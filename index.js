const express = require('express');
const cors = require('cors');
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

app.get('/nft', async (req, res) => {
    await pinataProcessing.createSVG();
    const arr = await pinataProcessing.getMetadata();
    res.status(200).send({
        image: arr[0],
        json: arr[1]
    })
});

module.exports = app;