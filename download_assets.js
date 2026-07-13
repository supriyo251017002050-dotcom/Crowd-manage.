const fs = require('fs');
const https = require('https');
const path = require('path');

// 1. Copy generated trophy image
const srcTrophy = "C:\\Users\\treet\\.gemini\\antigravity-ide\\brain\\892f29b8-6cfb-42b3-abe5-eebd151d1fd9\\world_cup_trophy_1783946136672.png";
const destTrophy = path.join(__dirname, "images", "world_cup_trophy.png");

if (fs.existsSync(srcTrophy)) {
  fs.copyFileSync(srcTrophy, destTrophy);
  console.log("Copied trophy image to " + destTrophy);
} else {
  console.error("Trophy source image not found at " + srcTrophy);
}

// 2. Fetch players using Wikipedia REST API
const players = [
  { name: 'player_messi.jpg', wikiPage: 'Lionel_Messi' },
  { name: 'player_ronaldo.jpg', wikiPage: 'Cristiano_Ronaldo' },
  { name: 'player_mbappe.jpg', wikiPage: 'Kylian_Mbapp%C3%A9' },
  { name: 'player_platini.jpg', wikiPage: 'Michel_Platini' },
  { name: 'player_maldini.jpg', wikiPage: 'Paolo_Maldini' },
  { name: 'player_iniesta.jpg', wikiPage: 'Andr%C3%A9s_Iniesta' }
];

function getJson(url, callback) {
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
    }
  };
  https.get(url, options, (res) => {
    if (res.statusCode !== 200) {
      callback(new Error("Status code " + res.statusCode));
      return;
    }
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      try {
        callback(null, JSON.parse(body));
      } catch (e) {
        callback(e);
      }
    });
  }).on('error', callback);
}

function download(url, dest, callback) {
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
    }
  };
  const file = fs.createWriteStream(dest);
  https.get(url, options, function(response) {
    if (response.statusCode === 301 || response.statusCode === 302) {
      download(response.headers.location, dest, callback);
      return;
    }
    if (response.statusCode !== 200) {
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
    callback(err);
  });
}

let idx = 0;
function downloadNext() {
  if (idx >= players.length) {
    console.log("All downloads complete!");
    return;
  }

  const p = players[idx];
  const destPath = path.join(__dirname, "images", p.name);

  // Force delete if the file is tiny (corrupted/failed download)
  if (fs.existsSync(destPath) && fs.statSync(destPath).size < 1000) {
    fs.unlinkSync(destPath);
  }

  // Skip only if valid file exists
  if (fs.existsSync(destPath) && fs.statSync(destPath).size >= 1000) {
    console.log(p.name + " already exists. Skipping.");
    idx++;
    downloadNext();
    return;
  }

  const apiStr = `https://en.wikipedia.org/api/rest_v1/page/summary/${p.wikiPage}`;
  console.log(`Querying Wikipedia API for ${p.wikiPage}...`);

  getJson(apiStr, (err, data) => {
    if (err || !data || !data.thumbnail || !data.thumbnail.source) {
      console.error(`Failed to get thumbnail URL for ${p.wikiPage}:`, err || "No thumbnail source");
      idx++;
      setTimeout(downloadNext, 12000); // 12 second delay to avoid rate limits
      return;
    }

    const imgUrl = data.thumbnail.source;
    console.log(`Downloading thumbnail from: ${imgUrl}`);

    download(imgUrl, destPath, (dlErr) => {
      if (dlErr) {
        console.error(`Failed downloading img for ${p.name}:`, dlErr.message);
      } else {
        console.log(`Successfully downloaded ${p.name}`);
      }
      idx++;
      setTimeout(downloadNext, 12000); // 12 second delay to avoid rate limits
    });
  });
}

downloadNext();
