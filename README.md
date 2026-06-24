# CTF DOM-based XSS Challenge

This is a simple CTF challenge demonstrating DOM-based XSS.

## How to play
1. Open `index.html` in your browser.
2. The goal is to steal the flag stored in `localStorage`.
3. Use the input field to inject a script that reads `localStorage.getItem('flag')` and displays it.
