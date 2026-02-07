
require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');

const accessKey = process.env.UNSPLASH_ACCESS_KEY;

// Create the assets/images directory if it doesn't exist
const dir = 'assets/images';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const images = [
    { query: 'minimalist desk', filename: 'visuel-1.jpg' },
    { query: 'oak wood texture', filename: 'visuel-2.jpg' },
    { query: 'steel structure', filename: 'visuel-3.jpg' },
    { query: 'modern office desk', filename: 'visuel-4.jpg' }
];

const downloadImage = async (query, filename) => {
    const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${accessKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const imageUrl = data.urls.regular;

        const imageResponse = await fetch(imageUrl);
        const buffer = await imageResponse.buffer();

        fs.writeFile(`${dir}/${filename}`, buffer, () => {
            console.log(`Image downloaded: ${filename}`);
        });
    } catch (error) {
        console.error(`Error downloading image for query "${query}":`, error);
    }
};

images.forEach(image => {
    downloadImage(image.query, image.filename);
});
