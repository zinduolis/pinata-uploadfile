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

getMetadata()