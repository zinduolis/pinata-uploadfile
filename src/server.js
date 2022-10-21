const express = require('express');
const cors = require('cors');
const index = require('./index');

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
    await index.createSVG();
    const arr = await index.getMetadata();
    res.status(200).send({
        image: arr[0],
        json: arr[1]
    })
});

module.exports = app;