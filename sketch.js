let questions = [];
let jokerBounds = [
  new Rect2D(76, 32, 96, 96),
  new Rect2D(183, 32, 96, 96),
  new Rect2D(292, 32, 96, 96),
];
let exitBounds = new Rect2D(2, 735, 118, 30);
let timerBounds = new Rect2D(472, 166, 128, 128);
let moneyLevelBounds = new Rect2D(776, 43, 150, 20.5);
let questionBounds = new Rect2D(161, 403, 704, 118);
let answerBounds = [
  new Rect2D(120, 572, 334, 55),
  new Rect2D(572, 572, 334, 55),
  new Rect2D(120, 654, 334, 55),
  new Rect2D(572, 654, 334, 55),
];
let moneyLookUp = [
  0,
  50,
  100,
  200,
  300,
  500,
  1000,
  2000,
  4000,
  8000,
  16000,
  32000,
  64000,
  125000,
  500000,
  1000000,
];
let usedJokers, moneyLevel, gameState, loseText;
let backgroundImage, mainTheme, wrongSFX, rightSFX, jokerUsedSFX;
let volumeSlider;

function preload() {
  backgroundImage = loadImage("assets/background.png");
  mainTheme = loadSound("assets/beginning.mp3");
  wrongSFX = loadSound("assets/wrong.mp3");
  rightSFX = loadSound("assets/right.mp3");
  jokerUsedSFX = loadSound("assets/jokerUsed.mp3");
  questions = loadQuestions("assets/questions.txt");

  jokerUsedSFX.amp(5.0);
}

function setup() {
  createCanvas(1024, 768);
  volumeSlider = createSlider(0, 1, 0.2, 0.01);
  startGame();
}

function draw() {
  image(backgroundImage, 0, 0);
  mainTheme.amp(volumeSlider.value());
  let question, j, i;
  switch (gameState) {
    case 0:
      question = questions[moneyLevel];
      questionBounds.text2d(question.text, 24);
      for (i = 0; i < 4; i++) answerBounds[i].text2d(question.answers[i], 24);
      break;
    case 1:
      question = questions[moneyLevel];
      j = question.correct;
      answerBounds[j].text2d(question.answers[j], 24);
      questionBounds.text2d(loseText, 72);
      break;
    case 2:
      questionBounds.text2d("you won:" + moneyLookUp[moneyLevel], 72);
      break;
  }
  let moneyRect = moneyLevelBounds.copy();
  moneyRect.y += (15 - moneyLevel) * moneyRect.height;
  if (moneyLevel > 0) {
    moneyRect.rect2d();
  }
  for (let i = 0; i < jokerBounds.length; i++) {
    if (usedJokers[i]) {
      jokerBounds[i].rect2d();
      jokerBounds[i].line2d();
    }
  }
}

function mousePressed() {
  if (exitBounds.contains(mouseX, mouseY)) {
    gameState = 2;
    return;
  }
  if (gameState == 0) {
    for (let i = 0; i < jokerBounds.length; i++)
      if (jokerBounds[i].contains(mouseX, mouseY)) {
        if (usedJokers[i]) {
          jokerUsedSFX.play();
        } else {
          usedJokers[i] = true;
          jokerBounds[i].rect2d();
          jokerBounds[i].line2d();
        }
      }

    for (let i = 0; i < 4; i++)
      if (answerBounds[i].contains(mouseX, mouseY)) {
        if (i == questions[moneyLevel].correct) {
          moneyLevel++;
          if (moneyLevel >= questions.length) gameState = 2;
          rightSFX.play();
        } else {
          gameState = 1;
          loseText = random(["WhatTheHeck™", "EASY™", "how?™", "rly?™", "JUNGE™"]);
          wrongSFX.play();
        }
      }
  } else {
    startGame();
  }
}

function startGame() {
  mainTheme.stop();
  mainTheme.play();
  usedJokers = [0, 0, 0];
  moneyLevel = 0;
  gameState = 0;
}
