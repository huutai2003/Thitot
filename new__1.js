const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticle(x, y) {
  const colors = ['#ff4081', '#fdd835', '#00e676', '#29b6f6'];
  for (let i = 0; i < 30; i++) {
    particles.push({
      x: x,
      y: y,
      radius: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 5 + 2,
      alpha: 1
    });
  }
}

function updateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.alpha > 0);

  for (let p of particles) {
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.alpha -= 0.01;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(${hexToRgb(p.color)},${p.alpha})`;
    ctx.fill();
  }

  requestAnimationFrame(updateParticles);
}

function hexToRgb(hex) {
  let bigint = parseInt(hex.replace('#',''), 16);
  return `${(bigint >> 16) & 255},${(bigint >> 8) & 255},${bigint & 255}`;
}

canvas.addEventListener('click', (e) => {
  createParticle(e.clientX, e.clientY);
});

setInterval(() => {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height / 2;
  createParticle(x, y);
}, 1500);

updateParticles();
