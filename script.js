const PASSWORD = 'thcteamsecurity';
let currentGroup = 'games';
let currentTheme = 'dark'; // Por defecto oscuro

function checkPassword() {
  const pass = document.getElementById('password').value;
  if (pass === PASSWORD) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    loadMessages();
  } else {
    alert('Contraseña incorrecta');
  }
}

function setTheme(theme) {
  currentTheme = theme;
  document.body.classList.toggle('light-mode', theme === 'light');
  document.getElementById('sun-icon').classList.toggle('active', theme === 'light');
  document.getElementById('moon-icon').classList.toggle('active', theme === 'dark');
}

function switchGroup(group) {
  currentGroup = group;
  loadMessages();
}

function sendMessage() {
  const msg = document.getElementById('message').value;
  if (msg) {
    const encrypted = CryptoJS.AES.encrypt(msg, 'secret-key').toString(); // Encripta
    const messages = JSON.parse(localStorage.getItem(currentGroup) || '[]');
    messages.push({ text: encrypted, timestamp: new Date().toLocaleString() });
    localStorage.setItem(currentGroup, JSON.stringify(messages));
    document.getElementById('message').value = '';
    loadMessages();
  }
}

function loadMessages() {
  const messages = JSON.parse(localStorage.getItem(currentGroup) || '[]');
  const container = document.getElementById('messages');
  container.innerHTML = '';
  messages.forEach(msg => {
    const decrypted = CryptoJS.AES.decrypt(msg.text, 'secret-key').toString(CryptoJS.enc.Utf8);
    container.innerHTML += `<p><strong>${msg.timestamp}:</strong> ${decrypted}</p>`;
  });
}
