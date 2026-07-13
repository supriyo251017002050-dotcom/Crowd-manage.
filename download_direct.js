const fs = require('fs');
const https = require('https');
const path = require('path');
const urlModule = require('url');

const players = [
  { name: 'player_maradona.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Diego_Maradona_1986.jpg' },
  { name: 'player_pele.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flickr_Pele_1970.jpg' },
  { name: 'player_neymar.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Neymar_PSG_2018.jpg' }
];

function download(urlStr, dest, callback) {
  const parsedUrl = urlModule.parse(urlStr);
  const options = {
    hostname: parsedUrl.hostname,
    path: parsedUrl.path,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
    }
  };

  const file = fs.createWriteStream(dest);
  https.get(options, function(response) {
    if (response.statusCode === 301 || response.statusCode === 302) {
      download(response.headers.location, dest, callback);
      return;
    }
    if (response.statusCode !== 200) {
      console.error("Failed to download " + urlStr + " - status " + response.statusCode);
      file.close();
      fs.unlink(dest, () => {});
      callback(new Error("Status code " + response.statusCode));
      return;
    }
    response.pipe(file);
    file.on('finish', function() {
      file.close(() => callback(null));
    });
  }).on('error', function(err) {
    fs.unlink(dest, () => {});
    console.error("Error downloading " + urlStr + ": " + err.message);
    callback(err);
  });
}

let idx = 0;
function downloadNext() {
  if (idx >= players.length) {
    console.log("All direct downloads completed!");
    return;
  }
  const p = players[idx];
  const destPath = path.join(__dirname, "images", p.name);

  // Force delete if tiny
  if (fs.existsSync(destPath) && fs.statSync(destPath).size < 1000) {
    fs.unlinkSync(destPath);
  }

  if (fs.existsSync(destPath) && fs.statSync(destPath).size >= 1000) {
    console.log(p.name + " already exists. Skipping.");
    idx++;
    downloadNext();
    return;
  }

  console.log("Downloading " + p.name + " directly...");
  download(p.url, destPath, (err) => {
    if (!err) {
      console.log("Successfully downloaded " + p.name);
    }
    idx++;
    setTimeout(downloadNext, 1000);
  });
}

downloadNext();
