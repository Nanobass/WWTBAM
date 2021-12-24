function Rect2D(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.copy = function () {
    return new Rect2D(this.x, this.y, this.width, this.height);
  };

  this.contains = function (px, py) {
    return (
      px >= this.x &&
      py >= this.y &&
      px < this.x + this.width &&
      py < this.y + this.height
    );
  };
  this.action = function (callBack) {
    if (this.contains(mouseX, mouseY)) {
      callBack();
    }
  };

  this.rect2d = function () {
    stroke(255);
    strokeWeight(2);
    noFill();
    rect(this.x, this.y, this.width, this.height);
  };
  this.line2d = function () {
    stroke(255);
    strokeWeight(2);
    noFill();
    line(this.x, this.y, this.x + this.width, this.y + this.height);
  };
  this.text2d = function (txt, size) {
    this.text2dLines(txt.split("\\n"), size);
  };

  this.text2dLines = function (txts, size) {
    textSize(size);
    noStroke();
    strokeWeight(1);
    fill(255);
    for (let i = 0; i < txts.length; i++) {
      let cx = this.x + (this.width - textWidth(txts[i])) / 2;
      let cy = this.y + (this.height - size * txts.length) / 2 + i * size;
      text(txts[i], cx, cy + size);
    }
  };
}

function Question(quest, answers, rightIndex) {
  this.text = quest;
  this.answers = answers;
  this.correct = rightIndex;
}

function loadQuestions(file) {
  let result = [];
  loadStrings(file, function (lines) {
    for (let i = 0; i < lines.length; i++) {
      let quest = lines[i].split(";");
      if (quest.length >= 6) {
        result.push(
          new Question(
            quest[0],
            [
              "A: " + quest[1],
              "B: " + quest[2],
              "C: " + quest[3],
              "D: " + quest[4],
            ],
            int(quest[5])
          )
        );
      }
    }
  });
  return result;
}
