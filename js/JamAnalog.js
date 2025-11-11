const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);

function drawClock() {
  ctx.clearRect(-radius, -radius, radius*2, radius*2);
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
  drawCenter(ctx, radius);
  drawSecondDots(ctx, radius);
}

function drawFace(ctx, radius) {
  const grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#111');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#111');
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawCenter(ctx, radius) {
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, 2*Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  ctx.font = radius*0.16 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(let num = 1; num < 13; num++){
    let ang = num * Math.PI / 6;
    if (num === 3 || num === 6 || num === 9 || num === 12) {
      ctx.font = radius*0.20 + "px roman";
      ctx.fillStyle = 'blue';
    } else {
      ctx.font = radius*0.12 + "px arial";
      ctx.fillStyle = 'black';
    }
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.80);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.80);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  //hour
  hour=hour%12;
  hour=(hour*Math.PI/6)+ (minute*Math.PI/(6*60))+ (second*Math.PI/(360*60));
  drawHand(ctx, hour, radius*0.5, radius*0.1, '#333');
  //minute
  minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
  drawHand(ctx, minute, radius*0.8, radius*0.07, '#333');
  // second
  second=(second*Math.PI/30);
  drawHand(ctx, second, radius*0.9, radius*0.02, 'red');
}

function drawHand(ctx, pos, length, width, color) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.lineCap = "round";
  ctx.moveTo(0,0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}
function drawSecondDots(ctx, radius) {
  for (let i = 0; i < 60; i++) {
    let ang = i * Math.PI / 30;
    let dotRadius = i % 5 === 0 ? 3 : 1;
    ctx.beginPath();
    ctx.arc(radius * 0.91 * Math.sin(ang), -radius * 0.91 * Math.cos(ang), dotRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
  }
}