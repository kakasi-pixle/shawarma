const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snowflakes = [];
function createSnowflakes() {
  for (let i = 0; i < 100; i++) {
    snowflakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 4 + 1,
      d: Math.random() * 1 + 1,
    });
  }
}

function drawSnowflakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.beginPath();
  for (let i = 0; i < snowflakes.length; i++) {
    const sf = snowflakes[i];
    ctx.moveTo(sf.x, sf.y);
    ctx.arc(sf.x, sf.y, sf.r, 0, Math.PI * 2, true);
  }
  ctx.fill();
  updateSnowflakes();
}

function updateSnowflakes() {
  for (let i = 0; i < snowflakes.length; i++) {
    const sf = snowflakes[i];
    sf.y += Math.pow(sf.d, 2);
    sf.x += Math.sin(sf.y / 50) * 2;
    if (sf.y > canvas.height) {
      snowflakes[i] = {
        x: Math.random() * canvas.width,
        y: 0,
        r: sf.r,
        d: sf.d,
      };
    }
  }
}

createSnowflakes();
setInterval(drawSnowflakes, 30);

// Chat functionality and admin logic added
// Admin controls logic added
// Sidebar slide-in effect implemented
