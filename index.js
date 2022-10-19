require('dotenv').config();
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);
const fs = require('fs');

const readableStreamForFile = fs.createReadStream('./images/test.svg');
const options = {
    pinataMetadata: {
        name: 'My NFT Collection',
        keyvalues: {
            customKey: 'customvalue',
            customKey2: 'customValue2'
        }
    },
    pinataOptions: {
        cidVersion: 0
    }
};

const pinFileToIPFS = () => {
    return pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
        return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
    }).catch((err) => {
        console.log(err);
    });
}

const pinJSONToIPFS = (body) => {
    return pinata.pinJSONToIPFS(body, options).then((result) => {
        return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
    }).catch((err) => {
        console.log(err);
    })

}

const getMetadata = async () => {
    const imageUrl = await pinFileToIPFS();
    console.log(imageUrl);
    const body = {
        name: "My NFT Collection",
        description: "Awesome NFTs",
        image: imageUrl
    };
    const metadata = await pinJSONToIPFS(body);
    console.log(metadata);
}

const createSVG = () => {
    const svgValue = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='#581107' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>ChivalrousIsmTwaddle</text></svg>";
    fs.writeFile('./images/test.svg', svgValue, function (err) {
        if (err) return console.log(err);
        console.log("SVG created successfully!!!");
    })
}

createSVG()
getMetadata()