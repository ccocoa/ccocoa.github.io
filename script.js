let currentLevel = 0;
let levels = [];

// Setup initial state for CTF
document.cookie = "flag=CTF{XSS_BASIC_101}";
localStorage.setItem("flag", "CTF{DOM_XSS_PRO}");

fetch('levels.json')
  .then(res => res.json())
  .then(data => {
    levels = data.levels;
    renderLevel();
  });

function renderLevel() {
  const level = levels[currentLevel];
  const container = document.getElementById('game-container');
  container.innerHTML = `
    <h2>Level ${level.id}: ${level.title}</h2>
    <p>${level.material}</p>
    <p><strong>Tugas:</strong> ${level.task}</p>
    
    <div style="border: 2px dashed #ff4757; padding: 15px; margin: 10px 0;">
      <h3>Area Eksploitasi</h3>
      <input type="text" id="xss-input" placeholder="Masukkan payload...">
      <button onclick="runXSS()">Jalankan</button>
      <div id="display"></div>
    </div>

    <div style="border: 2px solid #2ed573; padding: 15px;">
      <h3>Area Submit Flag</h3>
      <input type="text" id="flag-input" placeholder="CTF{...}">
      <button onclick="checkFlag()">Submit Flag</button>
    </div>
  `;
}

function runXSS() {
  const input = document.getElementById('xss-input').value;
  document.getElementById('display').innerHTML = input;
}

function checkFlag() {
  const input = document.getElementById('flag-input').value;
  if (input === levels[currentLevel].flag) {
    alert('Mantap, flag benar! Lanjut level berikutnya.');
    currentLevel++;
    if (currentLevel < levels.length) renderLevel();
    else alert('Selamat, kamu sudah menamatkan semua level!');
  } else {
    alert('Flag salah, coba lagi!');
  }
}
