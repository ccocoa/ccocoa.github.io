import levels from '../data/levels.json';

let currentLevel = 0;

export const initGame = () => {
    const username = sessionStorage.getItem('username');
    if (username) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('game-ui').style.display = 'block';
        document.getElementById('user-info').style.display = 'flex';
        document.getElementById('username-display').innerText = username;
        renderLevel();
    }
};

const getSessionFlag = (levelId) => {
    let sessionFlag = sessionStorage.getItem(`flag_lvl_${levelId}`);
    if (!sessionFlag) {
        sessionFlag = `CTF{${Math.random().toString(36).substring(2, 15).toUpperCase()}_${levelId}}`;
        sessionStorage.setItem(`flag_lvl_${levelId}`, sessionFlag);
    }
    return sessionFlag;
};

const renderLevel = () => {
    const level = levels.levels[currentLevel];
    const container = document.getElementById('level-content');
    
    getSessionFlag(level.id);
    
    container.innerHTML = `
        <section class="card">
            <h2>Level ${level.id}: ${level.title}</h2>
            <p><strong>Konsep:</strong> ${level.concept}</p>
            <p><strong>Tugas:</strong> ${level.challenge}</p>
        </section>
        <section class="card">
          <h3>Playground</h3>
          <input type="text" id="xss-input" placeholder="Masukkan payload...">
          <button id="run-xss">Jalankan</button>
          <div id="display" class="output-box"></div>
        </section>
    `;
};
