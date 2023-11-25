const tDarkMode = document.querySelector('.tDarkMode');
const tombolParent = document.querySelector('.tombolParent');
const fontDatabase = document.querySelectorAll('.fontDatabase');

// Fungsi untuk mengubah tema halaman HTML

function toggleDarkMode(isDarkMode) {
  
  const body = document.querySelector('.body');
  if (isDarkMode) {
    body.classList.add('darkMode');
    tombolParent.classList.add('tombolPOn');
    tDarkMode.classList.add('tombolOn');
    for(let i = 0 ; i < fontDatabase.length; i++){
      fontDatabase[i].style.color = 'white';
    }

    
  } else {
    body.classList.remove('darkMode');
    tombolParent.classList.remove('tombolPOn');
    tDarkMode.classList.remove('tombolOn');
    for(let i = 0 ; i < fontDatabase.length; i++){
      fontDatabase[i].style.color = 'black';
    }
    
  
  }
}

// Fungsi untuk menyimpan preferensi pengguna dalam cookie
function setDarkModePreference(isDarkMode) {
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);
  document.cookie = `darkMode=${isDarkMode};expires=${expirationDate.toUTCString()};path=/`;
}

// Fungsi untuk memuat preferensi pengguna dari cookie
function getDarkModePreference() {
  const cookie = document.cookie.split(';').find((c) => c.trim().startsWith('darkMode='));
  if (cookie) {
    const isDarkMode = cookie.split('=')[1] === 'true';
    return isDarkMode;
  }
  return null;
}

// Memeriksa apakah preferensi pengguna tersimpan dalam cookie
const savedDarkModePreference = getDarkModePreference();

// Jika preferensi pengguna tersimpan dalam cookie, maka mengubah tema halaman HTML sesuai dengan preferensi tersebut
if (savedDarkModePreference !== null) {
  toggleDarkMode(savedDarkModePreference);
}

// Menambahkan event listener untuk tombol toggle mode gelap
const toggleDarkModeButton = document.querySelector('.tombolOnOf');
toggleDarkModeButton.addEventListener('click', () => {
  const body = document.querySelector('.body');
  const isDarkMode = body.classList.toggle('darkMode');
  toggleDarkMode(isDarkMode);
  setDarkModePreference(isDarkMode);
});




//   tombolParent.addEventListener('click', ()=>{
//     tombolParent.classList.toggle('tombolPOn');
//     tDarkMode.classList.toggle('tombolOn');
// });