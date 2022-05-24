import { useState } from "react";
import StartQuiz from "./Components/StartQuiz";
import QuizQuestions from "./Components/QuizQuestions";

function App() {
  const [game, setGame] = useState(false);
  const [quiz, setQuiz] = useState([]);

  function renderQuiz() {
    console.log("TESTING");
    setGame((prevGame) => !prevGame);
    fetch(
      "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple"
    )
      .then((res) => res.json())
      .then((data) =>
        setQuiz(
          data.results.map((item) => {
            return {
              question: item.question,
              incorrectAnswer: item.incorrect_answers,
              correctAnswers: item.correct_answer,
              answers: shuffle([
                ...item.incorrect_answers,
                item.correct_answer,
              ]),
            };
          })
        )
      );
  }

  console.log(quiz);

  // Fisher-Yates Shuffle
  function shuffle(array) {
    for (let i = array.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      array.push(array[randomIndex]);
      array.splice(randomIndex, 1);
    }
    return array;
  }

  const quizElements = quiz.map((item) => {
    return <QuizQuestions question={item.question} answers={item.answers} />;
  });

  console.log(quizElements);
  return (
    <main>
      <div>{game ? quizElements : <StartQuiz startGame={renderQuiz} />}</div>
    </main>
  );
}

export default App;
