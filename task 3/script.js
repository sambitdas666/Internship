/**
 * ApexPlanet Internship - Task 3
 * Advanced Styling and JavaScript
 * 
 * Features:
 * 1. Responsive Design with CSS Grid and Media Queries
 * 2. Interactive Quiz with Score Calculation
 * 3. API Data Fetching from JSONPlaceholder
 */

document.addEventListener('DOMContentLoaded', function() {
    // Quiz Questions
    const quizQuestions = [
        {
            question: "What is the capital of France?",
            options: ["London", "Berlin", "Paris", "Madrid"],
            answer: "Paris",
            explanation: "Paris is the capital and most populous city of France."
        },
        {
            question: "Which language runs in a web browser?",
            options: ["Java", "Python", "C++", "JavaScript"],
            answer: "JavaScript",
            explanation: "JavaScript is the programming language of the Web."
        },
        {
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "Hyperlinks and Text Markup Language",
                "Home Tool Markup Language",
                "Hyper Transfer Markup Language"
            ],
            answer: "Hyper Text Markup Language",
            explanation: "HTML is the standard markup language for creating web pages."
        }
    ];

    // DOM Elements
    const quizContainer = document.getElementById('quiz-container');
    const submitBtn = document.getElementById('submit-btn');
    const quizResult = document.getElementById('quiz-result');
    const fetchBtn = document.getElementById('fetch-btn');
    const apiData = document.getElementById('api-data');

    // Initialize Quiz
    function initializeQuiz() {
        quizQuestions.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'quiz-question';
            questionElement.innerHTML = `
                <h3>Question ${index + 1}: ${question.question}</h3>
                <div class="quiz-options">
                    ${question.options.map(option => `
                        <label>
                            <input type="radio" name="question-${index}" value="${option}">
                            ${option}
                        </label>
                    `).join('')}
                </div>
            `;
            quizContainer.appendChild(questionElement);
        });
    }

    // Calculate Quiz Score
    function calculateScore() {
        let score = 0;
        let results = [];
        
        quizQuestions.forEach((question, index) => {
            const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
            const isCorrect = selectedOption && selectedOption.value === question.answer;
            
            if (isCorrect) {
                score++;
            }
            
            results.push({
                question: question.question,
                selected: selectedOption ? selectedOption.value : "Not answered",
                correct: question.answer,
                isCorrect,
                explanation: question.explanation
            });
        });

        return { score, results };
    }

    // Display Quiz Results
    function displayResults(score, results) {
        let resultsHTML = `
            <h3>Your Score: ${score} out of ${quizQuestions.length}</h3>
            <div class="results-details">
        `;
        
        results.forEach((result, index) => {
            resultsHTML += `
                <div class="${result.isCorrect ? 'success' : 'error'}">
                    <p><strong>Question ${index + 1}:</strong> ${result.question}</p>
                    <p>Your answer: ${result.selected}</p>
                    <p>Correct answer: ${result.correct}</p>
                    <p>${result.explanation}</p>
                </div>
            `;
        });
        
        resultsHTML += `</div>`;
        quizResult.innerHTML = resultsHTML;
    }

    // Fetch API Data
    async function fetchData() {
        try {
            apiData.innerHTML = '<p>Loading data...</p>';
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + Math.floor(Math.random() * 100 + 1));
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            apiData.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.body}</p>
                <p class="api-meta">Post ID: ${data.id} | User ID: ${data.userId}</p>
            `;
        } catch (error) {
            apiData.innerHTML = `
                <div class="error">
                    <p>Error fetching data:</p>
                    <p>${error.message}</p>
                </div>
            `;
            console.error('Error:', error);
        }
    }

    // Event Listeners
    submitBtn.addEventListener('click', () => {
        const { score, results } = calculateScore();
        displayResults(score, results);
    });

    fetchBtn.addEventListener('click', fetchData);

    // Initialize the application
    initializeQuiz();
});