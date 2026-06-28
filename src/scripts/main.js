let levels = [];

// Hooking alert
const originalAlert = window.alert;
window.alert = function(message) {
    if (message === 1) {
        const username = sessionStorage.getItem('username');
        fetch('/api/get-flag', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        })
        .then(res => res.json())
        .then(data => {
            if (data.flag) {
                const display = document.querySelector(`[id^="display-"]`);
                if (display) {
                    display.innerHTML = `Flag ditemukan: ${data.flag}`;
                }
                originalAlert(`Flag: ${data.flag}`);
            }
        })
        .catch(err => console.error(err));
    } else {
        originalAlert(message);
    }
};

// Inisialisasi saat load
document.addEventListener('DOMContentLoaded', () => {
    const username = sessionStorage.getItem('username');
    if (username) {
        showMissionBoard(username);
    }
});

window.startSession = function() {
    const username = document.getElementById('username-input').value;
    if (!username) {
        alert('Masukkan nama terlebih dahulu!');
        return;
    }
    sessionStorage.setItem('username', username);
    showMissionBoard(username);
}

window.logout = function() {
    sessionStorage.clear();
    setTimeout(() => {
        location.reload();
    }, 100);
}

function showMissionBoard(username) {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('mission-board').style.display = 'block';
    const userInfo = document.getElementById('user-info');
    userInfo.style.display = 'flex';
    document.getElementById('username-display').innerText = username;

    fetch('/levels.json')
        .then(res => res.json())
        .then(data => {
            levels = data.levels;
            renderMissionBoard();
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

function renderMissionBoard() {
    if (!sessionStorage.getItem('username')) return;

    const container = document.getElementById('mission-content');
    container.innerHTML = levels.map(level => {
        const isDone = localStorage.getItem(`task_done_${level.id}`) === 'true';
        const flag = getSessionFlag(level.id);
        
        return `
            <div class="collapse collapse-arrow bg-base-200 border ${isDone ? 'border-success' : 'border-base-300'}">
                <input type="checkbox" /> 
                <div class="collapse-title text-xl font-medium flex justify-between items-center">
                    <span>Level ${level.id}: ${level.title}</span>
                    ${isDone ? '<span class="badge badge-success">Selesai</span>' : '<span class="badge badge-ghost">Pending</span>'}
                </div>
                <div class="collapse-content px-4">
                    <div class="space-y-4 pt-4">
                        <div class="text-sm px-2">
                            <p><strong>Konsep:</strong> ${level.concept}</p>
                            <p><strong>Tugas:</strong> ${level.challenge}</p>
                        </div>
                        
                        <div class="p-4 bg-base-100 rounded border">
                            <h4 class="font-bold mb-2">Playground</h4>
                            <input type="text" id="input-${level.id}" placeholder="Masukkan payload..." class="input input-bordered w-full mb-2 px-4">
                            <button onclick="runTask('${level.id}')" class="btn btn-secondary btn-sm px-4 mt-2">Jalankan</button>
                            <div id="display-${level.id}" class="mt-2 p-2 bg-base-300 rounded min-h-[30px] px-4"></div>
                        </div>

                        <div class="p-4 bg-base-100 rounded border">
                            <h4 class="font-bold mb-2">Submission</h4>
                            <input type="text" id="flag-${level.id}" placeholder="CTF{...}" class="input input-bordered w-full mb-2 px-4">
                            <button onclick="submitTask('${level.id}')" class="btn btn-primary btn-sm px-4 mt-2">Submit Flag</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

window.runTask = function(id) {
    const input = document.getElementById(`input-${id}`).value;
    try {
        eval(input);
    } catch (e) {
        document.getElementById(`display-${id}`).innerHTML = input;
    }
}

window.submitTask = async function(id) {
    const input = document.getElementById(`flag-${id}`).value;
    
    try {
        const response = await fetch('/api/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ levelId: id, flag: input })
        });
        const result = await response.json();
        
        if (result.success) {
            localStorage.setItem(`task_done_${id}`, 'true');
            alert('Mantap, flag benar!');
            renderMissionBoard();
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat memvalidasi flag.');
    }
}
