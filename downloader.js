const data = require('./output.json');
const ytdl = require('ytdl-core');
const fs = require('fs');
const StreamPromises = require('stream/promises');

(() => {
  if (!fs.existsSync('./files')) {
    fs.mkdirSync('./files');
  }

  downloadFiles();
})();

async function downloadFiles() {
  for (let i = 0; i < data.length; i++) {
    console.log("Downloading episode number: ", data[i].episode);

    await StreamPromises.pipeline(ytdl(data[i].url), fs.createWriteStream('./files/' + data[i].episode + '.mp4'));
    console.log("Finished downloading: ", data[i].episode);
  }
}