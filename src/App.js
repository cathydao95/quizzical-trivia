import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import Quiz from "./Components/Quiz";
import StartQuiz from "./Components/StartQuiz";

function App() {
  const [quiz, setQuiz] = useState([]);
  const [results, setResults] = useState(false);

  function startQuiz() {
    renderQuiz();
  }

  function renderQuiz() {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple"
    )
      .then((res) => res.json())
      .then((data) =>
        setQuiz(
          data.results.map((item) => {
            return {
              id: nanoid(),
              question: item.question,
              correctAnswer: item.correct_answer,
              answers: shuffle([
                ...item.incorrect_answers,
                item.correct_answer,
              ]),
              isAttemped: false,
              scored: false,
            };
          })
        )
      );
  }

  function shuffle(arr) {
    let array = arr.map((ans) => {
      return {
        id: nanoid(),
        isSelected: false,
        answer: ans,
      };
    });
    for (let i = array.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      array.push(array[randomIndex]);
      array.splice(randomIndex, 1);
    }
    return array;
  }

  function handleSelected(questionId, answerId) {
    console.log(questionId, answerId);
    setQuiz((prevQuiz) =>
      prevQuiz.map((item) => {
        return item.id === questionId
          ? {
              ...item,
              answers: item.answers.map((ans) => {
                return ans.id === answerId
                  ? { ...ans, isSelected: !ans.isSelected }
                  : ans;
              }),
              scored:
                item.correct ===
                item.answers.find((ans) => ans.id === answerId).answer,
              isAttemped: !item.isAttemped,
            }
          : item;
      })
    );
  }

  function checkAnswers() {
    console.log("checking");
    setResults(true);
  }

  function restartQuiz() {
    console.log("restart quiz");
  }
  return (
    <div>
      <div>
        {quiz.length ? (
          <Quiz
            quiz={quiz}
            handleSelected={handleSelected}
            checkAnswers={checkAnswers}
            restartQuiz={restartQuiz}
            results={results}
          />
        ) : (
          <StartQuiz startQuiz={startQuiz} />
        )}
      </div>
    </div>
  );
}
export default App;
