const express = require('express');
var fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const mp3FolderPath = path.join(__dirname, 'mp3');
const port = 3000;

function getMP3Files() {
  
    const files = fs.readdirSync(mp3FolderPath);
  
    const mp3Files = files.filter(file => {
      const filePath = path.join(folderPath, file);
      const fileExtension = path.extname(filePath);
      return fileExtension.toLowerCase() === '.mp3';
    });
  
    return mp3Files;
  }

app.get('/', (req, res) => {
  res.send('Server running!');
  });

app.get('/mp3', (req, res) => {
    const mp3Files = getMP3Files();
    res.json(mp3Files);
  });

app.use('/mp3', express.static(mp3FolderPath));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  });