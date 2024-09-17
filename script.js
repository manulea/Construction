// script.js

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
let isPainting = false;

canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mousemove', draw);

function startPainting(e) {
    isPainting = true;
    draw(e);
}

function stopPainting() {
    isPainting = false;
    ctx.beginPath(); // Start a new path for the next stroke
}

function draw(e) {
    if (!isPainting) return;

    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    ctx.lineWidth = 5; // Adjust brush size as desired
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.8)'; // Red color (you can change this)

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}