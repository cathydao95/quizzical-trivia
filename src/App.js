import { useState, useEffect } from "react";
import Quiz from "./Components/Quiz";
import { nanoid } from "nanoid";

function App() {
  const [game, setGame] = useState(false);
  const [quiz, setQuiz] = useState([]);

  function renderQuiz() {
    setGame(true);
    fetch(
      "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple"
    )
      .then((res) => res.json())
      .then((data) =>
        setQuiz(
          data.results.map((result) => {
            return {
              id: nanoid(),
              question: result.question,
              correctAnswer: result.correct_answer,
              answers: shuffle([
                ...result.incorrect_answers,
                result.correct_answer,
              ]),
              scored: false,
            };
          })
        )
      );
  }

  console.log(quiz);

  function shuffle(arr) {
    const newArray = arr.map((item) => {
      return {
        id: nanoid(),
        isHeld: false,
        answer: item,
      };
    });
    for (let i = newArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      newArray.push(newArray[randomIndex]);
      newArray.splice(randomIndex, 1);
    }
    return newArray;
  }

  return (
    <main className="main-overlay">
      <div className="main-container">
        {game ? (
          <Quiz quiz={quiz} />
        ) : (
          <div className="container">
            <h1>Quizzical</h1>
            <p>Let's play Trivia! How many questions can you get?</p>
            <button onClick={renderQuiz} className="btn-start">
              Start Quiz
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
