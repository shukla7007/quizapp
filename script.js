const quizQuestions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Rome"],
      correctAnswer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars"
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Cu", "Fe"],
      correctAnswer: "Au"
    },
    {
      question: "What is the largest mammal in the world?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Hippo"],
      correctAnswer: "Blue Whale"
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
      correctAnswer: "Leonardo da Vinci"
    },
    {
      question: "What is the tallest mountain in the world?",
      options: ["Mount Kilimanjaro", "Mount Everest", "Mount Fuji", "Mount McKinley"],
      correctAnswer: "Mount Everest"
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["Wa", "H2O", "Wt", "O2"],
      correctAnswer: "H2O"
    },
    {
      question: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "Japan", "India", "South Korea"],
      correctAnswer: "Japan"
    },
    {
        question: "Who wrote the famous play 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
        correctAnswer: "William Shakespeare"
      },
      {
        question: "What is the chemical symbol for oxygen?",
        options: ["Ox", "O2", "Ox2", "Om"],
        correctAnswer: "O2"
      },
      {
        question: "Which planet is known as the 'Morning Star' or 'Evening Star'?",
        options: ["Mars", "Venus", "Mercury", "Jupiter"],
        correctAnswer: "Venus"
      },
      {
        question: "What is the currency of Japan?",
        options: ["Dollar", "Euro", "Yen", "Pound"],
        correctAnswer: "Yen"
      },
      {
        question: "Who invented the telephone?",
        options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Guglielmo Marconi"],
        correctAnswer: "Alexander Graham Bell"
      }
  ];

const quizContainer = document.querySelector(".quiz-container");
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const startButton = document.getElementById("start-button");
const timerText = document.getElementById("timer");

// Variables to track quiz state
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30; // Initial time for each question
let timerInterval;
let quizEnded = false;

// Function to start the quiz
function startQuiz() {
  startButton.style.display = "none";
  displayQuestion();
}

// Function to display a question and start the timer
function displayQuestion() {
  resetTimer(); // Reset the timer for each question
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  answerButtons.innerHTML = "";

  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("answer-button");
    answerButtons.appendChild(button);

    button.addEventListener("click", handleAnswerClick);
  });

  startTimer();
}

// Function to handle the click event on answer buttons
function handleAnswerClick() {
  if (!quizEnded) {
    const selectedOption = this.innerText;
    const currentQuestion = quizQuestions[currentQuestionIndex];

    if (selectedOption === currentQuestion.correctAnswer) {
      score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }
}

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerText.textContent = timeLeft;

    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

// Function to reset the timer for each question
function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 30; // Reset time to 30 seconds
  timerText.textContent = timeLeft;
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval);
  quizEnded = true;
  const scorePercentage = (score / quizQuestions.length) * 100;
  const resultMessage = `
    <h2>Quiz Completed!</h2>
    <p>Your Score: ${score} out of ${quizQuestions.length}</p>
    <p>Score Percentage: ${scorePercentage.toFixed(2)}%</p>
  `;
  questionText.innerHTML = resultMessage;
  // Remove event listeners from answer buttons
  answerButtons.querySelectorAll("button").forEach(button => {
    button.removeEventListener("click", handleAnswerClick);
  });
}

// Event listener for start button
startButton.addEventListener("click", startQuiz);
