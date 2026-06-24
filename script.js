let currentLevel = 0;
let levels = [];

// Generate dynamic session flag
function getSessionFlag(levelId) {
    let sessionFlag = sessionStorage.getItem(`flag_lvl_${levelId}`);
    if (!sessionFlag) {
        sessionFlag = `CTF{${Math.random().toString(36).substring(2, 15).toUpperCase()}_${levelId}}`;
        sessionStorage.setItem(`flag_lvl_${levelId}`, sessionFlag);
    }
    return sessionFlag;
}

fetch('levels.json')
  .then(res => res.json())
  .then(data => {
    levels = data.levels;
    renderLevel();
  });

function renderLevel() {
  const level = levels[currentLevel];
  const container = document.getElementById('game-container');
  
  // Dynamic UI Rendering
  container.innerHTML = `
    <section class="card">
        <h2>Level ${level.id}: ${level.title}</h2>
        <p>${level.material}</p>
        <p><strong>Tugas:</strong> ${level.task}</p>
    </section>

    <section class="card" id="playground">
      <h3>Playground</h3>
      <input type="text" id="xss-input" placeholder="Masukkan payload...">
      <button onclick="runXSS()">Jalankan</button>
      <div id="display" class="output-box"></div>
    </section>

    <section class="card" id="submission">
      <h3>Flag Submission</h3>
      <input type="text" id="flag-input" placeholder="CTF{...}">
      <button onclick="checkFlag()">Submit Flag</button>
    </section>
  `;
}

function runXSS() {
  const input = document.getElementById('xss-input').value;
  document.getElementById('display').innerHTML = input;
}

function checkFlag() {
  const input = document.getElementById('flag-input').value;
  const correctFlag = getSessionFlag(levels[currentLevel].id);
  
  if (input === correctFlag) {
    alert('Mantap, flag benar! Lanjut level berikutnya.');
    currentLevel++;
    if (currentLevel < levels.length) renderLevel();
    else alert('Selamat, kamu sudah menamatkan semua level!');
  } else {
    alert('Flag salah, coba lagi!');
  }
}
