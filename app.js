const mp3Folder = 'http://localhost:3000/mp3'; 

const cookieName = "biisiRandomiser_app_user_id"
const expiresInDays = 30

async function fetchSongFilenames() {
  const MP3UrlWithCookieValue = `${mp3Folder}?cookieValue=${getCookieValue()}`;
  return fetch(MP3UrlWithCookieValue)
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching song filenames:', error);
    });
  }
  
function checkCookie(cookieName) {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      return true; // Cookie exists
    }
  }
  return false; // Cookie does not exist
  }

function getCookieValue() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      return value
    }
  }
  return createCookie()
  }

function createCookie() {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expiresInDays);

  /*
  luodaan käyttäjäkohtainen satunnaisnumero, jota käytetään 
  backendissä seedinä luomaan personoitu kappalejärjestys
  */
  var cookieValue = Math.floor(Math.random() * 1000000);  

  const cookieString = `${cookieName}=${cookieValue};expires=${expirationDate.toUTCString()};path=/;SameSite=Lax`;
  document.cookie = cookieString;
  return cookieValue
  }

function deleteCookie() {
  document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }  