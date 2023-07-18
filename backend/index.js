const express = require('express');
var fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server running!');
  });

const port = 3000;

function getMP3Files() {
  
    var folderPath = path.join(__dirname, 'mp3');
    const files = fs.readdirSync(folderPath);
  
    const mp3Files = files.filter(file => {
      const filePath = path.join(folderPath, file);
      const fileExtension = path.extname(filePath);
      return fileExtension.toLowerCase() === '.mp3';
    });
  
    return mp3Files;
  }

app.get('/mp3', (req, res) => {
    const mp3Files = getMP3Files();
    res.json(mp3Files);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  });