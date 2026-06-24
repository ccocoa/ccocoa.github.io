let currentLevel = 0;
let levels = [];

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
    <input type="text" id="answer" placeholder="Masukkan jawaban...">
    <button class="btn" onclick="checkAnswer()">Submit</button>
  `;
}

function checkAnswer() {
  const answer = document.getElementById('answer').value;
  if (answer === levels[currentLevel].goal) {
    alert('Mantap, lanjut!');
    currentLevel++;
    if (currentLevel < levels.length) renderLevel();
    else alert('Tamat!');
  } else {
    alert('Coba lagi ya!');
  }
}
