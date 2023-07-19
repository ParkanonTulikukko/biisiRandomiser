const mp3Folder = 'http://localhost:3000/mp3'; 

async function fetchSongFilenames() {
  return fetch(mp3Folder)
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching song filenames:', error);
    });
}

fetch(mp3Folder)
  .then(response => response.json())
  .then(mp3Files => {
    displayMP3Filenames(mp3Files);
  })
  .catch(error => {
    console.error('Error:', error);
  });  