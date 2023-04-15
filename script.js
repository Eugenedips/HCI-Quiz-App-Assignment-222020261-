const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const feedbackElement = document.getElementById('feedback');
const studentNameElement = document.getElementById('student-name');
const studentNumberElement = document.getElementById('student-number');




let shuffledQuestions, currentQuestionIndex;
let score = 0;
let studentName = '';
let studentNumber = '';



function startTimer(duration, callback) {
  let timeLeft = duration;
  const intervalId = setInterval(() => {
    timerElement.textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(intervalId);
      callback();
    } else {
      timeLeft--;
    }
  }, 1000);
}


startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startQuiz() {
  // Get the values of student name and number
  studentName = studentNameElement.value;
  studentNumber = studentNumberElement.value;
  // Hide the start button and show the next button
  startButton.style.display="none";
  nextButton.style.display="block";
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove('hide');
  setNextQuestion();

  const duration = 200; // in seconds
  startTimer(duration, () => {
    // callback function to be executed when timer ends
    feedbackElement.innerText = `You scored ${score} out of ${questions.length}!`;
feedbackElement.classList.remove('hide');

 //renderChart();

 updateScoreChart();
  });
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
      feedbackElement.innerText = `You scored ${score} out of ${questions.length}!`;
      feedbackElement.classList.remove('hide');
      nextButton.classList.add('hide');
    }
    
  }
  
  function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('answer-button');
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button);
    });
  }
  
  function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    if (correct) {
      score++;
    }
    
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
      startButton.innerText = 'Restart';
      startButton.classList.remove('hide');
    }
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }


  /*function renderChart() {
    const data = {
      labels: ['Correct Answers', 'Wrong Answers'],
      datasets: [
        {
          label: 'Quiz Results',
          data: [score, questions.length - score],
          backgroundColor: ['#4CAF50', '#F44336'],
        },
      ],
    };


    const config = {
      type: 'pie',
      data,
    };
  
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, config);
  }
  */
  function updateScoreChart() {
    const chartElement = document.getElementById('chart');
    const chart = new Chart(chartElement, {
      type: 'pie',
      data: {
        labels: [`${studentName} (${studentNumber}) Correct`, `${studentName} (${studentNumber}) Wrong`],
        datasets: [{
          label: 'Score',
          data: [score, questions.length - score],
          backgroundColor: ['#4CAF50', '#F44336'],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Score Chart'
          }
        }
      }
    });
    document.getElementById('score-chart').innerHTML = chart.canvas.outerHTML;
  }
  

  
  const questions = [   
    
    {    
    question: 'What is the name of the protagonist in Attack on Titan?',    
  answers: [      
    { text: 'Eren Jaeger', correct: true },      
    { text: 'Monkey D. Luffy', correct: false },  
    { text: 'Naruto Uzumaki', correct: false },
    { text: 'Ichigo Kurosaki', correct: false },
    ]
  },
    
  {    
    question: 'In the anime Sword Art Online, what is the name of the virtual reality game the characters are trapped in?',    
  answers: [      
    { text: 'Aincrad', correct: true },      
    { text: 'Gun Gale Online', correct: false },  
    { text: 'Alfheim Online', correct: false },
    { text: 'Accel World', correct: false },
    ]
  },

  {    
    question: 'Which of these anime series is NOT based on a manga?',    
  answers: [      
    { text: 'One Piece', correct: false },      
    { text: 'Fullmetal Alchemist', correct: false },  
    { text: 'Cowboy Bebop', correct: true },
    { text: 'Death Note', correct: false },
    ]
  },


  {    
    question: 'Who is the main character in the anime series Naruto?',    
  answers: [      
    { text: 'Sasuke Uchiha', correct: false },      
    { text: 'Hinata Hyuga', correct: false },  
    { text: 'Sakura Haruno', correct: false },
    { text: 'Naruto Uzumaki', correct: true },
    ]
  },

  {    
    question: 'In the anime series Fairy Tail, what is the name of the magical guild that the main characters belong to?',    
  answers: [      
    { text: 'Phantom Lord', correct: false },      
    { text: 'Blue Pegasusa', correct: false },  
    { text: 'Fairy Tail', correct: true },
    { text: 'Lamia Scale', correct: false },
    ]
  },

  {    
    question: 'Which anime series features a character named Light Yagami, who gains the ability to kill anyone whose name he writes in a notebook?',    
  answers: [      
    { text: 'One Piece', correct: false },      
    { text: 'Death Note', correct: true },  
    { text: 'Attack on Titan', correct: false },
    { text: 'Naruto', correct: false },
    ]
  },

  {    
    question: 'What is the name of the main character in the anime series One Punch Man?',    
  answers: [      
    { text: 'Monkey D. Luffy', correct: false },      
    { text: 'Saitama', correct: true },  
    { text: 'Gon Freecss', correct: false },
    { text: 'Edward Elric', correct: false },
    ]
  },


  {    
    question: 'Which of these anime series is set in a post-apocalyptic world?',    
  answers: [      
    { text: 'Sailor Moon', correct: false },      
    { text: ' Pokemon', correct: false },  
    { text: 'Akira', correct: true },
    { text: 'Dragon Ball Z', correct: false },
    ]
  },


  {    
    question: 'In the anime series My Hero Academia, what is the name of the main protagonist who is born without a superpower in a world where most people have them?',    
  answers: [      
    { text: 'Izuku Midoriya', correct: true },      
    { text: ' Katsuki Bakugo', correct: false },  
    { text: 'Ochaco Uraraka', correct: false },
    { text: 'Shoto Todoroki', correct: false },
    ]
  },

    {
      question: 'What is the name of the anime series about a group of teenagers who pilot giant robots called Evangelions to fight monstrous beings known as Angels?',
      answers: [
        { text: 'Fullmetal Alchemist', correct: false },
        { text: 'Code Geass', correct: false },
        { text: 'Gundam Wing', correct: false },
        { text: 'Neon Genesis Evangelion', correct: true }
      ]
    }
  ];
  