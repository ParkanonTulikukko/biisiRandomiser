const express = require('express');
var fs = require('fs');
const path = require('path');
const cors = require('cors');
const seedrandom = require('seedrandom');

const app = express();
app.use(cors());
app.get(cors());
const mp3FolderPath = path.join(__dirname, 'mp3');
const port = 3000;

function getMP3Files() {
  
    const files = fs.readdirSync(mp3FolderPath);
  
    const mp3Files = files.filter(file => {
      const filePath = path.join(mp3FolderPath, file);
      const fileExtension = path.extname(filePath);
      return fileExtension.toLowerCase() === '.mp3';
    });
  
    return mp3Files;
  }

//sekoitetaan biisijärjestys käyttäjän evästearvon perusteella  
function shuffleArray(array, seed) {
  const rng = seedrandom(seed); 
  const shuffledArray = [...array]; 

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

  return shuffledArray;
  }

app.get('/', (req, res) => {
  res.send('Server running!');
  });

app.get('/mp3', (req, res) => {
    const cookieValue = req.query.cookieValue
    console.log("cookievalue: " + cookieValue)
    const mp3Files = getMP3Files()
    const shuffledMp3Files = shuffleArray(mp3Files, cookieValue)
    res.json(shuffledMp3Files);
  });

app.use('/mp3', express.static(mp3FolderPath));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  });