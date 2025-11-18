// 使用 `A.png` 的精靈表逐幀播放，單幀尺寸固定為 83x84
let spriteImg;
const FRAME_W = 83;
const FRAME_H = 84;
let cols = 0;
let rows = 0;
let totalFrames = 0;
let currentFrame = 0;
let frameDelay = 6; // 幀延遲，數值越小動畫越快
let frameTimer = 0;
let paused = false;

function preload() {
  // 請確保專案中有 `A.png`
  spriteImg = loadImage('A.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  // 推斷列與行數
  cols = max(1, floor(spriteImg.width / FRAME_W));
  rows = max(1, floor(spriteImg.height / FRAME_H));
  totalFrames = max(1, cols * rows);
  currentFrame = 0;
}

function draw() {
  background(30);

  // 更新幀（除非暫停）
  if (!paused) {
    frameTimer++;
    if (frameTimer >= frameDelay) {
      currentFrame = (currentFrame + 1) % totalFrames;
      frameTimer = 0;
    }
  }

  // 計算來源座標
  let sx = (currentFrame % cols) * FRAME_W;
  let sy = floor(currentFrame / cols) * FRAME_H;

  // 繪製於視窗中央（不縮放，若想放大可乘上 scaleFactor）
  const scaleFactor = 1; // 若要放大，改為 2 或其他
  push();
  translate(width / 2, height / 2);
  image(spriteImg, 0, 0, FRAME_W * scaleFactor, FRAME_H * scaleFactor, sx, sy, FRAME_W, FRAME_H);
  pop();

  // 介面文字
  noStroke();
  fill(255);
  textSize(14);
  const status = paused ? '暫停' : '播放';
  text(`檔案: A.png | 狀態: ${status} | 幀: ${currentFrame + 1}/${totalFrames}`, 10, 20);
  text(`每幀尺寸: ${FRAME_W}×${FRAME_H} px | 點擊切換暫停/播放`, 10, 40);
}

function mousePressed() {
  paused = !paused;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
