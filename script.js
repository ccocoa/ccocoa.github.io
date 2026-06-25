let currentLevel = 0;
let levels = [];

// Inisialisasi saat load
document.addEventListener('DOMContentLoaded', () => {
    const username = sessionStorage.getItem('username');
    if (username) {
        showGameUI(username);
    }
});

function startSession() {
    const username = document.getElementById('username-input').value;
    if (!username) {
        alert('Masukkan nama terlebih dahulu!');
        return;
    }
    sessionStorage.setItem('username', username);
    showGameUI(username);
}

function logout() {
    sessionStorage.clear();
    setTimeout(() => {
        location.reload();
    }, 100);
}

function showGameUI(username) {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('game-ui').style.display = 'block';
    const userInfo = document.getElementById('user-info');
    userInfo.style.display = 'flex';
    document.getElementById('username-display').innerText = username;

    fetch('levels.json')
        .then(res => res.json())
        .then(data => {
            levels = data.levels;
            renderLevel();
        });
}

function getSessionFlag(levelId) {
    let sessionFlag = sessionStorage.getItem(`flag_lvl_${levelId}`);
    if (!sessionFlag) {
        sessionFlag = `CTF{${Math.random().toString(36).substring(2, 15).toUpperCase()}_${levelId}}`;
        sessionStorage.setItem(`flag_lvl_${levelId}`, sessionFlag);
    }
    return sessionFlag;
}

function renderLevel() {
    if (!sessionStorage.getItem('username')) return;

    const level = levels[currentLevel];
    const container = document.getElementById('level-content');
    
    getSessionFlag(level.id);
    
    container.innerHTML = `
        <section class="card">
            <h2>Level ${level.id}: ${level.title}</h2>
            <p><strong>Konsep:</strong> ${level.concept}</p>
            <p><strong>Kasus Nyata:</strong> ${level.real_world_case}</p>
            <p><strong>Analisis Teknis:</strong> ${level.technical_analysis}</p>
            <p><strong>Tugas:</strong> ${level.challenge}</p>
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
