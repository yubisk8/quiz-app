// ===== 設問データ（オリジナルの一般常識クイズ・全5問・4択） =====
const quizData = [
  {
    question: "1年のうち、日本で「立春」が訪れるのはおおよそ何月でしょう？",
    choices: ["2月", "4月", "6月", "8月"],
    answer: 0,
  },
  {
    question: "虹は一般的に何色で表されることが多いでしょう？",
    choices: ["3色", "5色", "7色", "9色"],
    answer: 2,
  },
  {
    question: "正三角形の内角は、1つあたり何度でしょう？",
    choices: ["45度", "60度", "90度", "120度"],
    answer: 1,
  },
  {
    question: "水が氷になる温度は、セ氏（℃）で何度でしょう？",
    choices: ["0度", "10度", "32度", "100度"],
    answer: 0,
  },
  {
    question: "1日は何時間でしょう？",
    choices: ["12時間", "24時間", "36時間", "48時間"],
    answer: 1,
  },
];

// ===== 状態 =====
let currentIndex = 0; // 現在の問題番号（0始まり）
let score = 0; // 正解数

// ===== DOM 参照 =====
const quizScreen = document.getElementById("quiz");
const resultScreen = document.getElementById("result");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const commentEl = document.getElementById("comment");
const restartBtn = document.getElementById("restart-btn");

// ===== 問題を表示する =====
function showQuestion() {
  const current = quizData[currentIndex];

  // 進捗表示
  progressText.textContent = `第 ${currentIndex + 1} 問 / 全 ${quizData.length} 問`;
  progressFill.style.width = `${(currentIndex / quizData.length) * 100}%`;

  // 問題文
  questionEl.textContent = current.question;

  // フィードバック・次へボタンをリセット
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextBtn.hidden = true;

  // 選択肢ボタンを生成
  choicesEl.innerHTML = "";
  current.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice;
    btn.addEventListener("click", () => selectAnswer(index));
    choicesEl.appendChild(btn);
  });
}

// ===== 回答を選択したときの処理 =====
function selectAnswer(selectedIndex) {
  const current = quizData[currentIndex];
  const buttons = choicesEl.querySelectorAll(".choice-btn");

  // すべてのボタンを操作不可にし、正解・不正解を色分けする
  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === current.answer) {
      btn.classList.add("correct");
    } else if (index === selectedIndex) {
      btn.classList.add("incorrect");
    }
  });

  // フィードバック表示
  if (selectedIndex === current.answer) {
    score++;
    feedbackEl.textContent = "正解！";
    feedbackEl.classList.add("correct");
  } else {
    const correctText = current.choices[current.answer];
    feedbackEl.textContent = `不正解… 正解は「${correctText}」です。`;
    feedbackEl.classList.add("incorrect");
  }

  // 次のアクション用ボタン
  nextBtn.hidden = false;
  nextBtn.textContent =
    currentIndex === quizData.length - 1 ? "結果を見る" : "次の問題へ";
}

// ===== 次の問題へ／結果へ =====
function goNext() {
  currentIndex++;
  if (currentIndex < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// ===== 結果を表示する =====
function showResult() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;

  scoreEl.textContent = `${quizData.length}問中 ${score}問 正解`;
  commentEl.textContent = getComment(score, quizData.length);
}

// ===== スコアに応じたコメント =====
function getComment(score, total) {
  const rate = score / total;
  if (rate === 1) return "全問正解！すばらしいです！";
  if (rate >= 0.6) return "good！なかなかの常識力です。";
  if (rate >= 0.2) return "もう少し！復習して再挑戦しましょう。";
  return "ドンマイ！もう一度チャレンジしてみましょう。";
}

// ===== 最初からやり直す =====
function restart() {
  currentIndex = 0;
  score = 0;
  resultScreen.hidden = true;
  quizScreen.hidden = false;
  showQuestion();
}

// ===== イベント登録・初期化 =====
nextBtn.addEventListener("click", goNext);
restartBtn.addEventListener("click", restart);

showQuestion();
