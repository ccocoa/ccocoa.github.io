export const startSession = () => {
    const username = document.getElementById('username-input').value;
    if (!username) {
        alert('Masukkan nama terlebih dahulu!');
        return;
    }
    sessionStorage.setItem('username', username);
    location.reload();
};

export const logout = () => {
    sessionStorage.clear();
    location.reload();
};
