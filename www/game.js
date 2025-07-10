const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let birdImg = new Image();
birdImg.src = "bird.png";
let birds = [];
let score = 0;
let gameDuration = 180000; // 3 minutes
let startTime = Date.now();

function spawnBird() {
  let x = Math.random() * (canvas.width - 50);
  let y = -50;
  let speed = 2 + Math.random() * 3;
  birds.push({ x, y, speed });
}

function update() {
  let now = Date.now();
  if (now - startTime > gameDuration) {
    alert("انتهى الوقت! نتيجتك: " + score);
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < birds.length; i++) {
    let b = birds[i];
    b.y += b.speed;
    ctx.drawImage(birdImg, b.x, b.y, 50, 50);
  }
  requestAnimationFrame(update);
}

canvas.addEventListener("click", (e) => {
  let rect = canvas.getBoundingClientRect();
  let clickX = e.clientX - rect.left;
  let clickY = e.clientY - rect.top;
  for (let i = birds.length - 1; i >= 0; i--) {
    let b = birds[i];
    if (
      clickX >= b.x &&
      clickX <= b.x + 50 &&
      clickY >= b.y &&
      clickY <= b.y + 50
    ) {
      birds.splice(i, 1);
      score++;
      break;
    }
  }
});

setInterval(spawnBird, 1000);
update();