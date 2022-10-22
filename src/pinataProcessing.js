require('dotenv').config();
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);
const fs = require('fs');
const path = require('path');
const randomWords = require('random-words');
const crypto = require('crypto');

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
    // const file = path.join(process.cwd(), 'public/images', 'temporary.svg');
    const file = path.join('/tmp/', 'temporary.svg');
    const readableStreamForFile = fs.createReadStream(file);
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
    const arr = [];
    arr.push(imageUrl);
    arr.push(metadata);

    return arr;
}

const createSVG = () => {
    const random3 = randomWords(3);
    const randomPhrase = random3[0].charAt(0).toUpperCase() + random3[0].slice(1) + random3[1].charAt(0).toUpperCase() + random3[1].slice(1) + random3[2].charAt(0).toUpperCase() + random3[2].slice(1);
    let hash = crypto.createHash('md5').update(randomPhrase).digest("hex");
    let color = hash.substring(hash.length - 6);
    const svgValue = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='#" + color + "' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>" + randomPhrase + "</text></svg>";
    // const file = path.join(process.cwd(), 'public/images', 'temporary.svg');
    const file = path.join('/tmp/', 'temporary.svg');
    fs.writeFileSync(file, svgValue, function (err) {
        if (err) return console.log(err);
        console.log("SVG created successfully!!!");
    })
}

// createSVG()
// getMetadata()

module.exports = {createSVG, getMetadata};
