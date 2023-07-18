window.addEventListener('load', function() {

  const mp3Folder = 'http://localhost:3000/mp3'; 

  function displayMP3Filenames(mp3Files) {
    const audioListDiv = document.getElementById('audioList');
  
    mp3Files.forEach(mp3File => {
      const filenameElement = document.createElement('p');
      filenameElement.textContent = mp3File;
      audioListDiv.appendChild(filenameElement);
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
  
  })